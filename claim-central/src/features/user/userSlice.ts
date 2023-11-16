import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';


const initialState = {
    uid: null,
    email: null,
    refreshToken: null,
    userType: null,
    docRefId: null,
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
            state.docRefId = action.payload.docRefId;
        },
        logout: (state) => {
            state.uid = null;
            state.email = null;
            state.refreshToken = null;
            state.userType = null;
            state.docRefId = null;
        }
    }
});


export const selectUser = (state: RootState) => state.user;

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;
