'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ = require('.');

var _user = require('../user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = void 0,
    disappeared = void 0;

beforeEach((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user.User.create({ email: 'a@a.com', password: '123456' });

        case 2:
          user = _context.sent;
          _context.next = 5;
          return _.Disappeared.create({ user: user, name: 'test', birth_date: 'test', date: 'test', obs: 'test', status: 'test' });

        case 5:
          disappeared = _context.sent;

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

describe('view', function () {
  it('returns simple view', function () {
    var view = disappeared.view();
    expect(typeof view === 'undefined' ? 'undefined' : (0, _typeof3.default)(view)).toBe('object');
    expect(view.id).toBe(disappeared.id);
    expect((0, _typeof3.default)(view.user)).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.name).toBe(disappeared.name);
    expect(view.birth_date).toBe(disappeared.birth_date);
    expect(view.date).toBe(disappeared.date);
    expect(view.obs).toBe(disappeared.obs);
    expect(view.status).toBe(disappeared.status);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', function () {
    var view = disappeared.view(true);
    expect(typeof view === 'undefined' ? 'undefined' : (0, _typeof3.default)(view)).toBe('object');
    expect(view.id).toBe(disappeared.id);
    expect((0, _typeof3.default)(view.user)).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.name).toBe(disappeared.name);
    expect(view.birth_date).toBe(disappeared.birth_date);
    expect(view.date).toBe(disappeared.date);
    expect(view.obs).toBe(disappeared.obs);
    expect(view.status).toBe(disappeared.status);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
//# sourceMappingURL=model.test.js.map