import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import restaurantsReducer from "./restaurantsSlice"
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const appStore = configureStore({
    reducer : {
        cart: cartReducer,
        restaurant: restaurantsReducer,
    },
    middleware :(getDefaultMiddleware) => getDefaultMiddleware(),
});
export default appStore;
