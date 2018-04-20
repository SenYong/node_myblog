var common = require('./common.js')
var article = require('./article.js')

module.exports = (app) => {
    app.use(article),
    app.use(common)
}