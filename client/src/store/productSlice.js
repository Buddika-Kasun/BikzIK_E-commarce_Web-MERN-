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
        setAllSubCategory: (state, action) => {
            return {...state, allSubCategory: [...action.payload]};
        },
    } 
});

export const { setAllCategory,setAllSubCategory } = productSlice.actions;

export default productSlice.reducer;