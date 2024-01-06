import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { RESTAURANT_MENU_MOCK_DATA } from "../mocks/restuarantMenuMock.js";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/AppStore";
import React from "react";
import Header from "../Header";
import Cart from "../Cart";
import RestuarantMenu from "../RestaurantMenu";


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(RESTAURANT_MENU_MOCK_DATA),
  })
);

it("should Load Restaurant Menu Component", async () => {
  //inside tests whenever there is any state update or fetch call, we should wrap the components
  // inside act tag to make it work. it comes from react-dom/test-utils. This is because fetch/state
  // updates manipulate the dom. hence we should use act.

  await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header/>
          <RestuarantMenu/>
          <Cart/>
        </Provider>
      </BrowserRouter>
    )
  );

  const accordianHeader = screen.getByText("Recommended(20)");
  expect(accordianHeader).toBeInTheDocument();

  const accordianHeader1 = screen.getByText("Basmati Bhai Biryani - Tamil Edition(4)");
  expect(accordianHeader1).toBeInTheDocument();

  fireEvent.click(accordianHeader1);

  expect(screen.getAllByTestId("foodItems").length).toBe(4);

  expect(screen.getByText("Cart (0)")).toBeInTheDocument();

  const addButtons = screen.getAllByRole("button", {name : "Add"});
  fireEvent.click(addButtons[0]);
  expect(screen.getByText("Cart (1)")).toBeInTheDocument();

  fireEvent.click(addButtons[1]);
  expect(screen.getByText("Cart (2)")).toBeInTheDocument();

  expect(screen.getAllByTestId("foodItems").length).toBe(6);

  fireEvent.click(screen.getByRole("button", {name : "Clear"}));
  expect(screen.getByText("Cart (0)")).toBeInTheDocument();

  expect(screen.getByText("Cart is empty. Add Items to the cart!")).toBeInTheDocument();

});
