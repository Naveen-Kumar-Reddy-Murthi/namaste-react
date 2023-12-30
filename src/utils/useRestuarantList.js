import { useEffect, useState } from "react";
import { RESTUARANT_LIST_API } from "../utils/Constant";
const useRestuarantList = () => {
  const [restuarantList, setRestuarantList] = useState(null);
  useEffect(() => {
    fetchRestuarantList();
  }, []);
  const fetchRestuarantList = async () => {
    // inorder to avoid cors chrome plugin, use https://corsProxy.io to bypass the cors errors. Below code should work
    // const data = await fetch(" https://corsProxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING")
    // const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING")
    // const json = await data.json();
    // console.log("body rendered..");
    //since swiggy api response data changes in the morning and evening, below code to handle in all times
    const data = await fetch(RESTUARANT_LIST_API);
    const jsonData = await data.json();
    const restaurant_list = "restaurant_grid_listing";
    const restaurants = jsonData?.data?.cards.find(
      (card) => card.card.card.id === restaurant_list
    );
    setRestuarantList(restaurants);
    console.log("useRestuarantList =", restaurants);
  };
  return restuarantList;
};

export default useRestuarantList;
