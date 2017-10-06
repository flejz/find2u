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

var characteristicsSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  disappeared: {
    type: _mongoose.Schema.ObjectId,
    ref: 'Disappeared',
    required: true
  },
  reference_id: {
    type: String
  },
  type: {
    type: String
  },
  which: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

characteristicsSchema.methods = {
  view: function view(full) {
    var view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      disappeared: this.disappeared.view(full),
      reference_id: this.reference_id,
      type: this.type,
      which: this.which,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? (0, _extends3.default)({}, view) : view;
  }
};

var model = _mongoose2.default.model('Characteristics', characteristicsSchema);

var schema = exports.schema = model.schema;
exports.default = model;
//# sourceMappingURL=model.js.map