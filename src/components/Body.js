import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import React, { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import useRestaurantList from "../utils/useRestuarantList";
import { useDispatch } from 'react-redux';
const Body = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchData = async () => {
    // inorder to avoid cors chrome plugin, use https://corsProxy.io to bypass the cors errors. Below code should work
    // const data = await fetch(" https://corsProxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING")
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );
    // const json = await data.json();
    // console.log("body rendered..");
    //since swiggy api response data changes in the morning and evening, below code to handle in all times
    const jsonData = await data.json();
    const restaurant_list = "restaurant_grid_listing";
    const restaurants = jsonData?.data?.cards.find(
      (card) => card.card.card.id === restaurant_list
    );
 console.log('body jsonData = ',jsonData)
    setRestaurants(
      restaurants?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterRestaurants(
      restaurants?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const fetchRestaurants = async () => {
    const latitudes = [12.9351929,12.9698196,12.956924,13.1989089,12.9856503,13.0454314 /* Add more latitude values here */];
    const longitudes = [77.62448069999999,77.7499721,77.701127,77.70681309999999,77.60569269999999, 77.5478699 /* Add more longitude values here */];
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
      const validResponses = settledResponses
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
      let aggregatedRestaurants = [] ;

      validResponses.forEach((response) => {
          const restaurants = extractRestaurants(response);
          aggregatedRestaurants = aggregatedRestaurants.concat(restaurants);
      });
      console.log('aggregatedRestaurants = ', aggregatedRestaurants)
      const uniqueArrayOfObjects = Object.values(aggregatedRestaurants.reduce((acc, obj) => {
        acc[obj.info.name] = obj;
        return acc;
      }, {}));
      console.log('unique objects = ', uniqueArrayOfObjects);
      setRestaurants(uniqueArrayOfObjects);
      setFilterRestaurants(uniqueArrayOfObjects);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const extractRestaurants = (jsonData) => {
    const restaurant_list = "restaurant_grid_listing";
      const restaurants = jsonData?.data?.cards.find(
        (card) => card.card.card.id === restaurant_list
      );
      const list = restaurants?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      return list;
  
  }

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection..
      </h1>
    );

  return restaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      {/* <div className="flex">
        <div className="search m-4 p-4">
          <input data-testid="searchInput"
            type="text"
            className="border border-solid border-black rounded-lg p-2"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-200 m-4 rounded-lg"
            onClick={() => {
              const filteredRestaurants = filterRestaurants.filter(
                (restaurant) =>
                  restaurant.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
              );
              setRestaurants(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>

        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={() => {
              const topRatedRestaurants = filterRestaurants.filter(
                (restaurant) => restaurant.info.avgRating > 4
              );
              setRestaurants(topRatedRestaurants);
            }}
          >
            Top Rated
          </button>
        </div>

      </div> */}
      <div className="flex flex-wrap">
        {restaurants.map((restuarant) => (
          <Link
            key={restuarant.info.id}
            to={"/restuarant/" + restuarant.info.id}
          >
            {restuarant?.info?.isPromoted ? (
              <RestaurantCardPromoted restuarant={restuarant} />
            ) : (
              <RestaurantCard restuarant={restuarant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
