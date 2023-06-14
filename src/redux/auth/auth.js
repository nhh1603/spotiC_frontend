import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.error = false;
        },
        loginFailure: (state, action) => {
            state.user = null;
            state.error = true;
        },
        logout: (state) => {
            state.user = null;
            state.error = false;
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;