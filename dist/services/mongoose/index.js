'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _keys2.default)(_config.mongo.options).forEach(function (key) {
  _mongoose2.default.set(key, _config.mongo.options[key]);
});

_mongoose2.default.Promise = _bluebird2.default;
/* istanbul ignore next */
_mongoose2.default.Types.ObjectId.prototype.view = function () {
  return { id: this.toString() };
};

/* istanbul ignore next */
_mongoose2.default.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

exports.default = _mongoose2.default;
//# sourceMappingURL=index.js.map