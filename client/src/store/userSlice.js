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
        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload
        }
    }
});

export const { setUser, clearUser, updateAvatar } = userSlice.actions;

export default userSlice.reducer;