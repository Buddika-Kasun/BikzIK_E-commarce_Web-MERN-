import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setToCart: (state, action) => {
            state.cart = [...action.payload];
        },
    }
});

export const { setToCart } = cartSlice.actions;

export default cartSlice.reducer;