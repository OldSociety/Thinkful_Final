import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import ErrorAlert  from "../layout/ErrorAlert";
import {createReservation} from "../utils/api";
import ReservationForm from './ReservationForm'


export default function NewReservation ({date}) {
   const history = useHistory();
   const initialFormState = {
       first_name: "",
       last_name: "",
       mobile_number: "",
       reservation_date: date,
       reservation_time: "10:30",
       people: 1
   }

   const [formData, setFormData] = useState(initialFormState);
   const [reservationsError, setReservationsError] = useState(null);

   const handleChange = ({ target }) => {
       let value = target.value;

       if(target.name === "people"){
           if(value < 1)
                value = 1;
        value = Number(value);
       }
       setFormData({
           ...formData,
           [target.name]: value,
       });
   };

   const handleSubmit = (event) => {
    event.preventDefault();
    createReservation(formData).then(response => {
                    history.push(`/dashboard?date=${formData.reservation_date}`)
                }).catch((error)=>{
                    setReservationsError(error)});
  };
    return (
        <div className="main">

            <h1>New Reservation:</h1>

            <ErrorAlert error={reservationsError} />
            <ReservationForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
           
        </div>
    )
}