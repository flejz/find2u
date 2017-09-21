'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = undefined;

var _jwt = require('../../services/jwt');

var _response = require('../../services/response/');

var login = exports.login = function login(_ref, res, next) {
  var user = _ref.user;
  return (0, _jwt.sign)(user.id).then(function (token) {
    return { token: token, user: user.view(true) };
  }).then((0, _response.success)(res, 201)).catch(next);
};
//# sourceMappingURL=controller.js.map