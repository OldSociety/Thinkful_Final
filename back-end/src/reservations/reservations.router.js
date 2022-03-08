/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require('express').Router()
const controller = require('./reservations.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')
const cors = require('cors')

router.use(cors())

router.route('/:reservationId/seat').get(controller.readTables)

router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed)

module.exports = router
