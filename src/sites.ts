export interface Site {
  dir: string;
  url: string;
  ignorePaths?: string[];
}

export const SITES: Site[] = [
  // {
  //   dir: 'ポテパンキャンプ',
  //   url: 'https://camp.potepan.com/',
  //   ignorePaths: ['https://camp.potepan.com/interview/'],
  // },
  {
    dir: 'Tech Academy',
    url: 'https://techacademy.jp/',
  },
  // {
  //   title: 'tech-camp',
  //   url: 'https://menuforest.page/welcome',
  // },
];
