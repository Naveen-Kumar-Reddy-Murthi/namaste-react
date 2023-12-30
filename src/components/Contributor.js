import { useEffect } from "react"

const Contributor = ({name, location}) => {


   useEffect(() => {
    console.log('Contributor useEffect');
    return () => {
        console.log('useEffect return called.');
    }

   });

   const fetchUserData = async() => {
    const data = await fetch ("https://api.github.com/users/naveen-kumar-reddy-murthi");
    const json = await data.json();
   }

    return <div className="contributor-card">
        <h3>{name}</h3>
        <p>{location}</p>
    </div>
}

export default Contributor