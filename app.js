const request = require('postman-request')
const dotenv = require('dotenv').config()

const wsAccessKey = process.env.WEATHERSTACK_ACCESS_KEY
const latLong = '-5.8834,-35.2258'
const tempUnit = 'm'
const url = `http://api.weatherstack.com/current?access_key=${wsAccessKey}&query=${latLong}&units=${tempUnit}`
request({ url: url, json: true }, (error, response) => {
  //   const current = response.body.current
  const temperature = response.body.current.temperature
  const feelsLike = response.body.current.feelslike
  const weatherDesc = response.body.current.weather_descriptions[0]
  console.log(
    `The weather is ${weatherDesc}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`
  )
})
