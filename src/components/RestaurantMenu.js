import React,{ useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RetaurantCategory from "./RetaurantCategory";

const RestuarantMenu = () => {
  const { restuarantId } = useParams();
  const restuarantInfo = useRestaurantMenu(restuarantId);
  const [showIndex, setShowIndex] = useState(null);
  if (restuarantInfo === null) return <div className="shimmer-card" />;

  const {
    name,
    cloudinaryImageId,
    costForTwoMessage,
    avgRatingString,
    cuisines,
  } = restuarantInfo.data?.cards[0].card.card.info;
  let { itemCards } =
    restuarantInfo.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
      ?.card?.card;

  if (!itemCards) {
    const { itemCards: itemCards2 } =
      restuarantInfo.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR
        ?.cards[2]?.card?.card;
    itemCards = itemCards2;
  }
  const mainCards = restuarantInfo.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  const categories = mainCards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const restaurantAddress =   mainCards.filter(
    (c) =>
      c.card?.["card"]?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
  );
  console.log('complete address = ',restaurantAddress[0]?.card?.card?.completeAddress)

  return (
    <div className="text-center">
      <h1 className="font-bold my-4 text-2xl">{name}</h1>
      <p className="text-sm my-3">{restaurantAddress[0]?.card?.card?.completeAddress}</p>
      <p className="text-sm my-6"> {cuisines.join(", ")}</p>
      <h5 className="text-sm my-6">
        ★ {avgRatingString} | {costForTwoMessage}
      </h5>
      {categories.map((category, index) => (
        <RetaurantCategory
          key={category?.card?.card?.title}
          data={category.card.card}
          showIndex={showIndex}
          showItem={index === showIndex && true}
          setShowIndex = {() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};
export default RestuarantMenu;
