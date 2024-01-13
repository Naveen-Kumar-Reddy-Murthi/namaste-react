import { LOGO_URL } from "../utils/Constant";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setSelectedCity } from "../utils/restaurantsSlice";
import React from "react";
import CitySelector from "./CitySelector";
import { cityInfo } from "../utils/CityData";
const Header = () => {
  const [buttonName, setButtonName] = useState("Login");
  const [searchInput, setSearchInput] = useState("");
  const cartItems = useSelector((store) => store.cart.items);
  const cities = Object.entries(cityInfo).map(([city, areas]) => ({
    label: city,
    value: city,
  }));
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(setSearchText(searchInput));
    setSearchInput("");
  };
  useEffect(() => {}, [buttonName]);
  return (
    <div className="flex justify-between bg-white-200 shadow-xl px-1 py-1 rounded-xl">
      <div>
        <img className="w-36 rounded-2xl" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4 w-52 align-middle">
            <CitySelector cities={cities} />
          </li>
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
          <li className="px-4 w-42 font-bold hover:text-orange-500">
            <Link to="/cart">Cart [{cartItems.length}]</Link>
          </li>
          <li className="px-4 w-32 font-bold hover:text-orange-500">
            <button
              className="px-4 font-bold hover:text-orange-500"
              onClick={() => {
                setButtonName(buttonName === "Logout" ? "Login" : "Logout");
              }}
            >
              {buttonName}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
