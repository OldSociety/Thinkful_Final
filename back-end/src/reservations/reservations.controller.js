/**
 * List handler for reservation resources
 */
const service = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const hasProperties = require('../errors/hasProperties')

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params
  const reservation = await service.read(reservation_id)
  if (reservation) {
    res.locals.reservation = reservation
    return next()
  }
  return next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  })
}

// ensures required properities on submit
const hasRequiredProperties = hasProperties(
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people'
)

async function list(req, res, next) {
  //list all reservations 
  const { date } = req.query
  const data = await service.list(date)
  res.status(200).json({ data })
}

async function create(req, res) {
  const { data = {} } = req.body
  await service.create(data)
  res.status(201).json({ data })
}

async function read(req, res, next) {
  res.json({ data: res.locals.reservation })
}

const VALID_PROPERTIES = [
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people',
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
  next()
}

function peopleIsValidNumber(req, res, next) {
  const { data = {} } = req.body
  if (data.people <= 0 || !Number.isInteger(data.people)) {
    return next({
      status: 400,
      message: `people must be an integer greater than 0`,
    })
  }
}

function timeDateValidation(req, res, next) {
  const { data = {} } = req.body
  let date = data.reservation_date + 'T' + data.reservation_time
  let time = data.reservation_time.replace(':', '')
  const d = new Date(date)
  const currentDate = new Date().getTime()

  const date_regex = /\d{4}-\d{2}-\d{2}/g
  const time_regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/

  // date must be in value YYYY-MM-DD
  if (!date_regex.test(data.reservation_date)) {
    return next({
      status: 400,
      message: 'reservation_date must be a valid date',
    })
  }
  //cannot set before current date
  else if (d.getTime() <= currentDate) {
    return next({
      status: 400,
      message: `"future".`,
    })
    //closed on tuesdays
  } else if (
    d.getDay() === 2
    //&& !d.getTime() <= currentDate
  ) {
    return next({
      status: 400,
      message: `"closed"`,
    })
    //story is closed before 1030 am and after 930pm
  } else if (time < 1030 || time > 2130) {
    return next({
      status: 400,
      message: `"closed".`,
    })
    // time must be a valid time
  } else if (!time_regex.test(data.reservation_time)) {
    return next({
      status: 400,
      message: 'reservation_time must be a valid time',
    })
  }
  next()
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    timeDateValidation,
    peopleIsValidNumber,
    asyncErrorBoundary(create),
  ],
}
