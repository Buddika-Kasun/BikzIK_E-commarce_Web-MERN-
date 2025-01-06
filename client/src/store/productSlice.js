import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategory: [],
    loadingCategory: false,
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
        setLoadingCategory: (state, action) => {
            return {...state, loadingCategory: action.payload};
        },
        setAllSubCategory: (state, action) => {
            return {...state, allSubCategory: [...action.payload]};
        },
    } 
});

export const { setAllCategory, setAllSubCategory, setLoadingCategory } = productSlice.actions;

export default productSlice.reducer;