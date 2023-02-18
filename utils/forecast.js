const request = require('postman-request')
const dotenv = require('dotenv').config()

const forecast = (lat, long, callback) => {
  const wsAccessKey = process.env.WEATHERSTACK_ACCESS_KEY
  const latLong = encodeURIComponent(`${lat},${long}`)
  const tempUnit = 'm'
  const url = `http://api.weatherstack.com/current?access_key=${wsAccessKey}&query=${latLong}&units=${tempUnit}`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Error. Failed to connect to weather API', undefined)
    } else if (body.error) {
      callback('Error. Failed to find location', undefined)
    } else {
      const temperature = body.current.temperature
      const feelsLike = body.current.feelslike
      const weatherDesc = body.current.weather_descriptions[0]

      callback(
        undefined,
        `The weather is ${weatherDesc}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`
      )
    }
  })
}

module.exports = forecast
