'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _config = require('./config');

var _mongoose = require('./services/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('./services/express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(_api2.default);
var server = _http2.default.createServer(app);

_mongoose2.default.connect(_config.mongo.uri);

(0, _setImmediate3.default)(function () {
  server.listen(_config.port, _config.ip, function () {
    console.log('Express server listening on http://%s:%d, in %s mode', _config.ip, _config.port, _config.env);
  });
});

exports.default = app;
//# sourceMappingURL=app.js.map