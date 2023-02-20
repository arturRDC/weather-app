const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()

// Define paths for express setup
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join('__dirname', '../templates/views')
const partialsPath = path.join('__dirname', '../templates/partials')

// Config handlebars engine and paths
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirPath))

const name = 'ArturRDC'

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name,
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name,
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name,
    helpMessage: 'this is a help message',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address term',
    })
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        })
      })
    }
  )
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    name,
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    name,
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is up on port 3000')
})
