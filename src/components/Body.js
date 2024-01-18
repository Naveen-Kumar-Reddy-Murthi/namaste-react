import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import React, { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import useRestaurantList from "../utils/useRestuarantList";
import { useDispatch, useSelector } from "react-redux";
import { cityInfo } from "../utils/CityData";
const Body = () => {
  const selectedCity = useSelector((store) => store.restaurant.selectedCity);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  

  useEffect(() => {
    // console.log('calling useEffect for city ', selectedCity);
    fetchRestaurantsByCity(selectedCity);
  }, [selectedCity]);

  const fetchRestaurantsByCity = async (cityName) => {
    setLoading(true);
    const pageType = "DESKTOP_WEB_LISTING";
    const endpoint = "https://www.swiggy.com/dapi/restaurants/list/v5";
    const fetchPromises = [];
    const cityAreas = cityInfo[cityName];
    if (cityAreas) {
      cityAreas.forEach(async (area) => {
        // console.log(
        //   `Making API call for ${cityName}, ${area.area}: (${area.latitude}, ${area.longitude})`
        // );
        const url = `${endpoint}?lat=${area.latitude}&lng=${area.longitude}&page_type=${pageType}`;
        fetchPromises.push(
          fetch(url)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .catch((error) => {
              console.error(
                `Error fetching data for lat: ${latitude}, lng: ${longitude}`,
                error
              );
              return { restaurants: [] };
            })
        );
        try {
          const settledResponses = await Promise.allSettled(fetchPromises);
          const validResponses = settledResponses
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value);
          let aggregatedRestaurants = [];
    
          validResponses.forEach((response) => {
            const restaurants = extractRestaurants(response);
            aggregatedRestaurants = aggregatedRestaurants.concat(restaurants);
          });
          const uniqueArrayOfObjects = Object.values(
            aggregatedRestaurants.reduce((acc, obj) => {
              acc[obj.info.name] = obj;
              return acc;
            }, {})
          ); 
          setRestaurants(uniqueArrayOfObjects);
          setFilterRestaurants(uniqueArrayOfObjects);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }
      );
    } else {
      console.log(`City not found: ${cityName}`);
    }
    // console.log('restaurants =', restaurants)
  };

  const extractRestaurants = (jsonData) => {
    const restaurant_list = "restaurant_grid_listing";
    const restaurants = jsonData?.data?.cards.find(
      (card) => card.card.card.id === restaurant_list
    );
    const list =
      restaurants?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    return list;
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection..
      </h1>
    );

  return (restaurants.length === 0 || loading) ? (
    <Shimmer />
  ) : (
    <div className="body">
      {/* <div className="flex">
        <div className="search m-4 p-4">
          <input
            data-testid="searchInput"
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
            className="px-4 py-2 bg-green-200 rounded-lg"
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
