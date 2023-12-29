import { CDN_URL } from "../utils/Constant";
const RestaurantCard = (props) => {
    const { restuarant } = props;
    const {name, cuisines, avgRating,costForTwo, sla, cloudinaryImageId} = restuarant.info;
    return (
      <div className="res-card">
        <img
          className="res-logo"
          alt="res-logo"
          src={CDN_URL+cloudinaryImageId}
        />
        <h3 className="no-link">{name.replace(/[0-9]/g, '')}</h3>
        <h4 className="no-link">{cuisines.length > 3 ? cuisines.slice(0, 3).join(", ") : cuisines.join(", ")}</h4>
        <h4 className="no-link">⭐ {avgRating}</h4>
        <h4 className="no-link">{costForTwo}</h4>
        <h4 className="no-link">⏲ {sla.deliveryTime} mins</h4>
      </div>
    );
  };

  export default RestaurantCard