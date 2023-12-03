import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';


const initialState = {
    uid: null,
    email: null,
    refreshToken: null,
    userType: null,
    deadlines: {
        d3: null,
        d4: null,
        d5: null,
        d6: null,
        d7: null,
        d8: null,
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.refreshToken = action.payload.refreshToken;
            state.userType = action.payload.userType;
            state.deadlines = {
                d3: action.payload.deadlines.d3,
                d4: action.payload.deadlines.d4,
                d5: action.payload.deadlines.d5,
                d6: action.payload.deadlines.d6,
                d7: action.payload.deadlines.d7,
                d8: action.payload.deadlines.d8
            };
        },
        logout: (state) => {
            state.uid = null;
            state.email = null;
            state.refreshToken = null;
            state.userType = null;
            state.deadlines = {
                d3: null,
                d4: null,
                d5: null,
                d6: null,
                d7: null,
                d8: null,
            };
        }
    }
});


export const selectUser = (state: RootState) => state.user;

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;
