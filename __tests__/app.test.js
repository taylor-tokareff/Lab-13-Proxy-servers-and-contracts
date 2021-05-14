import app from '../lib/app.js';
import supertest from 'supertest';
import { formatLocation } from '../lib/munge-utils.js';


const request = supertest(app);

describe('API Routes', () => {



  // If a GET request is made to /api/cats/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  test('testing a function', async () => {
    const beforemungelocation = [{
      'place_id': '236915565',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'relation',
      'osm_id': '8765812',
      'boundingbox': [
        '40.292635',
        '40.314148',
        '-78.902275',
        '-78.860483'
      ],
      'lat': '40.303234',
      'lon': '-78.8873661206627',
      'display_name': 'Oakland, Milo Lane, Richland Township, Cambria County, Pennsylvania, 15902, USA',
      'class': 'boundary',
      'type': 'census',
      'importance': 0.389701883147039
    },
    {
      'place_id': '209778864',
      'licence': 'https://locationiq.com/attribution',
      'osm_type': 'way',
      'osm_id': '591010998',
      'boundingbox': [
        '14.7253785',
        '14.7256598',
        '121.0103075',
        '121.0106066'
      ],
      'lat': '14.7253873',
      'lon': '121.0103381',
      'display_name': 'Oakland, Whispering Palms Subdivision, Llano, Zone 15, Caybiga, District 1, Caloocan, Metro Manila, 1420, Philippines',
      'class': 'highway',
      'type': 'residential',
      'importance': 0.2
    }];

    const expectation =
    {
      'formatted_query': 'Oakland, Milo Lane, Richland Township, Cambria County, Pennsylvania, 15902, USA',
      'latitude': '40.303234',
      'longitude': '-78.8873661206627'
    };

    const result = formatLocation(beforemungelocation);
    expect(result).toEqual(expectation);
  });
});