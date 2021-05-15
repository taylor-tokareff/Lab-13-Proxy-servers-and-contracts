export function formatLocation(data) {



  return {
    formatted_query: data[0].display_name,
    latitude: data[0].lat,
    longitude: data[0].lon
  };

}


export function formatWeather(data) {

  return data.data.map(weather => {

    return {
      forecast: weather.weather.description,
      time: weather.datetime
    };
  });
}

export function formatYelp(data) {

  return data.businesses.map(yelp => {

    return {
      name: yelp.name,
      image_url: yelp.image_url,
      price: yelp.price,
      rating: yelp.rating,
      url: yelp.url
    };
  });
}

