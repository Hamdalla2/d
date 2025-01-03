import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
    name: 'user',
    initialState: { token: "" },
    reducers: {
        signIn: (state, action) => { state.token = action.payload; },
    },
});

export const { signIn } = userReducer.actions;

export default userReducer.reducer;
