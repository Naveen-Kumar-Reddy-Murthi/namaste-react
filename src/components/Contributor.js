import { useEffect, useState } from "react";

const Contributor = ({ name, location }) => {
  const [userInfo, setUserInfo] = useState({ name: name, location: location });

  useEffect(() => {
    console.log("Contributor useEffect");
    //fetchUserData();
    return () => {
      console.log("useEffect return called.");
    };
  });

  const fetchUserData = async () => {
    const data = await fetch("https://api.github.com/users/" + name);
    const json = await data.json();
    setUserInfo(json);
  };

  return (
    <div className="contributor-card">
      <img className="res-info-logo" src={userInfo.avatar_url} />
      <h3>
        {userInfo.name}, {userInfo.location}
      </h3>
      <p>{userInfo.login}</p>
    </div>
  );
};

export default Contributor;
