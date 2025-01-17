import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    adminOrders: [],
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            return {...state, orders: [...action.payload]};
        },
        setAdminOrders: (state, action) => {
            return {...state, adminOrders: [...action.payload]};
        },
    }
});

export const { setOrders, setAdminOrders } = orderSlice.actions;

export default orderSlice.reducer;