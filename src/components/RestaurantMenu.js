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

  const categories =
    restuarantInfo.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold my-1 text-lg"> {cuisines.join(", ")}</p>
      <h5 className="font-bold my-1 text-lg">
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
