export interface Site {
  dir: string;
  url: string;
  ignorePaths?: string[];
}

export const SITES: Site[] = [
  {
    dir: 'ポテパンキャンプ',
    url: 'https://camp.potepan.com/',
    ignorePaths: ['https://camp.potepan.com/interview/'],
  },
  // {
  //   title: 'lamda-school',
  //   url: 'https://miru.page/',
  // },
  // {
  //   title: 'tech-camp',
  //   url: 'https://menuforest.page/welcome',
  // },
];
