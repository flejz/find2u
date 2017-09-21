'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _config = require('../../config');

var _jwt = require('../../services/jwt');

var _express = require('../../services/express');

var _express2 = _interopRequireDefault(_express);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = function app() {
  return (0, _express2.default)(_2.default);
};

var user1 = void 0,
    user2 = void 0,
    admin = void 0,
    session1 = void 0,
    session2 = void 0,
    adminSession = void 0;

beforeEach((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _.User.create({ name: 'user', email: 'a@a.com', password: '123456' });

        case 2:
          user1 = _context.sent;
          _context.next = 5;
          return _.User.create({ name: 'user', email: 'b@b.com', password: '123456' });

        case 5:
          user2 = _context.sent;
          _context.next = 8;
          return _.User.create({ email: 'c@c.com', password: '123456', role: 'admin' });

        case 8:
          admin = _context.sent;

          session1 = (0, _jwt.signSync)(user1.id);
          session2 = (0, _jwt.signSync)(user2.id);
          adminSession = (0, _jwt.signSync)(admin.id);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})));

test('GET /users 200 (admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
  var _ref3, status, body;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/').query({ access_token: adminSession });

        case 2:
          _ref3 = _context2.sent;
          status = _ref3.status;
          body = _ref3.body;

          expect(status).toBe(200);
          expect(Array.isArray(body)).toBe(true);

        case 7:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));

test('GET /users?page=2&limit=1 200 (admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
  var _ref5, status, body;

  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/').query({ access_token: adminSession, page: 2, limit: 1 });

        case 2:
          _ref5 = _context3.sent;
          status = _ref5.status;
          body = _ref5.body;

          expect(status).toBe(200);
          expect(Array.isArray(body)).toBe(true);
          expect(body.length).toBe(1);

        case 8:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
})));

test('GET /users?q=user 200 (admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
  var _ref7, status, body;

  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/').query({ access_token: adminSession, q: 'user' });

        case 2:
          _ref7 = _context4.sent;
          status = _ref7.status;
          body = _ref7.body;

          expect(status).toBe(200);
          expect(Array.isArray(body)).toBe(true);
          expect(body.length).toBe(2);

        case 8:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, undefined);
})));

test('GET /users?fields=name 200 (admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
  var _ref9, status, body;

  return _regenerator2.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/').query({ access_token: adminSession, fields: 'name' });

        case 2:
          _ref9 = _context5.sent;
          status = _ref9.status;
          body = _ref9.body;

          expect(status).toBe(200);
          expect(Array.isArray(body)).toBe(true);
          expect((0, _keys2.default)(body[0])).toEqual(['id', 'name']);

        case 8:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, undefined);
})));

test('GET /users 401 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
  var _ref11, status;

  return _regenerator2.default.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/').query({ access_token: session1 });

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

test('GET /users 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
  var _ref13, status;

  return _regenerator2.default.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/');

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

test('GET /users/me 200 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
  var _ref15, status, body;

  return _regenerator2.default.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/me').query({ access_token: session1 });

        case 2:
          _ref15 = _context8.sent;
          status = _ref15.status;
          body = _ref15.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.id).toBe(user1.id);

        case 8:
        case 'end':
          return _context8.stop();
      }
    }
  }, _callee8, undefined);
})));

test('GET /users/me 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
  var _ref17, status;

  return _regenerator2.default.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/me');

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

test('GET /users/:id 200', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
  var _ref19, status, body;

  return _regenerator2.default.wrap(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/' + user1.id);

        case 2:
          _ref19 = _context10.sent;
          status = _ref19.status;
          body = _ref19.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.id).toBe(user1.id);

        case 8:
        case 'end':
          return _context10.stop();
      }
    }
  }, _callee10, undefined);
})));

test('GET /users/:id 404', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
  var _ref21, status;

  return _regenerator2.default.wrap(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _supertestAsPromised2.default)(app()).get('/123456789098765432123456');

        case 2:
          _ref21 = _context11.sent;
          status = _ref21.status;

          expect(status).toBe(404);

        case 5:
        case 'end':
          return _context11.stop();
      }
    }
  }, _callee11, undefined);
})));

test('POST /users 201 (master)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
  var _ref23, status, body;

  return _regenerator2.default.wrap(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com', password: '123456' });

        case 2:
          _ref23 = _context12.sent;
          status = _ref23.status;
          body = _ref23.body;

          expect(status).toBe(201);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.email).toBe('d@d.com');

        case 8:
        case 'end':
          return _context12.stop();
      }
    }
  }, _callee12, undefined);
})));

test('POST /users 201 (master)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
  var _ref25, status, body;

  return _regenerator2.default.wrap(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com', password: '123456', role: 'user' });

        case 2:
          _ref25 = _context13.sent;
          status = _ref25.status;
          body = _ref25.body;

          expect(status).toBe(201);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.email).toBe('d@d.com');

        case 8:
        case 'end':
          return _context13.stop();
      }
    }
  }, _callee13, undefined);
})));

test('POST /users 201 (master)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
  var _ref27, status, body;

  return _regenerator2.default.wrap(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com', password: '123456', role: 'admin' });

        case 2:
          _ref27 = _context14.sent;
          status = _ref27.status;
          body = _ref27.body;

          expect(status).toBe(201);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.email).toBe('d@d.com');

        case 8:
        case 'end':
          return _context14.stop();
      }
    }
  }, _callee14, undefined);
})));

test('POST /users 409 (master) - duplicated email', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
  var _ref29, status, body;

  return _regenerator2.default.wrap(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'a@a.com', password: '123456' });

        case 2:
          _ref29 = _context15.sent;
          status = _ref29.status;
          body = _ref29.body;

          expect(status).toBe(409);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.param).toBe('email');

        case 8:
        case 'end':
          return _context15.stop();
      }
    }
  }, _callee15, undefined);
})));

test('POST /users 400 (master) - invalid email', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16() {
  var _ref31, status, body;

  return _regenerator2.default.wrap(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'invalid', password: '123456' });

        case 2:
          _ref31 = _context16.sent;
          status = _ref31.status;
          body = _ref31.body;

          expect(status).toBe(400);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.param).toBe('email');

        case 8:
        case 'end':
          return _context16.stop();
      }
    }
  }, _callee16, undefined);
})));

test('POST /users 400 (master) - missing email', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17() {
  var _ref33, status, body;

  return _regenerator2.default.wrap(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, password: '123456' });

        case 2:
          _ref33 = _context17.sent;
          status = _ref33.status;
          body = _ref33.body;

          expect(status).toBe(400);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.param).toBe('email');

        case 8:
        case 'end':
          return _context17.stop();
      }
    }
  }, _callee17, undefined);
})));

test('POST /users 400 (master) - invalid password', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18() {
  var _ref35, status, body;

  return _regenerator2.default.wrap(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com', password: '123' });

        case 2:
          _ref35 = _context18.sent;
          status = _ref35.status;
          body = _ref35.body;

          expect(status).toBe(400);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.param).toBe('password');

        case 8:
        case 'end':
          return _context18.stop();
      }
    }
  }, _callee18, undefined);
})));

test('POST /users 400 (master) - missing password', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19() {
  var _ref37, status, body;

  return _regenerator2.default.wrap(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com' });

        case 2:
          _ref37 = _context19.sent;
          status = _ref37.status;
          body = _ref37.body;

          expect(status).toBe(400);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.param).toBe('password');

        case 8:
        case 'end':
          return _context19.stop();
      }
    }
  }, _callee19, undefined);
})));

test('POST /users 400 (master) - invalid role', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20() {
  var _ref39, status, body;

  return _regenerator2.default.wrap(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: _config.masterKey, email: 'd@d.com', password: '123456', role: 'invalid' });

        case 2:
          _ref39 = _context20.sent;
          status = _ref39.status;
          body = _ref39.body;

          expect(status).toBe(400);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.param).toBe('role');

        case 8:
        case 'end':
          return _context20.stop();
      }
    }
  }, _callee20, undefined);
})));

test('POST /users 401 (admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21() {
  var _ref41, status;

  return _regenerator2.default.wrap(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: adminSession, email: 'd@d.com', password: '123456' });

        case 2:
          _ref41 = _context21.sent;
          status = _ref41.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context21.stop();
      }
    }
  }, _callee21, undefined);
})));

test('POST /users 401 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22() {
  var _ref43, status;

  return _regenerator2.default.wrap(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ access_token: session1, email: 'd@d.com', password: '123456' });

        case 2:
          _ref43 = _context22.sent;
          status = _ref43.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context22.stop();
      }
    }
  }, _callee22, undefined);
})));

test('POST /users 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23() {
  var _ref45, status;

  return _regenerator2.default.wrap(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return (0, _supertestAsPromised2.default)(app()).post('/').send({ email: 'd@d.com', password: '123456' });

        case 2:
          _ref45 = _context23.sent;
          status = _ref45.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context23.stop();
      }
    }
  }, _callee23, undefined);
})));

test('PUT /users/me 200 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24() {
  var _ref47, status, body;

  return _regenerator2.default.wrap(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/me').send({ access_token: session1, name: 'test' });

        case 2:
          _ref47 = _context24.sent;
          status = _ref47.status;
          body = _ref47.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.name).toBe('test');

        case 8:
        case 'end':
          return _context24.stop();
      }
    }
  }, _callee24, undefined);
})));

test('PUT /users/me 200 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25() {
  var _ref49, status, body;

  return _regenerator2.default.wrap(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/me').send({ access_token: session1, email: 'test@test.com' });

        case 2:
          _ref49 = _context25.sent;
          status = _ref49.status;
          body = _ref49.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.email).toBe('a@a.com');

        case 8:
        case 'end':
          return _context25.stop();
      }
    }
  }, _callee25, undefined);
})));

test('PUT /users/me 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26() {
  var _ref51, status;

  return _regenerator2.default.wrap(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/me').send({ name: 'test' });

        case 2:
          _ref51 = _context26.sent;
          status = _ref51.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context26.stop();
      }
    }
  }, _callee26, undefined);
})));

test('PUT /users/:id 200 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee27() {
  var _ref53, status, body;

  return _regenerator2.default.wrap(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + user1.id).send({ access_token: session1, name: 'test' });

        case 2:
          _ref53 = _context27.sent;
          status = _ref53.status;
          body = _ref53.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.name).toBe('test');

        case 8:
        case 'end':
          return _context27.stop();
      }
    }
  }, _callee27, undefined);
})));

test('PUT /users/:id 200 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee28() {
  var _ref55, status, body;

  return _regenerator2.default.wrap(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + user1.id).send({ access_token: session1, email: 'test@test.com' });

        case 2:
          _ref55 = _context28.sent;
          status = _ref55.status;
          body = _ref55.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.email).toBe('a@a.com');

        case 8:
        case 'end':
          return _context28.stop();
      }
    }
  }, _callee28, undefined);
})));

test('PUT /users/:id 200 (admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee29() {
  var _ref57, status, body;

  return _regenerator2.default.wrap(function _callee29$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + user1.id).send({ access_token: adminSession, name: 'test' });

        case 2:
          _ref57 = _context29.sent;
          status = _ref57.status;
          body = _ref57.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.name).toBe('test');

        case 8:
        case 'end':
          return _context29.stop();
      }
    }
  }, _callee29, undefined);
})));

test('PUT /users/:id 401 (user) - another user', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee30() {
  var _ref59, status;

  return _regenerator2.default.wrap(function _callee30$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          _context30.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + user1.id).send({ access_token: session2, name: 'test' });

        case 2:
          _ref59 = _context30.sent;
          status = _ref59.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context30.stop();
      }
    }
  }, _callee30, undefined);
})));

test('PUT /users/:id 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee31() {
  var _ref61, status;

  return _regenerator2.default.wrap(function _callee31$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + user1.id).send({ name: 'test' });

        case 2:
          _ref61 = _context31.sent;
          status = _ref61.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context31.stop();
      }
    }
  }, _callee31, undefined);
})));

test('PUT /users/:id 404 (admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee32() {
  var _ref63, status;

  return _regenerator2.default.wrap(function _callee32$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/123456789098765432123456').send({ access_token: adminSession, name: 'test' });

        case 2:
          _ref63 = _context32.sent;
          status = _ref63.status;

          expect(status).toBe(404);

        case 5:
        case 'end':
          return _context32.stop();
      }
    }
  }, _callee32, undefined);
})));

var passwordMatch = function () {
  var _ref64 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee33(password, userId) {
    var user;
    return _regenerator2.default.wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            _context33.next = 2;
            return _.User.findById(userId);

          case 2:
            user = _context33.sent;
            _context33.next = 5;
            return user.authenticate(password);

          case 5:
            return _context33.abrupt('return', !!_context33.sent);

          case 6:
          case 'end':
            return _context33.stop();
        }
      }
    }, _callee33, undefined);
  }));

  return function passwordMatch(_x, _x2) {
    return _ref64.apply(this, arguments);
  };
}();

test('PUT /users/me/password 200 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee34() {
  var _ref66, status, body;

  return _regenerator2.default.wrap(function _callee34$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/me/password').auth('a@a.com', '123456').send({ password: '654321' });

        case 2:
          _ref66 = _context34.sent;
          status = _ref66.status;
          body = _ref66.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.email).toBe('a@a.com');
          _context34.t0 = expect;
          _context34.next = 11;
          return passwordMatch('654321', body.id);

        case 11:
          _context34.t1 = _context34.sent;
          (0, _context34.t0)(_context34.t1).toBe(true);

        case 13:
        case 'end':
          return _context34.stop();
      }
    }
  }, _callee34, undefined);
})));

test('PUT /users/me/password 400 (user) - invalid password', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee35() {
  var _ref68, status, body;

  return _regenerator2.default.wrap(function _callee35$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/me/password').auth('a@a.com', '123456').send({ password: '321' });

        case 2:
          _ref68 = _context35.sent;
          status = _ref68.status;
          body = _ref68.body;

          expect(status).toBe(400);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.param).toBe('password');

        case 8:
        case 'end':
          return _context35.stop();
      }
    }
  }, _callee35, undefined);
})));

test('PUT /users/me/password 401 (user) - invalid authentication method', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee36() {
  var _ref70, status;

  return _regenerator2.default.wrap(function _callee36$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/me/password').send({ access_token: session1, password: '654321' });

        case 2:
          _ref70 = _context36.sent;
          status = _ref70.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context36.stop();
      }
    }
  }, _callee36, undefined);
})));

test('PUT /users/me/password 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee37() {
  var _ref72, status;

  return _regenerator2.default.wrap(function _callee37$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          _context37.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/me/password').send({ password: '654321' });

        case 2:
          _ref72 = _context37.sent;
          status = _ref72.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context37.stop();
      }
    }
  }, _callee37, undefined);
})));

test('PUT /users/:id/password 200 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee38() {
  var _ref74, status, body;

  return _regenerator2.default.wrap(function _callee38$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          _context38.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + user1.id + '/password').auth('a@a.com', '123456').send({ password: '654321' });

        case 2:
          _ref74 = _context38.sent;
          status = _ref74.status;
          body = _ref74.body;

          expect(status).toBe(200);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.email).toBe('a@a.com');
          _context38.t0 = expect;
          _context38.next = 11;
          return passwordMatch('654321', body.id);

        case 11:
          _context38.t1 = _context38.sent;
          (0, _context38.t0)(_context38.t1).toBe(true);

        case 13:
        case 'end':
          return _context38.stop();
      }
    }
  }, _callee38, undefined);
})));

test('PUT /users/:id/password 400 (user) - invalid password', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee39() {
  var _ref76, status, body;

  return _regenerator2.default.wrap(function _callee39$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          _context39.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + user1.id + '/password').auth('a@a.com', '123456').send({ password: '321' });

        case 2:
          _ref76 = _context39.sent;
          status = _ref76.status;
          body = _ref76.body;

          expect(status).toBe(400);
          expect(typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)).toBe('object');
          expect(body.param).toBe('password');

        case 8:
        case 'end':
          return _context39.stop();
      }
    }
  }, _callee39, undefined);
})));

test('PUT /users/:id/password 401 (user) - another user', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee40() {
  var _ref78, status;

  return _regenerator2.default.wrap(function _callee40$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          _context40.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + user1.id + '/password').auth('b@b.com', '123456').send({ password: '654321' });

        case 2:
          _ref78 = _context40.sent;
          status = _ref78.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context40.stop();
      }
    }
  }, _callee40, undefined);
})));

test('PUT /users/:id/password 401 (user) - invalid authentication method', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee41() {
  var _ref80, status;

  return _regenerator2.default.wrap(function _callee41$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          _context41.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + user1.id + '/password').send({ access_token: session1, password: '654321' });

        case 2:
          _ref80 = _context41.sent;
          status = _ref80.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context41.stop();
      }
    }
  }, _callee41, undefined);
})));

test('PUT /users/:id/password 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee42() {
  var _ref82, status;

  return _regenerator2.default.wrap(function _callee42$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          _context42.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/' + user1.id + '/password').send({ password: '654321' });

        case 2:
          _ref82 = _context42.sent;
          status = _ref82.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context42.stop();
      }
    }
  }, _callee42, undefined);
})));

test('PUT /users/:id/password 404 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee43() {
  var _ref84, status;

  return _regenerator2.default.wrap(function _callee43$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          _context43.next = 2;
          return (0, _supertestAsPromised2.default)(app()).put('/123456789098765432123456/password').auth('a@a.com', '123456').send({ password: '654321' });

        case 2:
          _ref84 = _context43.sent;
          status = _ref84.status;

          expect(status).toBe(404);

        case 5:
        case 'end':
          return _context43.stop();
      }
    }
  }, _callee43, undefined);
})));

test('DELETE /users/:id 204 (admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee44() {
  var _ref86, status;

  return _regenerator2.default.wrap(function _callee44$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          _context44.next = 2;
          return (0, _supertestAsPromised2.default)(app()).delete('/' + user1.id).send({ access_token: adminSession });

        case 2:
          _ref86 = _context44.sent;
          status = _ref86.status;

          expect(status).toBe(204);

        case 5:
        case 'end':
          return _context44.stop();
      }
    }
  }, _callee44, undefined);
})));

test('DELETE /users/:id 401 (user)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee45() {
  var _ref88, status;

  return _regenerator2.default.wrap(function _callee45$(_context45) {
    while (1) {
      switch (_context45.prev = _context45.next) {
        case 0:
          _context45.next = 2;
          return (0, _supertestAsPromised2.default)(app()).delete('/' + user1.id).send({ access_token: session1 });

        case 2:
          _ref88 = _context45.sent;
          status = _ref88.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context45.stop();
      }
    }
  }, _callee45, undefined);
})));

test('DELETE /users/:id 401', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee46() {
  var _ref90, status;

  return _regenerator2.default.wrap(function _callee46$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          _context46.next = 2;
          return (0, _supertestAsPromised2.default)(app()).delete('/' + user1.id);

        case 2:
          _ref90 = _context46.sent;
          status = _ref90.status;

          expect(status).toBe(401);

        case 5:
        case 'end':
          return _context46.stop();
      }
    }
  }, _callee46, undefined);
})));

test('DELETE /users/:id 404 (admin)', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee47() {
  var _ref92, status;

  return _regenerator2.default.wrap(function _callee47$(_context47) {
    while (1) {
      switch (_context47.prev = _context47.next) {
        case 0:
          _context47.next = 2;
          return (0, _supertestAsPromised2.default)(app()).delete('/123456789098765432123456').send({ access_token: adminSession });

        case 2:
          _ref92 = _context47.sent;
          status = _ref92.status;

          expect(status).toBe(404);

        case 5:
        case 'end':
          return _context47.stop();
      }
    }
  }, _callee47, undefined);
})));
//# sourceMappingURL=index.test.js.map