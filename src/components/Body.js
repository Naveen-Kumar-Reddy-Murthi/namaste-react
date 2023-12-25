import RestaurantCard from "./RestaurantCard";
import RestaurantList from "../utils/mockData";
import { useState } from "react";
const Body = () => {
  
  const [restaurants, setRestaurants] = useState(RestaurantList)

    return (
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