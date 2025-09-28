import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        isAuthenticate: false,
        currentUser: null,
        decodedToken: null,
    },
    reducers: {
        setAuthentication: (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticate = action.payload.isAuthenticate;
            state.decodedToken = action.payload.decodedToken;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload.currentUser;
        },
        logout: (state, action) => {
            state.isAuthenticate = false;
            state.token = null;
            state.currentUser = null;
            state.decodedToken = null;
            action.payload.cb();
        },
    },
});

export const { setCurrentUser, setAuthentication, logout } = authSlice.actions;
export default authSlice.reducer;
