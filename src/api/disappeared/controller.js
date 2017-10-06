import _ from 'lodash'
import { success, notFound, badRequest, authorOrAdmin } from '../../services/response/'
import { Disappeared } from '.'

export const create = ({ user, bodymen: { body } }, res, next) => 
  Disappeared.create({ ...body, user })
    .then((disappeared) => disappeared.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Disappeared.find(query, select, cursor)
    .populate('user')
    .then((disappeareds) => disappeareds.map((disappeared) => disappeared.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Disappeared.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((disappeared) => disappeared ? disappeared.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Disappeared.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((disappeared) => disappeared ? _.merge(disappeared, body).save() : null)
    .then((disappeared) => disappeared ? disappeared.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Disappeared.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((disappeared) => disappeared ? disappeared.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const get = (req, res, next) =>
    Disappeared.findById(req.body.disappeared_id)
      .then((disappeared) => {
        req.disappeared = disappeared;
        next();
      })
      .catch(badRequest(res))