import { LOGO_URL } from "../utils/Constant";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../utils/restaurantsSlice";
import React from 'react';
const Header = () => {
  const [buttonName, setButtonName] = useState("Login");
  const [searchInput, setSearchInput] = useState("");
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(setSearchText(searchInput));
    setSearchInput("");
  };
  useEffect(() => {}, [buttonName]);
  return (
    <div className="flex justify-between bg-white-200 shadow-xl px-1 py-1 rounded-xl">
      <div className="logo-container">
        <img className="w-20 rounded-2xl" src={LOGO_URL} />
      </div>
      <div className="flex">
        <div className="search m-4 p-4">
          <input data-testid="searchInput"
            type="text"
            className="border border-solid border-black rounded-lg p-2"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-200 m-4 rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-green-200 rounded-lg"
            onClick={() => {
              const topRatedRestaurants = filterRestaurants.filter(
                (restaurant) => restaurant.info.avgRating > 4
              );
              setRestaurants(topRatedRestaurants);
            }}
          >
            Top Rated
          </button>
        </div>

      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4 w-32 font-bold hover:text-orange-500">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 w-32 font-bold hover:text-orange-500">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4 w-32 font-bold hover:text-orange-500">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4 w-32 font-bold hover:text-orange-500">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 w-52 font-bold hover:text-orange-500">
          <Link to="/cart">Cart [{cartItems.length}]</Link>
          </li>

          <button
            className="px-4 font-bold hover:text-orange-500"
            onClick={() => {
              setButtonName(buttonName === "Logout" ? "Login" : "Logout");
            }}
          >
            {buttonName}
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Header;
