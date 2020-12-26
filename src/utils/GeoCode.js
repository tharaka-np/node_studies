const request = require('request');

const geoCode = (address, callback) => {
    console.log("address is "+ address);
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGhhcmFrYTIwMjAiLCJhIjoiY2tobnBkZGh2MHQ4bTJ2bXhib2MxYTd3MSJ9.iNhOIehicUB6jDOHIl1Azw&limit=1`;
    request({url: geoUrl, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect mapbox API", undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Check again your address.', undefined);
        } else {
            let data = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            }
            callback(undefined, data);
        }
    });
}

module.exports = geoCode;