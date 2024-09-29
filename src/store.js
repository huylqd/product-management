import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productSlice";
import userReducer from "./features/products/userSlice";

const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer,
    },
});

export default store