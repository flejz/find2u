'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.updatePassword = exports.update = exports.create = exports.showMe = exports.show = exports.index = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _response = require('../../services/response/');

var _2 = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = exports.index = function index(_ref, res, next) {
  var _ref$querymen = _ref.querymen,
      query = _ref$querymen.query,
      select = _ref$querymen.select,
      cursor = _ref$querymen.cursor;
  return _2.User.find(query, select, cursor).then(function (users) {
    return users.map(function (user) {
      return user.view();
    });
  }).then((0, _response.success)(res)).catch(next);
};

var show = exports.show = function show(_ref2, res, next) {
  var params = _ref2.params;
  return _2.User.findById(params.id).then((0, _response.notFound)(res)).then(function (user) {
    return user ? user.view() : null;
  }).then((0, _response.success)(res)).catch(next);
};

var showMe = exports.showMe = function showMe(_ref3, res) {
  var user = _ref3.user;
  return res.json(user.view(true));
};

var create = exports.create = function create(_ref4, res, next) {
  var body = _ref4.bodymen.body;
  return _2.User.create(body).then(function (user) {
    return user.view(true);
  }).then((0, _response.success)(res, 201)).catch(function (err) {
    /* istanbul ignore else */
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status(409).json({
        valid: false,
        param: 'email',
        message: 'email already registered'
      });
    } else {
      next(err);
    }
  });
};

var update = exports.update = function update(_ref5, res, next) {
  var body = _ref5.bodymen.body,
      params = _ref5.params,
      user = _ref5.user;
  return _2.User.findById(params.id === 'me' ? user.id : params.id).then((0, _response.notFound)(res)).then(function (result) {
    if (!result) return null;
    var isAdmin = user.role === 'admin';
    var isSelfUpdate = user.id === result.id;
    if (!isSelfUpdate && !isAdmin) {
      res.status(401).json({
        valid: false,
        message: 'You can\'t change other user\'s data'
      });
      return null;
    }
    return result;
  }).then(function (user) {
    return user ? _lodash2.default.merge(user, body).save() : null;
  }).then(function (user) {
    return user ? user.view(true) : null;
  }).then((0, _response.success)(res)).catch(next);
};

var updatePassword = exports.updatePassword = function updatePassword(_ref6, res, next) {
  var body = _ref6.bodymen.body,
      params = _ref6.params,
      user = _ref6.user;
  return _2.User.findById(params.id === 'me' ? user.id : params.id).then((0, _response.notFound)(res)).then(function (result) {
    if (!result) return null;
    var isSelfUpdate = user.id === result.id;
    if (!isSelfUpdate) {
      res.status(401).json({
        valid: false,
        param: 'password',
        message: 'You can\'t change other user\'s password'
      });
      return null;
    }
    return result;
  }).then(function (user) {
    return user ? user.set({ password: body.password }).save() : null;
  }).then(function (user) {
    return user ? user.view(true) : null;
  }).then((0, _response.success)(res)).catch(next);
};

var destroy = exports.destroy = function destroy(_ref7, res, next) {
  var params = _ref7.params;
  return _2.User.findById(params.id).then((0, _response.notFound)(res)).then(function (user) {
    return user ? user.remove() : null;
  }).then((0, _response.success)(res, 204)).catch(next);
};
//# sourceMappingURL=controller.js.map