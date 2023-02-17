const request = require('postman-request')
const dotenv = require('dotenv').config()

const psAccessKey = process.env.POSITIONSTACK_ACCESS_KEY
const address = '1600 Pennsylvania Ave NW, Washington DC'
const limit = 1
const urlGeo = `http://api.positionstack.com/v1/forward?access_key=${psAccessKey}&query=${address}&limit=${limit}`
request({ url: urlGeo, json: true }, (error, response) => {
  console.log(response.body.data[0].latitude)
  console.log(response.body.data[0].longitude)
})

// const wsAccessKey = process.env.WEATHERSTACK_ACCESS_KEY
// const latLong = '-5.8834,-35.2258'
// const tempUnit = 'm'
// const urlWeather = `http://api.weatherstack.com/current?access_key=${wsAccessKey}&query=${latLong}&units=${tempUnit}`
// request({ url: urlWeather, json: true }, (error, response) => {
//   const current = response.body.current
//   const temperature = current.temperature
//   const feelsLike = current.feelslike
//   const weatherDesc = current.weather_descriptions[0]
//   console.log(
//     `The weather is ${weatherDesc}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`
//   )
// })
