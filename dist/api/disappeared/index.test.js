'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _jwt = require('../../services/jwt');

var _express = require('../../services/express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../user');

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = function app() {
  return (0, _express2.default)(_2.default);
};

var userSession = void 0,
    anotherSession = void 0,
    disappeared = void 0;

beforeEach((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var user, anotherUser;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user.User.create({ email: 'a@a.com', password: '123456' });

        case 2:
          user = _context.sent;
          _context.next = 5;
          return _user.User.create({ email: 'b@b.com', password: '123456' });

        case 5:
          anotherUser = _context.sent;

          userSession = (0, _jwt.signSync)(user.id);
          anotherSession = (0, _jwt.signSync)(anotherUser.id);
          _context.next = 10;
          return _.Disappeared.create({ user: user });

        case 10:
          disappeared = _context.sent;

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

test('POST /disappeareds 201 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
  var _ref3, status, body;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: userSession, name: 'test', birth_date: 'test', disappearance_date: 'test', mobile_contact: 'test' });

        case 2:
          _ref3 = _context2.sent;
          status = _ref3.status;
          body = _ref3.body;

          expect(status).toBe(201);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toEqual('object');
          expect(body.name).toEqual('test');
          expect(body.birth_date).toEqual('test');
          expect(body.disappearance_date).toEqual('test');
          expect(body.mobile_contact).toEqual('test');
          expect((0, _typeof3.default)(body.user)).toEqual('object');

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

test('POST /disappeareds 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
  var _ref5, status;

  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/');

        case 2:
          _ref5 = _context3.sent;
          status = _ref5.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));

test('GET /disappeareds 200', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
  var _ref7, status, body;

  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/');

        case 2:
          _ref7 = _context4.sent;
          status = _ref7.status;
          body = _ref7.body;

          expect(status).toBe(200);
          expect(Array.isArray(body)).toBe(true);

        case 7:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, undefined);
})));

test('GET /disappeareds/:id 200', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
  var _ref9, status, body;

  return _regenerator2.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/' + disappeared.id);

        case 2:
          _ref9 = _context5.sent;
          status = _ref9.status;
          body = _ref9.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toEqual('object');
          expect(body.id).toEqual(disappeared.id);

        case 8:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, undefined);
})));

test('GET /disappeareds/:id 404', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
  var _ref11, status;

  return _regenerator2.default.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/123456789098765432123456');

        case 2:
          _ref11 = _context6.sent;
          status = _ref11.status;

          expect(status).toBe(404);

        case 5:
        case 'end':
          return _context6.stop();
      }
    }
  }, _callee6, undefined);
})));

test('PUT /disappeareds/:id 200 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
  var _ref13, status, body;

  return _regenerator2.default.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + disappeared.id).send({ access_token: userSession, name: 'test', birth_date: 'test', disappearance_date: 'test', mobile_contact: 'test' });

        case 2:
          _ref13 = _context7.sent;
          status = _ref13.status;
          body = _ref13.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toEqual('object');
          expect(body.id).toEqual(disappeared.id);
          expect(body.name).toEqual('test');
          expect(body.birth_date).toEqual('test');
          expect(body.disappearance_date).toEqual('test');
          expect(body.mobile_contact).toEqual('test');
          expect((0, _typeof3.default)(body.user)).toEqual('object');

        case 13:
        case 'end':
          return _context7.stop();
      }
    }
  }, _callee7, undefined);
})));

test('PUT /disappeareds/:id 401 (user) - another user', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
  var _ref15, status;

  return _regenerator2.default.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + disappeared.id).send({ access_token: anotherSession, name: 'test', birth_date: 'test', disappearance_date: 'test', mobile_contact: 'test' });

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

test('PUT /disappeareds/:id 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
  var _ref17, status;

  return _regenerator2.default.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + disappeared.id);

        case 2:
          _ref17 = _context9.sent;
          status = _ref17.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context9.stop();
      }
    }
  }, _callee9, undefined);
})));

test('PUT /disappeareds/:id 404 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
  var _ref19, status;

  return _regenerator2.default.wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/123456789098765432123456').send({ access_token: anotherSession, name: 'test', birth_date: 'test', disappearance_date: 'test', mobile_contact: 'test' });

        case 2:
          _ref19 = _context10.sent;
          status = _ref19.status;

          expect(status).toBe(404);

        case 5:
        case 'end':
          return _context10.stop();
      }
    }
  }, _callee10, undefined);
})));

test('DELETE /disappeareds/:id 204 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
  var _ref21, status;

  return _regenerator2.default.wrap(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _supertestAsPromised2.default)(app()).delete('/' + disappeared.id).query({ access_token: userSession });

        case 2:
          _ref21 = _context11.sent;
          status = _ref21.status;

          expect(status).toBe(204);

        case 5:
        case 'end':
          return _context11.stop();
      }
    }
  }, _callee11, undefined);
})));

test('DELETE /disappeareds/:id 401 (user) - another user', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
  var _ref23, status;

  return _regenerator2.default.wrap(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _supertestAsPromised2.default)(app()).delete('/' + disappeared.id).send({ access_token: anotherSession });

        case 2:
          _ref23 = _context12.sent;
          status = _ref23.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context12.stop();
      }
    }
  }, _callee12, undefined);
})));

test('DELETE /disappeareds/:id 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
  var _ref25, status;

  return _regenerator2.default.wrap(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _supertestAsPromised2.default)(app()).delete('/' + disappeared.id);

        case 2:
          _ref25 = _context13.sent;
          status = _ref25.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context13.stop();
      }
    }
  }, _callee13, undefined);
})));

test('DELETE /disappeareds/:id 404 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
  var _ref27, status;

  return _regenerator2.default.wrap(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _supertestAsPromised2.default)(app()).delete('/123456789098765432123456').query({ access_token: anotherSession });

        case 2:
          _ref27 = _context14.sent;
          status = _ref27.status;

          expect(status).toBe(404);

        case 5:
        case 'end':
          return _context14.stop();
      }
    }
  }, _callee14, undefined);
})));
//# sourceMappingURL=index.test.js.map