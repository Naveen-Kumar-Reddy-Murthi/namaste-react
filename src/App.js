import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
/**
 * Header
 *  - Logo
 *  - Nav Items
 * Body
 *  - Search
 *  - RestaurantContainer
 *     - RestaurantCard
 *        - image
 *        - name of rest, star rating, cuisines, delivery time
 * Footer
 *  - copyright
 *  - Links
 *  - Address
 *  - Contact
 *
 */

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path : "/",
    element: <AppLayout/>,
    errorElement: <Error/>,
  },
  {
    path : "/about",
    element: <About/>
  },
  {
    path : "/contact",
    element: <Contact/>
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<AppLayout />);
root.render(<RouterProvider router={appRouter}/>);
