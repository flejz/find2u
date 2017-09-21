'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.signSync = exports.sign = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwtSign = _bluebird2.default.promisify(_jsonwebtoken2.default.sign);
var jwtVerify = _bluebird2.default.promisify(_jsonwebtoken2.default.verify);

var sign = exports.sign = function sign(id, options) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : jwtSign;
  return method({ id: id }, _config.jwtSecret, options);
};

var signSync = exports.signSync = function signSync(id, options) {
  return sign(id, options, _jsonwebtoken2.default.sign);
};

var verify = exports.verify = function verify(token) {
  return jwtVerify(token, _config.jwtSecret);
};
//# sourceMappingURL=index.js.map