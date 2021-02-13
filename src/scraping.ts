import * as _fs from 'fs';
import puppeteer, { Page } from 'puppeteer';
import { Site, SITES } from './sites';
const fs = _fs.promises;

export class Scraping {
  que: string[] = [];
  captured: string[] = [];

  constructor() {
    this.run();
  }

  private async run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    for (const site of SITES) {
      await this.getScreen(page, site);
    }

    await browser.close();
  }

  private getOrigin(url: string): string {
    return new URL(url).origin;
  }

  private isMatchIgnore(url: string, ignores?: string[]): boolean {
    if (!ignores || !ignores.filter((ignore) => url.match(ignore)).length) {
      return false;
    }

    const hits = this.que.filter((queItem) => {
      for (const ignore of ignores) {
        return queItem.match(ignore);
      }
    });
    return hits.length > 2;
  }

  private addUrlToQue(origin: string, urls: string[], ignores?: string[]) {
    urls
      .map((url) =>
        url.replace(/#.*$/, '').replace('index.html', '').replace(/\/$/, '')
      )
      .forEach((url) => {
        if (this.isMatchIgnore(url, ignores)) {
          return;
        }

        if (
          url.match(origin) &&
          !this.captured.includes(url) &&
          !this.que.includes(url)
        ) {
          this.que.push(url);
        }
      });
  }

  private removeUrlFromQue(url: string) {
    const index = this.que.indexOf(url);
    this.que.splice(index, 1);
  }

  private async getScreen(page: Page, site: Site) {
    await page.goto(site.url, {
      waitUntil: 'networkidle2',
    });
    await page.waitForTimeout(2000);

    const urls: any[] = await page.evaluate((): any[] => {
      window.scrollTo({
        top: 50000,
        left: 0,
        behavior: 'smooth',
      });
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }, 2000);
      return Array.prototype.map.call(
        document.getElementsByTagName('a'),
        (element) => {
          return element.href as string;
        }
      );
    });

    this.captured.push(site.url);
    this.addUrlToQue(this.getOrigin(site.url), urls, site.ignorePaths);
    this.removeUrlFromQue(site.url);

    await page.waitForTimeout(4000);

    try {
      await fs.mkdir('screens/' + site.dir);
    } catch (err) {}

    const title = await page.title();

    await page.screenshot({
      path: `screens/${site.dir}/${title}.png`,
      fullPage: true,
    });

    console.log(this.que.length);

    if (this.que[0]) {
      await this.getScreen(page, site);
    }
  }
}
