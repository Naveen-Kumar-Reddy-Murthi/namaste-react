import { CDN_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import React from "react";

const CartList = ({ items }) => {

  const platFormFee = 10;
  const deliveryCharges = 73;

  const totalPrice = items.reduce(
    (total, item) => total + item.count * item.price,
    0
  );
  const gst = parseFloat(totalPrice * 0.05).toFixed(2);
  const toBePaid = parseFloat(totalPrice+deliveryCharges+platFormFee+gst).toFixed(2);

  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div className="w-2/3 p-4 ">
      {items.map((item) => (
        <div
          data-testid="foodItems"
          key={item.item.card.info.id}
          className="p-2 m-2 border-gray-400 border-b-2 text-left flex justify-between"
        >
          <div className="w-1/3">
            <div className="py-2">
              <span>{item.item.card.info.name + " "}</span>
            </div>
          </div>
          <div className="w-1/3 p-4 flex">
            <span className="py-5 cursor-pointer">
              <IoIosAddCircleOutline onClick={() => handleAddItem(item.item)} />
            </span>
            <img
              className="w-16 rounded-lg"
              src={CDN_URL + item.item.card.info.imageId}
            />
            <span className="py-5 cursor-pointer">
              <IoMdRemoveCircleOutline
                onClick={() => handleRemoveItem(item.item)}
              />
            </span>
          </div>
          <div className="w-1/3 p-4 ">
            <span>{item.count} x</span>
            <span> ₹{item.price} </span>
            <span> = {item.count * item.price}</span>
          </div>
        </div>
      ))}
      {items?.length > 0 ?
        <div className="px-96 py-24">
          <div className="text-right">
            <h1 className="font-bold text-center mb-4 border-b">Bill Details</h1>
            <div className="flex justify-between">
              <span className="w-2/3 text-center pr-4">Items Total:</span>
              <span className="w-1/3 text-center px-16">
                ₹{totalPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="w-2/3 text-center pr-4">GST Charges:</span>
              <span className="w-1/3 text-center px-16">₹{gst}</span>
            </div>
            <div className="flex justify-between">
              <span className="w-2/3 text-center pr-4">Platform Fee:</span>
              <span className="w-1/3 text-center px-16">₹{platFormFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="w-2/3 text-center pr-4">Delivery Fee:</span>
              <span className="w-1/3 text-center px-16">₹{deliveryCharges}</span>
            </div>

            <div className="flex justify-between">
              <span className="w-2/3 text-center font-bold pr-4 mb-20">TO PAY:</span>
              <span className="w-1/3 text-center px-16">₹{toBePaid}</span>
            </div>
            
          </div>
        </div>
      :<></>}
    </div>
  );
};

export default CartList;
