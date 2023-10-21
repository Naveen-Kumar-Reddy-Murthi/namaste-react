import React from "react";
import ReactDOM from "react-dom/client";
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Namaste React 🔥"
);

console.log(heading);

const jsxHeading = <h1>Namaste React from JSX 🔥🚀</h1>;

const Title = () => (
  <h1 className="head" tabIndex="5">
    Namaste React using component🔥
  </h1>
);

// React functional component
const HeadingComponent1 = () => (
    <div id="container">
      <Title />
      <h1>Namaste React Functional Component1</h1>
    </div>
  );

const HeadingComponent2 = () => <h1>Namaste React Functional Component2</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent1 />);
