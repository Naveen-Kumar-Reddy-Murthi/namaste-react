import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MOCK_RESTUARANT_LIST_DATA } from "../mocks/restuarantListMock.js";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Body from "../Body";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_RESTUARANT_LIST_DATA);
    },
  });
});


it("should Search Restaurant list for biryani input", async () => {
    await act(async() =>{
        render(
            <BrowserRouter>
            <Body/>
            </BrowserRouter>
        )
    });

    expect(screen.getAllByTestId("resCard").length).toBe(9);

    const searchButton = screen.getByRole("button", {name : "Search"});
    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, {target : { value : "india"}});
    fireEvent.click(searchButton);
    expect(screen.getAllByTestId("resCard").length).toBe(1);

    fireEvent.change(searchInput, {target : { value : "bakingo"}});
    fireEvent.click(searchButton);
    expect(screen.getAllByTestId("resCard").length).toBe(1);

})

it("should filter top rated restuarants", async() =>{
    await act(async () =>{
        render(
            <BrowserRouter>
            <Body/>
            </BrowserRouter>
        )
    });

    expect(screen.getAllByTestId("resCard").length).toBe(9);
    const topRatedButton = screen.getByRole("button", {name : "Top Rated"});
    fireEvent.click(topRatedButton);
    expect(screen.getAllByTestId("resCard").length).toBe(8);

})
