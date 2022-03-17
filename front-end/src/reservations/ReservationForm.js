import React from "react";
import { useHistory } from "react-router-dom";

const ReservationForm = ({ formData, handleChange, handleSubmit }) => {
  const history = useHistory();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          onChange={handleChange}
          value={formData.first_name}
        />
        <label htmlFor="last_name">Last Name:</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          onChange={handleChange}
          value={formData.last_name}
        />
        <label htmlFor="mobile_number">Mobile Number:</label>
        <input
          id="mobile_number"
          type="tel"
          name="mobile_number"
          onChange={handleChange}
          value={formData.mobile_number}
        />
        <label htmlFor="reservation_date">Reservation Date:</label>
        <input
          id="reservation_date"
          type="date"
          name="reservation_date"
          onChange={handleChange}
          value={formData.reservation_date}
        />
        <label htmlFor="reservation_time">Reservation Time:</label>
        <input
          id="reservation_time"
          type="time"
          name="reservation_time"
          onChange={handleChange}
          value={formData.reservation_time}
        />
        <label htmlFor="people">Total Guests:</label>
        <input
          id="people"
          type="number"
          name="people"
          onChange={handleChange}
          value={formData.people}
        />

        <button className="btn btn-primary m-1" type="submit">
          Submit
        </button>
        <button
          className="btn btn-danger m-1"
          type="cancel"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default ReservationForm;
