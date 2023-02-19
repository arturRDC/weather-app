const path = require('path')

const express = require('express')
const hbs = require('hbs')

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

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Artur Ribeiro da Cunha',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Artur Ribeiro da Cunha',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Artur Ribeiro da Cunha',
    helpMessage: 'this is a help message',
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'Its 50°',
    location: 'Philadelphia',
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    name: 'Artur Ribeiro da Cunha',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    name: 'Artur Ribeiro da Cunha',
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
