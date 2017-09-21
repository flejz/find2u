'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.User = undefined;

var _model = require('./model');

Object.defineProperty(exports, 'schema', {
  enumerable: true,
  get: function get() {
    return _model.schema;
  }
});

var _express = require('express');

var _querymen = require('querymen');

var _bodymen = require('bodymen');

var _passport = require('../../services/passport');

var _controller = require('./controller');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.User = _model2.default;


var router = new _express.Router();
var _schema$tree = _model.schema.tree,
    email = _schema$tree.email,
    password = _schema$tree.password,
    name = _schema$tree.name,
    picture = _schema$tree.picture,
    role = _schema$tree.role;

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */

router.get('/', (0, _passport.token)({ required: true, roles: ['admin'] }), (0, _querymen.middleware)(), _controller.index);

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get('/me', (0, _passport.token)({ required: true }), _controller.showMe);

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get('/:id', _controller.show);

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String=user,admin} [role=user] User's picture.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/', (0, _passport.master)(), (0, _bodymen.middleware)({ email: email, password: password, name: name, picture: picture, role: role }), _controller.create);

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/:id', (0, _passport.token)({ required: true }), (0, _bodymen.middleware)({ name: name, picture: picture }), _controller.update);

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 */
router.put('/:id/password', (0, _passport.password)(), (0, _bodymen.middleware)({ password: password }), _controller.updatePassword);

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete('/:id', (0, _passport.token)({ required: true, roles: ['admin'] }), _controller.destroy);

exports.default = router;
//# sourceMappingURL=index.js.map