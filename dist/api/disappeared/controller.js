'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = exports.destroy = exports.update = exports.show = exports.index = exports.create = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _response = require('../../services/response/');

var _2 = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = exports.create = function create(_ref, res, next) {
  var user = _ref.user,
      body = _ref.bodymen.body;
  return _2.Disappeared.create((0, _extends3.default)({}, body, { user: user })).then(function (disappeared) {
    return disappeared.view(true);
  }).then((0, _response.success)(res, 201)).catch(next);
};

var index = exports.index = function index(_ref2, res, next) {
  var _ref2$querymen = _ref2.querymen,
      query = _ref2$querymen.query,
      select = _ref2$querymen.select,
      cursor = _ref2$querymen.cursor;
  return _2.Disappeared.find(query, select, cursor).populate('user').then(function (disappeareds) {
    return disappeareds.map(function (disappeared) {
      return disappeared.view();
    });
  }).then((0, _response.success)(res)).catch(next);
};

var show = exports.show = function show(_ref3, res, next) {
  var params = _ref3.params;
  return _2.Disappeared.findById(params.id).populate('user').then((0, _response.notFound)(res)).then(function (disappeared) {
    return disappeared ? disappeared.view() : null;
  }).then((0, _response.success)(res)).catch(next);
};

var update = exports.update = function update(_ref4, res, next) {
  var user = _ref4.user,
      body = _ref4.bodymen.body,
      params = _ref4.params;
  return _2.Disappeared.findById(params.id).populate('user').then((0, _response.notFound)(res)).then((0, _response.authorOrAdmin)(res, user, 'user')).then(function (disappeared) {
    return disappeared ? _lodash2.default.merge(disappeared, body).save() : null;
  }).then(function (disappeared) {
    return disappeared ? disappeared.view(true) : null;
  }).then((0, _response.success)(res)).catch(next);
};

var destroy = exports.destroy = function destroy(_ref5, res, next) {
  var user = _ref5.user,
      params = _ref5.params;
  return _2.Disappeared.findById(params.id).then((0, _response.notFound)(res)).then((0, _response.authorOrAdmin)(res, user, 'user')).then(function (disappeared) {
    return disappeared ? disappeared.remove() : null;
  }).then((0, _response.success)(res, 204)).catch(next);
};

var get = exports.get = function get(req, res, next) {
  return _2.Disappeared.findById(req.body.disappeared_id).then(function (disappeared) {
    req.disappeared = disappeared;
    next();
  }).catch((0, _response.badRequest)(res));
};
//# sourceMappingURL=controller.js.map