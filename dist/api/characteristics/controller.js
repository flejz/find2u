'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.index = exports.create = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _response = require('../../services/response/');

var _2 = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = exports.create = function create(_ref, res, next) {
  var user = _ref.user,
      disappeared = _ref.disappeared,
      body = _ref.bodymen.body;
  return _2.Characteristics.create((0, _extends3.default)({}, body, { user: user, disappeared: disappeared })).then(function (characteristics) {
    return characteristics.view(true);
  }).then((0, _response.success)(res, 201)).catch(next);
};

var index = exports.index = function index(_ref2, res, next) {
  var _ref2$querymen = _ref2.querymen,
      query = _ref2$querymen.query,
      select = _ref2$querymen.select,
      cursor = _ref2$querymen.cursor;
  return _2.Characteristics.find(query, select, cursor).populate('user').populate('disappeared').then(function (characteristics) {
    return characteristics.map(function (characteristics) {
      return characteristics.view();
    });
  }).then((0, _response.success)(res)).catch(next);
};

var destroy = exports.destroy = function destroy(_ref3, res, next) {
  var user = _ref3.user,
      params = _ref3.params;
  return _2.Characteristics.findById(params.id).then((0, _response.notFound)(res)).then((0, _response.authorOrAdmin)(res, user, 'user')).then(function (characteristics) {
    return characteristics ? characteristics.remove() : null;
  }).then((0, _response.success)(res, 204)).catch(next);
};
//# sourceMappingURL=controller.js.map