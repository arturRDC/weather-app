const request = require('postman-request')
const geocode = (address, callback) => {
  const psAccessKey = process.env.POSITIONSTACK_ACCESS_KEY
  const encodedAddress = encodeURIComponent(address)

  const limit = 1
  const urlGeo = `http://api.positionstack.com/v1/forward?access_key=${psAccessKey}&query=${encodedAddress}&limit=${limit}`

  request({ url: urlGeo, json: true }, (error, response) => {
    if (error) {
      callback('Failed to connect to geolocation API', undefined)
    } else if (response.body.error || response.body.data.length === 0) {
      callback('Failed to find location coordinates', undefined)
    } else {
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
        location: response.body.data[0].label,
      })
    }
  })
}
module.exports = geocode
