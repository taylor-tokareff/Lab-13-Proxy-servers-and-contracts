import app from '../lib/app.js';
import supertest from 'supertest';
import { formatLocation, formatWeather, formatYelp } from '../lib/munge-utils.js';


supertest(app);

describe('API Routes', () => {



  // If a GET request is made to /api/cats/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  test('testing location', async () => {
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


  test('testing weather', async () => {
    const beforeMungeWeather = {
      'data': [
        {
          'moonrise_ts': 1620993099,
          'wind_cdir': 'WSW',
          'rh': 54,
          'pres': 1006.38,
          'high_temp': 21.1,
          'sunset_ts': 1621037834,
          'ozone': 372.083,
          'moon_phase': 0.0979064,
          'wind_gust_spd': 3.29883,
          'snow_depth': 0,
          'clouds': 16,
          'ts': 1620964860,
          'sunrise_ts': 1620986640,
          'app_min_temp': 3.6,
          'wind_spd': 1.21827,
          'pop': 0,
          'wind_cdir_full': 'west-southwest',
          'slp': 1024.04,
          'moon_phase_lunation': 0.11,
          'valid_date': '2021-05-14',
          'app_max_temp': 20.1,
          'vis': 24.096,
          'dewpt': 5.1,
          'snow': 0,
          'uv': 8.20151,
          'weather': {
            'icon': 'c02d',
            'code': 801,
            'description': 'Few clouds'
          },
          'wind_dir': 250,
          'max_dhi': null,
          'clouds_hi': 0,
          'precip': 0,
          'low_temp': 9.7,
          'max_temp': 21.2,
          'moonset_ts': 1621048301,
          'datetime': '2021-05-14',
          'temp': 14.8,
          'min_temp': 6.4,
          'clouds_mid': 9,
          'clouds_low': 16
        }]
    };

    const expectation =
      [{ 'forecast': 'Few clouds', 'time': '2021-05-14' }];

    const result = formatWeather(beforeMungeWeather);
    expect(result).toEqual(expectation);
  });


  test('testing yelp', async () => {
    const beforeMungeYelp = {
      'businesses': [
        {
          'id': '6I28wDuMBR5WLMqfKxaoeg',
          'alias': 'pike-place-chowder-seattle',
          'name': 'Pike Place Chowder',
          'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/ZyQjV-wJQ2GHyX7l3jfbyg/o.jpg',
          'is_closed': false,
          'url': 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=4UZVPZN3m4Vc_sqOD0X-pw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=4UZVPZN3m4Vc_sqOD0X-pw',
          'review_count': 7497,
          'categories': [
            {
              'alias': 'seafood',
              'title': 'Seafood'
            },
            {
              'alias': 'soup',
              'title': 'Soup'
            }
          ],
          'rating': 4.5,
          'coordinates': {
            'latitude': 47.60939,
            'longitude': -122.34112
          },
          'transactions': [
            'pickup',
            'delivery'
          ],
          'price': '$$',
          'location': {
            'address1': '1530 Post Aly',
            'address2': 'Ste 11',
            'address3': '',
            'city': 'Seattle',
            'zip_code': '98101',
            'country': 'US',
            'state': 'WA',
            'display_address': [
              '1530 Post Aly',
              'Ste 11',
              'Seattle, WA 98101'
            ]
          },
          'phone': '+12062672537',
          'display_phone': '(206) 267-2537',
          'distance': 765.1497312570257
        }]
    };


    const expectation =
      [{
        'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/ZyQjV-wJQ2GHyX7l3jfbyg/o.jpg',
        'name': 'Pike Place Chowder',
        'price': '$$',
        'rating': 4.5,
        'url': 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=4UZVPZN3m4Vc_sqOD0X-pw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=4UZVPZN3m4Vc_sqOD0X-pw',
      }];

    const result = formatYelp(beforeMungeYelp);
    expect(result).toEqual(expectation);
  });




});