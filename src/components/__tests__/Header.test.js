import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../utils/AppStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
it("should render Header component with a login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const loginButton = screen.getByRole("button", { name: "Login" });
  expect(loginButton).toBeInTheDocument();
});

it("should render Header component with cart items with zero count", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const cartItems = screen.getByText("Cart (0)");
  expect(cartItems).toBeInTheDocument();
});

it("should render Header component with a cart item", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const cartItems = screen.getByText(/Cart/);
  expect(cartItems).toBeInTheDocument();
});

it("should change the login button to logout uplon clicking login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const loginButton = screen.getByRole("button", { name: "Login" });
  expect(loginButton).toBeInTheDocument();
  fireEvent.click(loginButton);
  const logoutButton = screen.getByRole("button", { name: "Logout" });
  expect(logoutButton).toBeInTheDocument();
});

it("should change the logout button to login uplon clicking login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  let loginButton = screen.getByRole("button", { name: "Login" });
  expect(loginButton).toBeInTheDocument();
  fireEvent.click(loginButton);
  const logoutButton = screen.getByRole("button", { name: "Logout" });
  expect(logoutButton).toBeInTheDocument();
  fireEvent.click(logoutButton);
  loginButton = screen.getByRole("button", { name: "Login" });
  expect(loginButton).toBeInTheDocument();
});

it("should render Header component with online status", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const online = screen.getByText("🟢");
  expect(online).toBeInTheDocument();
});


// describe("should render Header component with offline status when there is not network", () => {

//     jest.mock("../../utils/useOnlineStatus", () => ({
//         "../../utils/useOnlineStatus": jest.fn(), // Mocking the entire hook function
//       }));
//   it("test online", () => {
//     // Mock the return value of useOnlineStatus as true
//     const mockUseOnlineStatus = jest.fn(() => false);
//     useOnlineStatus.mockImplementation(
//       mockUseOnlineStatus
//     );

//     render(
//       <BrowserRouter>
//         <Provider store={appStore}>
//           <Header />
//         </Provider>
//       </BrowserRouter>
//     );
//     const online = screen.getByText("🔴");
//     expect(online).toBeInTheDocument();
//   });
// });
