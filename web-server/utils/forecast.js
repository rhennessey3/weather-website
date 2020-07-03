const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=11b2c94af61916939d7ce1df146e743c&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => { // 
        if (error) {
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Sorry, we are unable to find this location.', undefined)
        } else {
            callback(undefined, "Currently it is " + body.current.weather_descriptions[0] + ".  The temperature is " + body.current.temperature + " degrees and it feels like " + body.current.feelslike + " degrees.")
        }
    })
}


module.exports = forecast