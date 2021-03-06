import axios from 'axios'
import moment from 'moment'

const API_KEY = 'APPID=7b05601290f3c029e2162277fc5b288d'

export const receiveForecast = (json) => {
  return {
    type: 'RECEIVE_FORECAST',
    location: json.data.name,
    temp: json.data.main.temp,
    weatherType: json.data.weather[0].main,
  }
}

export const receiveForecastByZip = (json) => {
  return {
    type: 'RECEIVE_FORECAST_ZIP',
    location: json.data.name,
    temp: json.data.main.temp,
    weatherType: json.data.weather[0].main,
  }
}

export const modifyFiveDay = (json) => {
  const todaysDate = moment().format('MM-DD-YYYY').toString().split('-')
  const today = `${todaysDate[2]}-${todaysDate[0]}-${todaysDate[1]}`

  json.data.list.forEach((day) => {
    day.dt_txt = day.dt_txt.split(' ')[0]
    day.dt = new Date((day.dt * 1000) + 25200000)
    day.dt = day.dt.getHours()

    if (day.dt >= 12) {
      day.dt = `${day.dt -= 12} PM`
    } else {
      day.dt = `${day.dt} AM`
    }
  })

  const notToday = json.data.list.filter((day) => {
    return day.dt_txt !== today
  })

  return {
    a: notToday.slice(0, 8).map((hour) => {
      return {
        time: hour.dt,
        date: hour.dt_txt,
        day: moment(hour.dt_txt).format('dddd'),
        temp: hour.main.temp,
        main: hour.weather[0].main,
        description: hour.weather[0].description,
      }
    }),
    b: notToday.slice(8, 16).map((hour) => {
      return {
        time: hour.dt,
        date: hour.dt_txt,
        day: moment(hour.dt_txt).format('dddd'),
        temp: hour.main.temp,
        main: hour.weather[0].main,
        description: hour.weather[0].description,
      }
    }),
    c: notToday.slice(16, 24).map((hour) => {
      return {
        time: hour.dt,
        date: hour.dt_txt,
        day: moment(hour.dt_txt).format('dddd'),
        temp: hour.main.temp,
        main: hour.weather[0].main,
        description: hour.weather[0].description,
      }
    }),
    d: notToday.slice(24, 32).map((hour) => {
      return {
        time: hour.dt,
        date: hour.dt_txt,
        day: moment(hour.dt_txt).format('dddd'),
        temp: hour.main.temp,
        main: hour.weather[0].main,
        description: hour.weather[0].description,
      }
    }),
  }
}

export const receiveCurrentExtendedForecast = (json) => {
  return {
    type: 'RECEIVE_CURRENT_EXTENDED',
    data: modifyFiveDay(json),
  }
}

export const receiveFiveDayForecast = (json) => {
  return {
    type: 'RECEIVE_FIVEDAY_FORECAST',
    data: modifyFiveDay(json),
  }
}

export const fetchFiveDay = (city) => {
  return (dispatch) => {
    return axios.get(`
      http://api.openweathermap.org/data/2.5/forecast?q=${city},us&${API_KEY}
      `)
      .then(json => {
        dispatch(receiveFiveDayForecast(json))
      })
      .catch(error => console.error('Error with api call...', error.message))
  }
}

export const fetchForecast = (position) => {
  return (dispatch) => {
    return axios.get(`
      http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&${API_KEY}
    `)
      .then(json => {
        dispatch(receiveForecast(json))
      })
      .catch(error => console.error('Error with api call...', error.message))
  }
}

export const fetchForecastByZip = (zip) => {
  return (dispatch) => {
    return axios.get(`
    http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&${API_KEY}
    `)
      .then(json => {
        dispatch(receiveForecastByZip(json))
        return json
      })
      .then(json => {
        dispatch(fetchFiveDay(json.data.name))
      })
      .catch(error => console.error('Error with api call...', error.message))
  }
}

export const fetchCurrentLocationForecast = (position) => {
  return (dispatch) => {
    return axios.get(`
      http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&${API_KEY}
    `)
      .then(json => {
        dispatch(receiveCurrentExtendedForecast(json))
      })
      .catch(error => console.error('Error with api call...', error.message))
  }
}

export const removePinnedCity = (index) => {
  return {
    type: 'REMOVE_PINNED_CITY',
    index,
  }
}
