import React,{ useContext } from "react";
import { CDN_URL } from "../utils/Constant";
import UserContext from "../utils/UserContext";
const RestaurantCard = (props) => {
  const { restuarant } = props;
  const {loggedInUser} = useContext(UserContext);
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    restuarant.info;
  return (
    <div data-testid="resCard" className="m-4 p-4 w-[300px] bg-gray-100 rounded-lg hover:bg-gray-300">
      <img
        className="rounded-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="no-link font-bold py-2 text-md font-serif">
        {name.replace(/[0-9]/g, "")}
      </h3>
      <h4 className="no-link text-xs py-1 font-serif">
        {cuisines.length > 3
          ? cuisines.slice(0, 3).join(", ")
          : cuisines.join(", ")}
      </h4>
      <h4 className="no-link py-1 text-xs font-serif">⭐ {avgRating}</h4>
      <h4 className="no-link py-1 text-xs font-serif">{costForTwo}</h4>
      <h4 className="no-link py-1 text-xs font-serif">
        ⏲ {sla.deliveryTime} mins
      </h4>
      <h4 className="no-link py-2 text-xs font-serif">{loggedInUser}</h4>
    </div>
  );
};
export default RestaurantCard;
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return(
      <div>
        <label className="absolute bg-black text-white m-2 p-2">Promoted</label>
        <RestaurantCard {...props}/>
      </div>
    );
  }
}
