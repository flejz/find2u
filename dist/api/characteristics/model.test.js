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
    characteristics = void 0;

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
          return _.Characteristics.create({ user: user, reference_id: 'test', type: 'test', which: 'test', description: 'test' });

        case 5:
          characteristics = _context.sent;

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

describe('view', function () {
  it('returns simple view', function () {
    var view = characteristics.view();
    expect(typeof view === 'undefined' ? 'undefined' : (0, _typeof3.default)(view)).toBe('object');
    expect(view.id).toBe(characteristics.id);
    expect((0, _typeof3.default)(view.user)).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.reference_id).toBe(characteristics.reference_id);
    expect(view.type).toBe(characteristics.type);
    expect(view.which).toBe(characteristics.which);
    expect(view.description).toBe(characteristics.description);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it('returns full view', function () {
    var view = characteristics.view(true);
    expect(typeof view === 'undefined' ? 'undefined' : (0, _typeof3.default)(view)).toBe('object');
    expect(view.id).toBe(characteristics.id);
    expect((0, _typeof3.default)(view.user)).toBe('object');
    expect(view.user.id).toBe(user.id);
    expect(view.reference_id).toBe(characteristics.reference_id);
    expect(view.type).toBe(characteristics.type);
    expect(view.which).toBe(characteristics.which);
    expect(view.description).toBe(characteristics.description);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
//# sourceMappingURL=model.test.js.map