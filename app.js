const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const locationQuery = process.argv[2]
if (!locationQuery) {
  return console.log('Error. Please input a location.')
} else {
  geocode(locationQuery, (error, data) => {
    if (error) {
      return console.log(error)
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return console.log(error)
      }

      console.log(data.location)
      console.log(forecastData)
    })
  })
}
