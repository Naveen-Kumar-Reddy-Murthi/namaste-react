import RestaurantCard from "./RestaurantCard";
import RestaurantList from "../utils/mockData";
const Body = () => {
    return (
      <div className="body">
        <div className="search">Search</div>
        <div className="res-container">   
        {
          RestaurantList.map((restuarant) =>
              <RestaurantCard key={restuarant.info.id} restuarant={restuarant}/>
            )
        }
        </div>
      </div>
    );
  };

export default Body