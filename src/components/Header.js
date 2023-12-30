import { LOGO_URL } from "../utils/Constant";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Header = () => {
   const onlineStatus = useOnlineStatus();
   const [buttonName, setButtonName] = useState("Login") 
   useEffect(()=> {
   },[buttonName])
    return (
      <div className="header">
        <div className="logo-container">
          <img
            className="logo"
            src={LOGO_URL}
          />
        </div>
        <div className="nav-items">
          <ul>
          <li>{onlineStatus? "🟢" : "🔴"}</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/grocery">Grocery</Link></li>
            <li>Cart</li>
            <button className="login" onClick={() => {
              setButtonName(buttonName==="Logout"? "Login": "Logout")
            }}>{buttonName}</button>
          </ul>
        </div>
      </div>
    );
  };
export default Header;