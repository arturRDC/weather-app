const request = require('postman-request')
const dotenv = require('dotenv').config()

const forecast = (lat, long, callback) => {
  const wsAccessKey = process.env.WEATHERSTACK_ACCESS_KEY
  const latLong = encodeURIComponent(`${lat},${long}`)
  const tempUnit = 'm'
  const urlWeather = `http://api.weatherstack.com/current?access_key=${wsAccessKey}&query=${latLong}&units=${tempUnit}`

  request({ url: urlWeather, json: true }, (error, response) => {
    if (error) {
      callback('Error. Failed to connect to weather API', undefined)
    } else if (response.body.error) {
      callback('Error. Failed to find location', undefined)
    } else {
      const current = response.body.current
      const temperature = current.temperature
      const feelsLike = current.feelslike
      const weatherDesc = current.weather_descriptions[0]

      callback(
        undefined,
        `The weather is ${weatherDesc}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`
      )
    }
  })
}

module.exports = forecast
