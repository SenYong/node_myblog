var common = require('./common.js');
var article = require('./article.js');
var journal = require('./journal.js');
var say = require('./say.js');
var board = require('./board.js');

module.exports = (app) => {
    app.use(article),
    app.use(journal),
    app.use(say),
    app.use(board),
    app.use(common)
}