'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _config = require('../../config');

var _user = require('../user');

var _jwt = require('../../services/jwt');

var _express = require('../../services/express');

var _express2 = _interopRequireDefault(_express);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = function app() {
  return (0, _express2.default)(_2.default);
};

var user = void 0;

beforeEach((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user.User.create({ email: 'a@a.com', password: '123456' });

        case 2:
          user = _context.sent;

        case 3:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

test('POST /auth 201 (master)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
  var _ref3, status, body;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').query({ token: _config.masterKey }).auth('a@a.com', '123456');

        case 2:
          _ref3 = _context2.sent;
          status = _ref3.status;
          body = _ref3.body;

          expect(status).toBe(201);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect((0, _typeof3.default)(body.token)).toBe('string');
          expect((0, _typeof3.default)(body.user)).toBe('object');
          expect(body.user.id).toBe(user.id);
          _context2.t0 = expect;
          _context2.next = 13;
          return (0, _jwt.verify)(body.token);

        case 13:
          _context2.t1 = _context2.sent;
          (0, _context2.t0)(_context2.t1).toBeTruthy();

        case 15:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

test('POST /auth 400 (master) - invalid email', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
  var _ref5, status, body;

  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').query({ token: _config.masterKey }).auth('invalid', '123456');

        case 2:
          _ref5 = _context3.sent;
          status = _ref5.status;
          body = _ref5.body;

          expect(status).toBe(400);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.param).toBe('email');

        case 8:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));

test('POST /auth 400 (master) - invalid password', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
  var _ref7, status, body;

  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').query({ token: _config.masterKey }).auth('a@a.com', '123');

        case 2:
          _ref7 = _context4.sent;
          status = _ref7.status;
          body = _ref7.body;

          expect(status).toBe(400);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.param).toBe('password');

        case 8:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, undefined);
})));

test('POST /auth 401 (master) - user does not exist', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
  var _ref9, status;

  return _regenerator2.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').query({ token: _config.masterKey }).auth('b@b.com', '123456');

        case 2:
          _ref9 = _context5.sent;
          status = _ref9.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, undefined);
})));

test('POST /auth 401 (master) - wrong password', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
  var _ref11, status;

  return _regenerator2.default.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').query({ token: _config.masterKey }).auth('a@a.com', '654321');

        case 2:
          _ref11 = _context6.sent;
          status = _ref11.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context6.stop();
      }
    }
  }, _callee6, undefined);
})));

test('POST /auth 401 (master) - missing token', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
  var _ref13, status;

  return _regenerator2.default.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').auth('a@a.com', '123456');

        case 2:
          _ref13 = _context7.sent;
          status = _ref13.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context7.stop();
      }
    }
  }, _callee7, undefined);
})));

test('POST /auth 401 (master) - missing auth', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
  var _ref15, status;

  return _regenerator2.default.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').query({ token: _config.masterKey });

        case 2:
          _ref15 = _context8.sent;
          status = _ref15.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context8.stop();
      }
    }
  }, _callee8, undefined);
})));
//# sourceMappingURL=index.test.js.map