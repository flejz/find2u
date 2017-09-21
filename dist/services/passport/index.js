'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = exports.master = exports.password = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bodymen = require('bodymen');

var _passportHttp = require('passport-http');

var _passportHttpBearer = require('passport-http-bearer');

var _passportJwt = require('passport-jwt');

var _config = require('../../config');

var _model = require('../../api/user/model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var password = exports.password = function password() {
  return function (req, res, next) {
    return _passport2.default.authenticate('password', { session: false }, function (err, user, info) {
      if (err && err.param) {
        return res.status(400).json(err);
      } else if (err || !user) {
        return res.status(401).end();
      }
      req.logIn(user, { session: false }, function (err) {
        if (err) return res.status(401).end();
        next();
      });
    })(req, res, next);
  };
};

var master = exports.master = function master() {
  return _passport2.default.authenticate('master', { session: false });
};

var token = exports.token = function token() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      required = _ref.required,
      _ref$roles = _ref.roles,
      roles = _ref$roles === undefined ? _model2.default.roles : _ref$roles;

  return function (req, res, next) {
    return _passport2.default.authenticate('token', { session: false }, function (err, user, info) {
      if (err || required && !user || required && !~roles.indexOf(user.role)) {
        return res.status(401).end();
      }
      req.logIn(user, { session: false }, function (err) {
        if (err) return res.status(401).end();
        next();
      });
    })(req, res, next);
  };
};

_passport2.default.use('password', new _passportHttp.BasicStrategy(function (email, password, done) {
  var userSchema = new _bodymen.Schema({ email: _model.schema.tree.email, password: _model.schema.tree.password });

  userSchema.validate({ email: email, password: password }, function (err) {
    if (err) done(err);
  });

  _model2.default.findOne({ email: email }).then(function (user) {
    if (!user) {
      done(true);
      return null;
    }
    return user.authenticate(password, user.password).then(function (user) {
      done(null, user);
      return null;
    }).catch(done);
  });
}));

_passport2.default.use('master', new _passportHttpBearer.Strategy(function (token, done) {

  console.log(token);

  if (token === _config.masterKey) {
    done(null, {});
  } else {
    done(null, false);
  }
}));

_passport2.default.use('token', new _passportJwt.Strategy({
  secretOrKey: _config.jwtSecret,
  jwtFromRequest: _passportJwt.ExtractJwt.fromExtractors([_passportJwt.ExtractJwt.fromUrlQueryParameter('access_token'), _passportJwt.ExtractJwt.fromBodyField('access_token'), _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer')])
}, function (_ref2, done) {
  var id = _ref2.id;

  _model2.default.findById(id).then(function (user) {
    done(null, user);
    return null;
  }).catch(done);
}));
//# sourceMappingURL=index.js.map