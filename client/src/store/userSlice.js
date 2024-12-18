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
            state = {...action.payload};
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;