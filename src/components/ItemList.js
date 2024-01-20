import { CDN_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import React, { useState, useEffect } from "react";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const handleAddItem1 = (item) => {
    //dispatch action to add it to cart
    dispatch(addItem(item));
  };

  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = (item) => {
    setIsClicked(true);
    setIsLoading(true);

    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
      // Your processing logic here
      dispatch(addItem(item));

      // Reset the button state after processing
      setIsClicked(false);
      setIsLoading(false);
    }, 400); // Simulating a delay of 1 second
  };

  useEffect(() => {
    // Reset button state after a delay
    const timeoutId = setTimeout(() => {
      setIsClicked(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [isClicked]);

  return (
    <div>
      {items.map((item) => (
        <div  data-testid="foodItems"
          key={item.card.info.id}
          className="p-2 m-2 border-gray-400 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 p-4 ">
            <div className="absolute">
              <button
                className="p-2 mx-32 my-12 rounded-lg bg-black text-white shadow-lg"
                onClick={() => handleAddItem(item)}
                disabled={isLoading}
              >
                Add
              </button>
            </div>
            <img className="w-full" src={CDN_URL + item.card.info.imageId} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
