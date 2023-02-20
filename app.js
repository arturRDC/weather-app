const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const addressQuery = process.argv[2]
if (!addressQuery) {
  return console.log('Error. Please input a location.')
} else {
  geocode(addressQuery, (error, { latitude, longitude, location } = {}) => {
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
