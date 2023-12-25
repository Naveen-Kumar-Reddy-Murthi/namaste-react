import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
const Body = () => {
  
  const [restaurants, setRestaurants] = useState([]);

  useEffect(()=> {
    fetchData();
  }, []);

  const fetchData = async () =>{
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING")
    const json = await data.json();
    console.log(json);
    setRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }

    return restaurants.length === 0 ? <Shimmer/> :(
      <div className="body">
        <div className="filter">
        <button className="filter-btn"
        onClick={()=> {
           const topRatedRestaurants = restaurants.filter((restaurant) => restaurant.info.avgRating > 4.4);
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