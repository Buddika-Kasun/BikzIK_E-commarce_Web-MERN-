import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id: "",
    name: "",
    email: "",   
};

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUser: (state, action) => {
            return {...state, ...action.payload};
        },
        clearUser: () => {
            return initialValue;
        }
    }
});

export const { setUser,clearUser } = userSlice.actions;

export default userSlice.reducer;