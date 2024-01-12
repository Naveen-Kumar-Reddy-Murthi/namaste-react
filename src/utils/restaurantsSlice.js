import { createSlice } from "@reduxjs/toolkit";

const restaurantsSlice = createSlice({
  name: "search",
  initialState: {
    searchString: "",
  },
  reducers : {
        setSearchText : (state, action) => {
            state.searchString = action.payload;
        },

        cleartSearchText : (state, action) => {
            state.searchString = '';
        },
  },
}
);

export const { setSearchText, cleartSearchText} = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
