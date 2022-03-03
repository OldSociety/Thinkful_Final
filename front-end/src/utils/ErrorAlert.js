import React from 'react'

const ErrorAlert = ({error}) => {
    console.log(error)
  return (
      error && error.message.map((msg) => (
        <div className="alert alert-danger m-2" role="alert">Error! {msg}</div>
      ))

  )
}

export default ErrorAlert