import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import { clearCart } from "../utils/cartSlice";
import React from "react";
import { MdOutlineDelete } from "react-icons/md";


const Cart = () => {
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="text-center m-4 p-4">
      <div className="flex items-center">
      <h1 className="text-2xl font-light">cart items</h1>
      </div>
      
      <div >
        {cartItems?.length > 0 ?<button
          className="p-2 my-1 mx-2 m-2 bg-black text-white rounded-lg"
          onClick={handleClearCart}
        >
          <MdOutlineDelete />
        </button> :<></>}
        {cartItems?.length === 0 && (
          <h1 className="py-28"> Cart is empty. Add Items to the cart!</h1>
        )}
        <CartList items={cartItems}></CartList>
      </div>
    </div>
  );
};

export default Cart;
