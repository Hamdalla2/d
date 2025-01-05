import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
    name: 'user',
    initialState: { user: null },
    reducers: {
        setCurrentUser: (state, action) => { state.user = action.payload; },
        // setAuthenticated: (state, action) => { state.user = action.payload; },
    },
});

export const { setCurrentUser } = userReducer.actions;

export default userReducer.reducer;
