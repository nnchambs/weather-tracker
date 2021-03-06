import React, { Component } from 'react'
import { Link } from 'react-router'
import convertKelvinToFahrenheit from './helpers/temp-conversion'
import Loader from './loader'

class Header extends Component {
  render() {
    const { state } = this.props
    let data

    const location = state.getCurrentWeather.location
    const temp = state.getCurrentWeather.temp
    const weatherType = state.getCurrentWeather.weatherType

    if (this.props.test || state.getCurrentWeather.temp) {
      const tempF = Math.floor(convertKelvinToFahrenheit(temp))
      data = (
        <header>
          <div className="header-container">
            <h2 className="header-text-main">The current weather in <span className="header-text-location">{location}</span><br /> is <span className="header-text-temp">{tempF}&deg;F </span> and <span className="header-text-weather-type">{weatherType.toLowerCase()}</span>.</h2>
            <Link className="extended-forecast-link" to={`/Extended/${state.getCurrentWeather.location}/${-1}`}>View Extended Forecast &raquo;</Link>
          </div>
        </header>
      )
    } else {
      data = <Loader />
    }

    return (
      <main>
        {data}
      </main>
    )
  }

}

export default Header
