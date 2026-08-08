// Five Server Configuration for Mana AP Sevalu Portal
module.exports = {
  port: 5555,
  root: './',
  open: 'index.html',
  browser: 'default',
  https: false,
  highlight: false,
  injectBody: true,
  ignore: [
    /\.git/,
    /admin-app/,
    /data\/backups/
  ]
};
