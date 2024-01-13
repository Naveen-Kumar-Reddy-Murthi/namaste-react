import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
  name: "restaurant",
  initialState: {
    searchString: "",
    selectedCity: "Bengaluru",
  },
  reducers: {
    setSearchText: (state, action) => {
      console.log("action payload =", action.payload);
      state.searchString = action.payload;
    },

    cleartSearchText: (state, action) => {
      state.searchString = "";
    },

    setSelectedCity: (state, action) => {
      console.log("city  payload =", action.payload);
      state.selectedCity = action.payload;
    },
  },
});

export const { setSearchText, cleartSearchText, setSelectedCity } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
