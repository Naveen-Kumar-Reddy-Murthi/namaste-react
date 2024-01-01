import { LOGO_URL } from "../utils/Constant";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
const Header = () => {
  const onlineStatus = useOnlineStatus();
  const [buttonName, setButtonName] = useState("Login");

  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  useEffect(() => {}, [buttonName]);
  return (
    <div className="flex justify-between bg-blue-200 shadow-xl px-2 py-2 rounded-2xl">
      <div className="logo-container">
        <img className="w-40 rounded-2xl" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">{onlineStatus ? "🟢" : "🔴"}</li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">
          <Link to="/cart">Cart ({cartItems.length})</Link>
          </li>

          <button
            className="px-4"
            onClick={() => {
              setButtonName(buttonName === "Logout" ? "Login" : "Logout");
            }}
          >
            {buttonName}
          </button>
          <li className="px-4">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
