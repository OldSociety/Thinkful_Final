import React from 'react'
import { useHistory } from 'react-router-dom'

const Seat = ({ reservationId, currentDate, reservations }) => {
  const history = useHistory

  const handleCancel = (event) => {
    event.preventDefault()

    console.log('Canceled')
    history.goBack()
  }

  return (
    <main>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Available Tables for {currentDate}</h4>
      </div>
      {/* <ErrorAlert error={TablesError} /> */}
      <div className="table-list">
        <table>
          <thead>
            <tr>
              <th>Table Number</th>
              <th>Occupied</th>
              <th>Type</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(
              ({ table_name, capacity, type, occupied }, index) => (
                <tr key={index}>
                  <td>{table_name}</td>
                  <td>{capacity}</td>
                  <td>{type}</td>
                  <td>{occupied}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </main>
  )
}

export default Seat
