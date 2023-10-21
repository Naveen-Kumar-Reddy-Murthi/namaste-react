import React from 'react'
import ReactDOM from 'react-dom/client'
const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "parent" }, [
    React.createElement("h1", {}, "h1 tag"),
    React.createElement("h2", {}, "h1 tag"),
  ]),
  React.createElement("div", { id: "parent" }, [
    React.createElement("h1", {}, "h1 tag"),
    React.createElement("h2", {}, "h1 tag"),
  ]),
]);

console.log(parent);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
