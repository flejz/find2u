'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disappearedSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  birth_date: {
    type: String
  },
  disappearance_date: {
    type: String
  },
  mobile_contact: {
    type: String
  }
}, {
  timestamps: true
});

disappearedSchema.methods = {
  view: function view(full) {
    var view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      name: this.name,
      birth_date: this.birth_date,
      disappearance_date: this.disappearance_date,
      mobile_contact: this.mobile_contact,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? (0, _extends3.default)({}, view) : view;
  }
};

var model = _mongoose2.default.model('Disappeared', disappearedSchema);

var schema = exports.schema = model.schema;
exports.default = model;
//# sourceMappingURL=model.js.map