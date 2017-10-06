import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Characteristics } from '.'

export const create = ({ user, disappeared, bodymen: { body } }, res, next) =>
  Characteristics.create({ ...body, user, disappeared })
    .then((characteristics) => characteristics.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Characteristics.find(query, select, cursor)
    .populate('user')
    .populate('disappeared')
    .then((characteristics) => characteristics.map((characteristics) => characteristics.view()))
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Characteristics.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((characteristics) => characteristics ? characteristics.remove() : null)
    .then(success(res, 204))
    .catch(next)
