const puppeteer = require('puppeteer');
const SITES = require('./sites');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });

  for (const site of SITES) {
    await page.goto(site.url, {
      waitUntil: 'networkidle2',
    });
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
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
      }, 5000);
    });
    await page.waitForTimeout(8000);
    await page.screenshot({
      path: `screens/${site.title}.png`,
      fullPage: true,
    });
  }

  await browser.close();
})();
