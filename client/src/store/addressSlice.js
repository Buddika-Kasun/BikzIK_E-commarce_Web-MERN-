import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    addressList: [],
};

const  addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        setAddressList: (state, action) => {
            return {...state, addressList: [...action.payload]};
        },
    }
});

export const { setAddressList } = addressSlice.actions;

export default addressSlice.reducer;