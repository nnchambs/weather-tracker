import React, { Component } from 'react'
import { Link } from 'react-router'
import convertKelvinToFahrenheit from './helpers/temp-conversion'

const ThreeHour = ({ state, params }) => {
  const id = params.id
  const data = state.getFiveDayForecast[id].forecast

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
        <div key={i} className="extended-forecast-each-card" id={hour.day}>
          <ul>
            <li>{hour.day}</li>
            <li>{hour.time}</li>
            <li>{Math.floor(convertKelvinToFahrenheit(hour.temp))}&deg;</li>
            <li>{hour.description}</li>
          </ul>
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