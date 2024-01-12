import { useState, useEffect } from 'react';

const useRestaurantList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurants1, setRestaurants1] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const latitudes = [12.9351929,12.9698196,12.956924 /* Add more latitude values here */];
      const longitudes = [77.62448069999999,77.7499721,77.701127, /* Add more longitude values here */];
      const pageType = 'DESKTOP_WEB_LISTING';
      const endpoint = 'https://www.swiggy.com/dapi/restaurants/list/v5';
      const fetchPromises = [];

      latitudes.forEach((lat, index) => {
        const lng = longitudes[index];
        const url = `${endpoint}?lat=${lat}&lng=${lng}&page_type=${pageType}`;

        fetchPromises.push(
          fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .catch(error => {
              console.error(`Error fetching data for lat: ${lat}, lng: ${lng}`, error);
              return { restaurants: [] };
            })
        );
      });

      try {
        const settledResponses = await Promise.allSettled(fetchPromises);
        console.log('Settled Responses:', settledResponses); // Log settled responses
      
        const validResponses = settledResponses
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);
      
        console.log('Valid Responses:', validResponses); // Log valid responses

        let aggregatedRestaurants = [] ;

        validResponses.forEach((response) => {
            const restaurants = extractRestaurants(response);
            aggregatedRestaurants = aggregatedRestaurants.concat(restaurants);
        });

        console.log('aggregatedRestaurants:', aggregatedRestaurants); 
    
      
        setRestaurants1(aggregatedRestaurants);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error('Error fetching restaurants:', error); // Log fetch error
      }
    };

    fetchRestaurants();
  }, []); // Empty dependency array to run the effect only once on mount

  return { loading, error, restaurants1 };
};

const extractRestaurants = (jsonData) => {
  const restaurant_list = "restaurant_grid_listing";
    const restaurants = jsonData?.data?.cards.find(
      (card) => card.card.card.id === restaurant_list
    );
    const list = restaurants?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    console.log("extractRestaurants =", list);
    return list;

}

export default useRestaurantList;
