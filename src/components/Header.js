import { LOGO_URL } from "../utils/Constant";
import { useState,useEffect } from "react";
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
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
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