const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
// nodemon src/app.js -e js,hbs  (use this in terminal to flag partials for restart with nodemon)

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rick Hennessey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rick Hennessey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Some help?',
        name: 'Rick Hennessey',
        helpMessage: 'Get in contact with me to get some help.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'oops not found',
        name: 'Rick Hennessey',
        error: 'page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'looks like you found a leak',
        name: 'Rick Hennessey',
        error: 'page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


