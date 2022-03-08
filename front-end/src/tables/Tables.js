import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import ErrorAlert from '../layout/ErrorAlert'
import { postTables } from '../utils/api'

const Tables = () => {
  const initialFormState = {
    table_id: '',
    capacity: ''
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
      <div className="container p-3">
      <div className="row">
        <label htmlFor="table_name">
          Table:
          <br/>
          <select
            type="text"
            className="table_name"
            onChange={handleChange}
            value={formData.table_id}
            required
          >
          <option value="1">Bar 1</option>
          <option value="2">Bar 2</option>
          <option value="3">Table 1</option>
          <option value="4">Table 2</option>
          </select>
        </label>
      </div>

      <br />
      <div className="row">
        <label htmlFor="capacity">
          Capacity:
          <br/>
          <input
            type="text"
            className="capacity"
            onChange={handleChange}
            value={formData.capacity}
            required
          />
        </label>
      </div>
      
      <br />
      <button className="m-1" type="button" onClick={handleCancel}>
        Cancel
      </button>
      <button className="m-1" type="submit">Submit</button>
      </div>
    </form>
    
  )
}

export default Tables
