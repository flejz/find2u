'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = void 0;

beforeEach((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _.User.create({ name: 'user', email: 'a@a.com', password: '123456' });

        case 2:
          user = _context.sent;

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

describe('set email', function () {
  it('sets name automatically', function () {
    user.name = '';
    user.email = 'test@example.com';
    expect(user.name).toBe('test');
  });

  it('sets picture automatically', function () {
    var hash = _crypto2.default.createHash('md5').update(user.email).digest('hex');
    expect(user.picture).toBe('https://gravatar.com/avatar/' + hash + '?d=identicon');
  });

  it('changes picture when it is gravatar', function () {
    user.email = 'b@b.com';
    var hash = _crypto2.default.createHash('md5').update(user.email).digest('hex');
    expect(user.picture).toBe('https://gravatar.com/avatar/' + hash + '?d=identicon');
  });

  it('does not change picture when it is already set and is not gravatar', function () {
    user.picture = 'not_gravatar.jpg';
    user.email = 'c@c.com';
    expect(user.picture).toBe('not_gravatar.jpg');
  });
});

describe('view', function () {
  it('returns simple view', function () {
    var view = user.view();
    expect(view).toBeDefined();
    expect(view.id).toBe(user.id);
    expect(view.name).toBe(user.name);
    expect(view.picture).toBe(user.picture);
  });

  it('returns full view', function () {
    var view = user.view(true);
    expect(view).toBeDefined();
    expect(view.id).toBe(user.id);
    expect(view.name).toBe(user.name);
    expect(view.email).toBe(user.email);
    expect(view.picture).toBe(user.picture);
    expect(view.createdAt).toEqual(user.createdAt);
  });
});

describe('authenticate', function () {
  it('returns the user when authentication succeed', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = expect;
            _context2.next = 3;
            return user.authenticate('123456');

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = user;
            (0, _context2.t0)(_context2.t1).toBe(_context2.t2);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('returns false when authentication fails', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = expect;
            _context3.next = 3;
            return user.authenticate('blah');

          case 3:
            _context3.t1 = _context3.sent;
            (0, _context3.t0)(_context3.t1).toBe(false);

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});
//# sourceMappingURL=model.test.js.map