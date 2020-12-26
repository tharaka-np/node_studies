const request = require('request');

const foreCast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=09f2d2fceea7b1d6bf0a4142b38fc696&query=${lat},${long}`;
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect API", undefined);
        } else if(body.error) {
            callback(body.error.info, undefined);
        } else {
            const data = body;
            callback(undefined, data);
            //console.log("It is currently "+data.current.temperature+" degrees out. There is a "+data.current.feelslike+" temperature.");
        }
    });
}

module.exports = foreCast;