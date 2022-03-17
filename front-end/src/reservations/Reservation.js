import React from "react";
import { Link } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

export default function Reservation({
  res,
  loadDashboard,
  setReservationError,
}) {
  const handleCancel = (event) => {
    event.preventDefault();
    const confirm = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirm) {
      cancelHandler(res.reservation_id);
    }
  };
  function cancelHandler(reservation_id) {
    const abortController = new AbortController();

    updateReservationStatus(reservation_id, "cancelled", abortController.status)
      .then(() => {
        return loadDashboard();
      })
      .catch(setReservationError);
    return () => abortController.abort();
  }

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
  }

  return (
    <>
      <div className="reservation">
        <div className="split">
          <div className="resName">
            {res.first_name} {res.last_name}{" "}
          </div>
          <div className="resSub">{formatPhoneNumber(res.mobile_number)}</div>
          <div className="resSub">Party of {res.people}</div>
          <div className="resSub">Date: {res.reservation_date}</div>
          <div className="resSub">Time: {res.reservation_time}</div>
          <br />
        </div>
        <div className="split">
          <div
            className="resSub"
            data-reservation-id-status={res.reservation_id}
          >
            {res.status}
          </div>

          <div>
            {res.status !== "seated" ? (
              <Link
                to={`/reservations/${res.reservation_id}/seat`}
                className="button"
              >
                Seat
              </Link>
            ) : (
              ""
            )}
            <br />
            <Link
              to={`/reservations/${res.reservation_id}/edit`}
              className="button"
            >
              Edit
            </Link>
            <br />
            <button
              className="btn btn-danger"
              data-reservation-id-cancel={res.reservation_id}
              onClick={handleCancel}
            >
              <span className="danger">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
