const { I18n } = require('i18n')
const path = require("path");


const i18n = new I18n({
  locales: ['en', 'ar'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: "en",
  objectNotation: true,
  register: global,
  api: {
    __: 't',
    __n: 'tn'
  }
})


module.exports = i18n;