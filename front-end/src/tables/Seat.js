import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { API_BASE_URL } from '../utils/api'

const Seat = () => {
  const history = useHistory
  const [status, setStatus] = useState(false)
  const [fetchedData, updateFetchedData] = useState([])

  let api = `${API_BASE_URL}/tables`

  useEffect(() => {
    ;(async function () {
      const abortController = new AbortController()
      try {
        let data = await fetch(api).then((res) => res.json())
        updateFetchedData(data)
      } catch (error) {
        // setReservationsError(error)
      }
      return () => abortController.abort()
    })()
  }, [api])

  console.log('fetched Data', Object.values(fetchedData))

  const handleCancel = (event) => {
    event.preventDefault()

    console.log('Canceled')
    history.goBack()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submitted')
  }

  const handleChange = () => {
    setStatus(!status)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Available Tables</h4>
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
            <div className="container p-3">
              <div className="row">
                <label htmlFor="table_name">
                  Table:
                  <br />
                  <select
                    type="text"
                    className="table_name"
                    onChange={handleChange}
                    value={fetchedData.status}
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
                  <br />
                  <input
                    type="text"
                    className="capacity"
                    onChange={handleChange}
                    value={fetchedData.capacity}
                    required
                  />
                </label>
              </div>

              <br />
            </div>
          </tbody>
        </table>
        <button className="m-1" type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="m-1" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}

export default Seat
