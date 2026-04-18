import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    role: null,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setuser: (state, action) => {
            //console.log("data", action.payload)
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.error = null;
        },
        logoutUser: (state) => {
            state.user = null;
            state.role = null;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});
export const { setuser, logoutUser, setLoading } = authSlice.actions;
export default authSlice.reducer;