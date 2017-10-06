import { Router } from 'express'
import user from './user'
import auth from './auth'
import disappeared from './disappeared'
import characteristics from './characteristics'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/disappeareds', disappeared)
router.use('/characteristics', characteristics)

export default router
