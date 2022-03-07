import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ErrorAlert from '../layout/ErrorAlert'
import { postTables } from '../utils/api'

const Tables = () => {
  const initialFormState = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: '',
  }

  const history = useHistory
  const [formData, setFormData] = useState({ ...initialFormState })
  const [newTableError, setNewTableError] = useState(null)

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,

      [target.name]: target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    postTables(formData)
      .then(() => {
        setFormData({ ...initialFormState })
        history.goBack()
      })
      .catch((error) => setNewTableError(error))
    console.log(formData.reservation_time)
  }

  const handleCancel = (event) => {
    event.preventDefault()

    console.log('Canceled')
    setFormData({ ...initialFormState })
    history.goBack()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="table_name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        className="capacity"
        onChange={handleChange}
        required
      />
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Tables
