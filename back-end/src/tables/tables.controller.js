/**
 * List handler for reservation resources
 */
const tableService = require('./tables.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
// const hasProperties = require('../errors/hasProperties')

// ensures required properities on submit
// const hasRequiredProperties = hasProperties(
//   'table_name',
//   'capacity'
// )

async function list(req, res) {
  const data = await tableService.list()
  res.json({ data })
}

async function update(req, res) {
  const { table_id } = req.params;
  const data = await tableService.update(table_id);
  res.json({ data });
}

async function read(req, res, next) {
  res.json({ data: res.locals.table })
}

// async function create(req, res) {
//   const { data = {} } = req.body
//   await tableService.create(data)
//   res.status(201).json({ data })
// }

// const VALID_PROPERTIES = ['table_id', 'table_name', 'capacity', 'status']

// function hasOnlyValidProperties(req, res, next) {
//   const { data = {} } = req.body

//   const invalidFields = Object.keys(data).filter(
//     (field) => !VALID_PROPERTIES.includes(field)
//   )

//   if (invalidFields.length) {
//     return next({
//       status: 400,
//       message: `Invalid field(s): ${invalidFields.join(', ')}`,
//     })
//   }
//   res.status(201).json({ data })
//   next()
// }

// function tableValidator(req, res, next) {
//   const { data = {} } = req.body
//   const tableCapacity = table.capacity
//   const status = data.occupied
//   const partySize = data.capacity

//   if (partySize <= 0 || tableCapacity < partySize) {
//     return next({
//       status: 400,
//       message: `Minimum party size not met.`,
//     })
//   }

//   if (status) {
//     return next({
//       status: 400,
//       message: `This table is occupied. Please choose another table`,
//     })
//   }
//   next()
// }

module.exports = {
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(update)],
  read: [asyncErrorBoundary(read)]
  // create: [
  //   hasOnlyValidProperties,
  //   hasRequiredProperties,
  //   tableValidator,
  //   asyncErrorBoundary(create),
  // ],
}
