import React, { Component } from 'react'
import { Link } from 'react-router'
import convertKelvinToFahrenheit from './helpers/temp-conversion'

const ThreeHour = ({ state, params }) => {
  let data
  const id = params.id

  if (id >= 0) {
    data = state.getFiveDayForecast[id].forecast
  } else {
    data = state.setLocation[0].forecast
  }

  const dataArray = Object.keys(data).map((key) => data[key])

  const displayDay = dataArray.map((day, i) => {
    const theDay = day[0].day
    return (
      <h2 key={i}>{theDay}</h2>
    )
  })

  const displayData = dataArray.map((day) => {
    return day.map((hour, i) => {
      return (
        <div key={i} className="extended-forecast-each-card" id={i}>
          <ul>
            <li>{hour.day}</li>
            <li>{hour.time}</li>
            <li>{Math.floor(convertKelvinToFahrenheit(hour.temp))}&deg;</li>
            <li>{hour.description}</li>
          </ul>
          <hr />
          {/* <br /><br /><br /> */}
        </div>
      )
    })
  })
  return (
    <div className="extended-container">
      <Link className="back-to-dashboard-link" to="/">
        Back to Dashboard &raquo;
      </Link>
      <h2 className="extended-city-location">{params.name}</h2>
      <div className="display-data-container">
        {displayData}
      </div>
    </div>
  )
}

export default ThreeHour
