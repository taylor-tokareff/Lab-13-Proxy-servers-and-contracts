/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import request from 'superagent';
import { formatLocation, formatWeather, formatYelp } from './munge-utils.js';


// make an express app
const app = express();

// allow our server to be called from any website
app.use(cors());
// read JSON from body of request when indicated by Content-Type
app.use(express.json());
// enhanced logging
app.use(morgan('dev'));

app.get('/location', async (req, res) => {
  try {


    // use superagent
    // call the real api
    // https://us1.locationiq.com/v1/search.php?key={api-key}&q={city-name}&format=json
    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_API_KEY}&q=${req.query.search}&format=json`);
    // .query({ key: process.env.LOCATION_API_KEY })
    // .query({ q: req.query.search })
    // .query({ format: 'json' });

    // munge the data
    const locations = formatLocation(response.body);
    console.log(response.body);

    // send it back
    res.json(locations);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/weather', async (req, res) => {
  try {

    // make you very happy god of Heroku
    // use superagent
    // call the real api
    // https://api.weatherbit.io/v2.0/forecast/daily?&lat=38.123&lon=-78.543&key={api-key}
    const response = await request.get('https://api.weatherbit.io/v2.0/forecast/daily')
      .query({ key: process.env.WEATHER_API_KEY })
      .query({ lat: req.query.latitude })
      .query({ lon: req.query.longitude });


    // munge the data
    const weather = formatWeather(response.body);

    // send it back
    res.json(weather);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/reviews', async (req, res) => {
  try {


    // use superagent
    // call the real api
    // https://api.yelp.com/v3/businesses/search?latitude={lat}&longitude={lng}
    const response = await request.get('https://api.yelp.com/v3/businesses/search')
      .query({ latitude: req.query.latitude })
      .query({ longitude: req.query.longitude })
      .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);




    // munge the data
    const reviews = formatYelp(response.body);

    // send it back
    res.json(reviews);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


export default app;

