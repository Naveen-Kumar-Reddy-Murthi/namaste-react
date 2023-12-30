import { useEffect, useState } from "react"
import { RESTUARANT_INFO_API } from "../utils/Constant";
const useRestaurantMenu = (restuarantId) => {
    const [restuarantInfo, setRestuarantInfo]= useState(null);
    useEffect(() => {
     fetchRestaurantInfo();
    },[]);

    const fetchRestaurantInfo = async () => {
        const data = await fetch(RESTUARANT_INFO_API+restuarantId)
        const json = await data.json();
        setRestuarantInfo(json);
    }
    return restuarantInfo;
}

export default useRestaurantMenu;