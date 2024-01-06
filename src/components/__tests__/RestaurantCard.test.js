import { MOCK_DATA } from "../mocks/restuarantCardMock.js";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RestaurantCard from "../RestaurantCard";
import React from "react";

it("should render RestuarantCard component with props data", () => {

  render(<RestaurantCard restuarant={MOCK_DATA} />);
  const restuarantName = screen.getByText("The Hole in the Wall Cafe");
  expect(restuarantName).toBeInTheDocument();
  const cusinnes = screen.getByText("American");
  expect(cusinnes).toBeInTheDocument();
  const raging = screen.getByText(/4.4/);
  expect(raging).toBeInTheDocument();
  const costForTwo = screen.getByText(/257/);
  expect(costForTwo).toBeInTheDocument();
});
