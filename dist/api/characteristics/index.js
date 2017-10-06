'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.Characteristics = undefined;

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

var _controller2 = require('../disappeared/controller');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Characteristics = _model2.default;


var router = new _express.Router();
var _schema$tree = _model.schema.tree,
    reference_id = _schema$tree.reference_id,
    type = _schema$tree.type,
    which = _schema$tree.which,
    description = _schema$tree.description;

/**
 * @api {post} /characteristics Create characteristics
 * @apiName CreateCharacteristics
 * @apiGroup Characteristics
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam reference_id Characteristics's reference_id.
 * @apiParam type Characteristics's type.
 * @apiParam which Characteristics's which.
 * @apiParam description Characteristics's description.
 * @apiSuccess {Object} characteristics Characteristics's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Characteristics not found.
 * @apiError 401 user access only.
 */

router.post('/', (0, _passport.token)({ required: true }), _controller2.get, (0, _bodymen.middleware)({ reference_id: reference_id, type: type, which: which, description: description }), _controller.create);

/**
 * @api {get} /characteristics Retrieve characteristics
 * @apiName RetrieveCharacteristics
 * @apiGroup Characteristics
 * @apiUse listParams
 * @apiSuccess {Object[]} characteristics List of characteristics.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', (0, _querymen.middleware)(), _controller.index);

/**
 * @api {delete} /characteristics/:id Delete characteristics
 * @apiName DeleteCharacteristics
 * @apiGroup Characteristics
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Characteristics not found.
 * @apiError 401 user access only.
 */
router.delete('/:id', (0, _passport.token)({ required: true }), _controller.destroy);

exports.default = router;
//# sourceMappingURL=index.js.map