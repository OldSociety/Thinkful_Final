import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ErrorAlert from '../layout/ErrorAlert'
import { API_BASE_URL, postReservation } from '../../src/utils/api'

const Reservations = () => {
  const initialFormState = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: '',
  }

  const [formData, setFormData] = useState({ ...initialFormState })
  const [fetchedData, updateFetchedData] = useState([])
  const [newReservationError, setNewReservationError] = useState(null)
  const { data } = fetchedData

  let api = `${API_BASE_URL}/reservations`
  const history = useHistory()

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,

      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    postReservation(formData)
      .then(() => {
        setFormData({ ...initialFormState })
        history.goBack()
      })
      .catch((error) => setNewReservationError(error))
  }

  const handleCancel = (event) => {
    event.preventDefault()

    console.log('Canceled')
    setFormData({ ...initialFormState })
    history.goBack()
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorAlert error={newReservationError} />
      <div className="container">
        <div className="row">
          <label htmlFor="first_name">
            First Name:
            <br />
            <input
              id="first_name"
              type="text"
              name="first_name"
              onChange={handleChange}
              value={formData.first_name}
              //   required
            />
          </label>

          <br />
        </div>

        <div className="row">
          <label htmlFor="last_name">
            Last Name:
            <br />
            <input
              id="last_name"
              type="text"
              name="last_name"
              onChange={handleChange}
              value={formData.last_name}
              //   required
            />
          </label>

          <br />
        </div>

        <div className="row">
          <label htmlFor="mobile_number">
            Phone Number:
            <br />
            <input
              id="mobile_number"
              type="text"
              name="mobile_number"
              onChange={handleChange}
              value={formData.mobile_number}
              //   required
            />
          </label>

          <br />
        </div>
        <div className="row">
          <label htmlFor="reservation_date">
            Date of Reservation:
            <br />
            <input
              id="reservation_date"
              type="date"
              name="reservation_date"
              onChange={handleChange}
              value={formData.reservation_date}
              //   required
            />
          </label>

          <br />
        </div>

        <div className="row">
          <label htmlFor="reservation_time">
            Time of Reservation:
            <br />
            <input
              id="reservation_time"
              type="text"
              name="reservation_time"
              onChange={handleChange}
              value={formData.reservation_time}
              //   required
            />
          </label>

          <br />
        </div>

        <div className="row">
          <label htmlFor="people">
            Number of People:
            <br />
            <input
              id="people"
              type="text"
              name="people"
              onChange={handleChange}
              value={formData.people}
              //   required
            />
          </label>

          <br />
        </div>
      </div>

      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Reservations
