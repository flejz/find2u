'use strict';

var _ = require('.');

var response = _interopRequireWildcard(_);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var res = void 0;

beforeEach(function () {
  res = {
    status: jest.fn(function () {
      return res;
    }),
    json: jest.fn(function () {
      return res;
    }),
    end: jest.fn(function () {
      return res;
    })
  };
});

describe('success', function () {
  it('responds with passed object and status 200', function () {
    expect(response.success(res)({ prop: 'value' })).toBeNull();
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ prop: 'value' });
  });

  it('responds with passed object and status 201', function () {
    expect(response.success(res, 201)({ prop: 'value' })).toBeNull();
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ prop: 'value' });
  });

  it('does not send any response when object has not been passed', function () {
    expect(response.success(res, 201)()).toBeNull();
    expect(res.status).not.toBeCalled();
  });
});

describe('notFound', function () {
  it('responds with status 404 when object has not been passed', function () {
    expect(response.notFound(res)()).toBeNull();
    expect(res.status).toBeCalledWith(404);
    expect(res.end).toHaveBeenCalledTimes(1);
  });

  it('returns the passed object and does not send any response', function () {
    expect(response.notFound(res)({ prop: 'value' })).toEqual({ prop: 'value' });
    expect(res.status).not.toBeCalled();
    expect(res.end).not.toBeCalled();
  });
});

describe('authorOrAdmin', function () {
  var user = void 0,
      entity = void 0;

  beforeEach(function () {
    user = {
      id: 1,
      role: 'user'
    };
    entity = {
      author: {
        id: 1,
        equals: function equals(id) {
          return id === this.id;
        }
      }
    };
  });

  it('returns the passed entity when author is the same', function () {
    expect(response.authorOrAdmin(res, user, 'author')(entity)).toEqual(entity);
  });

  it('returns the passed entity when author is admin', function () {
    user.role = 'admin';
    expect(response.authorOrAdmin(res, user, 'user')(entity)).toEqual(entity);
  });

  it('responds with status 401 when author is not the same or admin', function () {
    user.id = 2;
    expect(response.authorOrAdmin(res, user, 'author')(entity)).toBeNull();
    expect(res.status).toBeCalledWith(401);
    expect(res.end).toHaveBeenCalledTimes(1);
  });

  it('returns null without sending response when entity has not been passed', function () {
    expect(response.authorOrAdmin(res, user, 'author')()).toBeNull();
  });
});
//# sourceMappingURL=index.test.js.map