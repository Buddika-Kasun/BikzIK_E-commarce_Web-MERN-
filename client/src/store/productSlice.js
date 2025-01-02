import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategory: [],
    allSubCategory: [],
    allProducts: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setAllCategory: (state, action) => {
            return {...state, allCategory: [...action.payload]};
        },
    } 
});

export const { setAllCategory } = productSlice.actions;

export default productSlice.reducer;