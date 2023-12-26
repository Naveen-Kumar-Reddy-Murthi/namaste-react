import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
const Body = () => {
  
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(()=> {
    fetchData();
  }, []);

  const fetchData = async () =>{
    // inorder to avoid cors chrome plugin, use https://corsProxy.io to bypass the cors errors. Below code should work
    // const data = await fetch(" https://corsProxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING")
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING")
    // const json = await data.json();
    // console.log("body rendered..");
    //since swiggy api response data changes in the morning and evening, below code to handle in all times
    const jsonData = await data.json();
const restaurant_list = "restaurant_grid_listing";
const restaurants = jsonData?.data?.cards.find(
  (card) => card.card.card.id === restaurant_list 
);
    setRestaurants(
      restaurants?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setFilterRestaurants(
        restaurants?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }

    return restaurants.length === 0 ? <Shimmer/> :(
      <div className="body">
        <div className="filter">
          <div className="search">
            <input type="text" className="search-box" value = {searchText}  onChange={(e) => {
              setSearchText(e.target.value);
            }} />
            <button onClick={() =>{
              const filteredRestaurants = filterRestaurants.filter((restaurant) => restaurant.info.name.toLowerCase().includes(searchText.toLowerCase()));
              setRestaurants(filteredRestaurants);
            }}>Search</button>
          </div>
        <button className="filter-btn"
        onClick={()=> {
           const topRatedRestaurants = filterRestaurants.filter((restaurant) => restaurant.info.avgRating > 4);
            setRestaurants(topRatedRestaurants);
        }}
        >Top Rated</button>

        </div>
        <div className="res-container">   
        {
          restaurants.map((restuarant) =>
              <RestaurantCard key={restuarant.info.id} restuarant={restuarant}/>
            )
        }
        </div>
      </div>
    );
  };

export default Body