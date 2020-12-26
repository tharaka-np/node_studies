const path = require('path');
const express = require('express');
const hbs = require('hbs');
const foreCast = require('./utils/ForeCast');
const geoCode = require('./utils/GeoCode');

console.log(__dirname);
const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        pageName: 'Index Page',
        createdBy: 'Tharaka'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        pageName: 'About Page',
        createdBy: 'Tharaka'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    let address = req.query.address;

    geoCode(address, (error, data) => {
        console.log(data);

        if(data) {
            foreCast(data.longitude, data.latitude, (error, response) => {
               if(error) {
                   return res.send({
                       error: error
                   })
               }

               res.send({
                   data: response
               })
            });
        } else {
            res.send({
                error: 'Invalid address'
            })
        }
    })
});

app.get('/about/*', (req, res) => {
    res.render('404', {
        errorText: 'The about article you are looking for not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        errorText: 'The page you are looking for not found'
    })
});

app.listen(3001, () => {
    console.log('Server is started to run')
})
