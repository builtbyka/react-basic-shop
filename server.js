var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  index:'index.html',
  contentBase:'./app/'
}).listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }
});