import { useEffect, useState } from "react"
import { RESTUARANT_INFO_API, CDN_URL } from "../utils/Constant";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestuarantMenu = () => {

    const {restuarantId} = useParams()
    const [restuarantInfo, setRestuarantInfo]= useState(null);

    useEffect(() => {
     fetchRestaurantInfo();
    },[]);

    const fetchRestaurantInfo = async() => {
        const data = await fetch(RESTUARANT_INFO_API+restuarantId);
        const json = await data.json();
        console.log('restuarantInfo =', json)
        setRestuarantInfo(json)
    }

    if (restuarantInfo === null) return <div className="shimmer-card"/> ;

    const {name, cloudinaryImageId, costForTwoMessage, avgRatingString, cuisines } = restuarantInfo.data?.cards[0].card.card.info;
    let {itemCards} = restuarantInfo.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
    console.log('itemCards = ', itemCards)
    if(!itemCards){
        const {itemCards:itemCards2} = restuarantInfo.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
        console.log("itemcards2 =", itemCards2)
        itemCards = itemCards2
    }

    return (<div>
        <img
          className="res-info-logo"
          alt="res-logo"    
          src={CDN_URL+cloudinaryImageId}
        />
       <h3>{name}</h3>
       <p> {cuisines.join(", ")}</p>
       <h5>★ {avgRatingString} | {costForTwoMessage}</h5>
       <h2>Menu</h2>
       <ul>
        {itemCards?.map(item => <li key={item.card.info.id}> {item.card.info.name}- {"₹ " + (item.card.info.price !== null && item.card.info.price !== undefined ? item.card.info.price / 100 : (item.card.info.defaultPrice !== null && item.card.info.defaultPrice !== undefined ? item.card.info.defaultPrice / 100 : 'N/A'))}</li>) }
       </ul>
    
    </div>);
    


}
export default RestuarantMenu