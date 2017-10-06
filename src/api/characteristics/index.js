import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, destroy } from './controller'
import { get as fromDisappeared } from '../disappeared/controller'
import { schema } from './model'
export Characteristics, { schema } from './model'

const router = new Router()
const { reference_id, type, which, description } = schema.tree

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
router.post('/',
  token({ required: true }),
  fromDisappeared,
  body({ reference_id, type, which, description }),
  create)

/**
 * @api {get} /characteristics Retrieve characteristics
 * @apiName RetrieveCharacteristics
 * @apiGroup Characteristics
 * @apiUse listParams
 * @apiSuccess {Object[]} characteristics List of characteristics.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

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
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
