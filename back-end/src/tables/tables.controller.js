/**
 * List handler for reservation resources
 */
 const reservationService = require('./tables.service')
 const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
 const hasProperties = require('../errors/hasProperties')
 
 // ensures required properities on submit
 const hasRequiredProperties = hasProperties(
  'table_id',
  'table_name',
  'capacity'
 )
 
 async function list(req, res, next) {
   const { date } = req.query
   const data = await reservationService.list(date)
   res.status(200).json({ data })
 }
 
 async function create(req, res) {
   const { data = {} } = req.body
   await reservationService.create(data)
   res.status(201).json({ data })
 }
 
 
 const VALID_PROPERTIES = [
   'table_id',
   'table_name',
   'capacity'
 ]
 
 function hasOnlyValidProperties(req, res, next) {
   const { data = {} } = req.body
 
   const invalidFields = Object.keys(data).filter(
     (field) => !VALID_PROPERTIES.includes(field)
   )
 
   if (invalidFields.length) {
     return next({
       status: 400,
       message: `Invalid field(s): ${invalidFields.join(', ')}`,
     })
   }
   console.log(typeof data.people)
   next()
 }
 
 
 module.exports = {
   list: asyncErrorBoundary(list),
   create: [
     hasOnlyValidProperties,
     hasRequiredProperties,
     asyncErrorBoundary(create),
   ],
 }
 