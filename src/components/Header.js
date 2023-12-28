import { LOGO_URL } from "../utils/Constant";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {

   const [buttonName, setButtonName] = useState("Login") 
   useEffect(()=>{
    console.log("Header useEffect called.")
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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
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