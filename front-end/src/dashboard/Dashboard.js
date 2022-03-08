/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { listReservations, listTables } from '../utils/api'
import ErrorAlert from '../layout/ErrorAlert'
import { previous, today, next } from '../utils/date-time'
import Seat from '../tables/Seat'
// import { abort } from 'process'

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  const [currentDate, setCurrentDate] = useState(date)
  const [displayTables, setDisplayTables] = useState(false)
  const [reservationId, setReservationId] = useState()

  useEffect(() => {
    setReservationsError(null)
    async function loadDashboard() {
      const abortController = new AbortController()
      try {
        const data = await listReservations(currentDate, abortController.signal)
        setReservations(data)
      } catch (error) {
        setReservationsError(error)
      }
      return () => abortController.abort()
    }
    loadDashboard()
  }, [currentDate])

  function clickHandler({ target }) {
    console.log(target.name)
    if (target.name === 'previous') {
      setCurrentDate(previous(currentDate))
      console.log('date: ', currentDate)
    } else if (target.name === 'next') {
      setCurrentDate(next(currentDate))
      console.log('date: ', currentDate)
    } else {
      setCurrentDate(today())
      console.log('date: ', currentDate)
    }
  }

  const handleSeat = async (event) => {
    event.preventDefault()
    setDisplayTables(!displayTables)

    async function loadTable() {
      const abortController = new AbortController()
      try {
        const data = await listTables(reservationId, abortController.signal)
        setReservationId(data)
      } catch (error) {
        setReservationsError(error)
      }
      return () => abortController.abort()
    }
    loadTable()
  }

  if (displayTables) {
    <Seat reservationId={reservationId} currentDate={currentDate} reservations={reservations} />
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {currentDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="reservation-list">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>People</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(
              (
                {
                  first_name,
                  last_name,
                  mobile_number,
                  reservation_date,
                  reservation_time,
                  people,
                },
                index
              ) => (
                <tr key={index}>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{mobile_number}</td>
                  <td>{reservation_date}</td>
                  <td>{reservation_time}</td>
                  <td>{people}</td>
                  <button onClick={handleSeat}>Seat</button>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <br />
      <button name="previous" type="button" onClick={clickHandler}>
        Previous
      </button>
      <button name="today" type="button" onClick={clickHandler}>
        Today
      </button>
      <button name="next" type="button" onClick={clickHandler}>
        Next
      </button>
    </main>
  )
}

export default Dashboard
