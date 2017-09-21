'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var success = exports.success = function success(res, status) {
  return function (entity) {
    if (entity) {
      res.status(status || 200).json(entity);
    }
    return null;
  };
};

var notFound = exports.notFound = function notFound(res) {
  return function (entity) {
    if (entity) {
      return entity;
    }
    res.status(404).end();
    return null;
  };
};

var authorOrAdmin = exports.authorOrAdmin = function authorOrAdmin(res, user, userField) {
  return function (entity) {
    if (entity) {
      var isAdmin = user.role === 'admin';
      var isAuthor = entity[userField] && entity[userField].equals(user.id);
      if (isAuthor || isAdmin) {
        return entity;
      }
      res.status(401).end();
    }
    return null;
  };
};
//# sourceMappingURL=index.js.map