const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const locationQuery = process.argv[2]
if (!locationQuery) {
  return console.log('Error. Please input a location.')
} else {
  geocode(locationQuery, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.log(error)
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error)
      }

      console.log(location)
      console.log(forecastData)
    })
  })
}
