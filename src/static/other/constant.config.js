// 配置预发版域名
export const codeList = [
  'http://localhost:8080',
  'http://192.168.1.100:8080',
  'https://test-www.guucube.com'
];
// 配置跳转域名
export const jumpObj = {
  jumpUrl: 'https://funpoints-test.advokate-bj.com/web/',
  jumpMall: 'https://test-www.guucube.com/',
  jumpCode: 'https://test-qrcode.guucube.com/',

  // #ifdef  H5-FINAL
  // eslint-disable-next-line no-dupe-keys
  jumpUrl: 'https://funpoints.advokate-bj.com/web/',
  // eslint-disable-next-line no-dupe-keys
  jumpMall: 'https://www.guucube.com/',
  // eslint-disable-next-line no-dupe-keys
  jumpCode: 'https://qrcode.guucube.com/'
  // #endif
};
