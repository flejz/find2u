'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _querymen = require('querymen');

var _bodymen = require('bodymen');

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (routes) {
  var app = (0, _express2.default)();

  /* istanbul ignore next */
  if (_config.env === 'production' || _config.env === 'development') {
    app.use((0, _cors2.default)());
    app.use((0, _compression2.default)());
    app.use((0, _morgan2.default)('dev'));
  }

  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use(_bodyParser2.default.json());
  app.use(routes);
  app.use((0, _querymen.errorHandler)());
  app.use((0, _bodymen.errorHandler)());

  return app;
};
//# sourceMappingURL=index.js.map