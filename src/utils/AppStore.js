import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import restaurantsReducer from "./restaurantsSlice"

const appStore = configureStore({
    reducer : {
        cart: cartReducer,
        search: restaurantsReducer,
    }
});
export default appStore;
