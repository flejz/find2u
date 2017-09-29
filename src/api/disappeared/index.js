import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Disappeared, { schema } from './model'

const router = new Router()
const { name, bornAt, obs, policeDocument, status } = schema.tree

/**
 * @api {post} /disappeareds Create disappeared
 * @apiName CreateDisappeared
 * @apiGroup Disappeared
 * @apiPermission user
 * @apiParam {String} token user access token.
 * @apiParam name Disappeared's name.
 * @apiParam bornAt Disappeared's bornAt.
 * @apiParam obs Disappeared's obs.
 * @apiParam status Disappeared's status.
 * @apiSuccess {Object} disappeared Disappeared's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Disappeared not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, bornAt, obs, policeDocument, status }),
  create)

/**
 * @api {get} /disappeareds Retrieve disappeareds
 * @apiName RetrieveDisappeareds
 * @apiGroup Disappeared
 * @apiUse listParams
 * @apiSuccess {Object[]} disappeareds List of disappeareds.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /disappeareds/:id Retrieve disappeared
 * @apiName RetrieveDisappeared
 * @apiGroup Disappeared
 * @apiSuccess {Object} disappeared Disappeared's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Disappeared not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /disappeareds/:id Update disappeared
 * @apiName UpdateDisappeared
 * @apiGroup Disappeared
 * @apiPermission user
 * @apiParam {String} token user access token.
 * @apiParam name Disappeared's name.
 * @apiParam bornAt Disappeared's bornAt.
 * @apiParam obs Disappeared's obs.
 * @apiParam status Disappeared's status.
 * @apiSuccess {Object} disappeared Disappeared's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Disappeared not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, bornAt, obs, policeDocument, status }),
  update)

/**
 * @api {delete} /disappeareds/:id Delete disappeared
 * @apiName DeleteDisappeared
 * @apiGroup Disappeared
 * @apiPermission user
 * @apiParam {String} token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Disappeared not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
