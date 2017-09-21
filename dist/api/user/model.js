'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseKeywords = require('mongoose-keywords');

var _mongooseKeywords2 = _interopRequireDefault(_mongooseKeywords);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roles = ['user', 'admin'];

var userSchema = new _mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    var hash = _crypto2.default.createHash('md5').update(email).digest('hex');
    this.picture = 'https://gravatar.com/avatar/' + hash + '?d=identicon';
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1');
  }

  return email;
});

userSchema.pre('save', function (next) {
  var _this = this;

  if (!this.isModified('password')) return next();

  /* istanbul ignore next */
  var rounds = _config.env === 'test' ? 1 : 9;

  _bcrypt2.default.hash(this.password, rounds).then(function (hash) {
    _this.password = hash;
    next();
  }).catch(next);
});

userSchema.methods = {
  view: function view(full) {
    var _this2 = this;

    var view = {};
    var fields = ['id', 'name', 'picture'];

    if (full) {
      fields = [].concat((0, _toConsumableArray3.default)(fields), ['email', 'createdAt']);
    }

    fields.forEach(function (field) {
      view[field] = _this2[field];
    });

    return view;
  },
  authenticate: function authenticate(password) {
    var _this3 = this;

    return _bcrypt2.default.compare(password, this.password).then(function (valid) {
      return valid ? _this3 : false;
    });
  }
};

userSchema.statics = {
  roles: roles
};

userSchema.plugin(_mongooseKeywords2.default, { paths: ['email', 'name'] });

var model = _mongoose2.default.model('User', userSchema);

var schema = exports.schema = model.schema;
exports.default = model;
//# sourceMappingURL=model.js.map