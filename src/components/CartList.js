import { CDN_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import React from "react";


const CartList = ({ items }) => {
  console.log("cart items ==", items);

  return (
    <div className="w-10/12 p-4 " >
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.item.card.info.id}
          className="p-2 m-2 border-gray-400 border-b-2 text-left flex justify-between"
        >
          <div className="w-6/12">
            <div className="py-2">
              <span>{item.item.card.info.name + " "}</span>
            </div>
          </div>
          <div className="w-2/12 p-4 ">
            <div className="absolute"></div>
            <img
              className="w-16 rounded-lg"
              src={CDN_URL + item.item.card.info.imageId}
            />
           
          </div>
          <div className="w-2/12 p-4 ">
              <span>
                 {item.count} x ₹
                {item.price}
              </span>
            </div>
        </div>
      ))}
       {items.length>0 && <div className="w-2/12 p-4 ">
                <h1 className="font-bold">Bill Details</h1>
                <h1> </h1>
        </div>}
    </div>
  );
};

export default CartList;
