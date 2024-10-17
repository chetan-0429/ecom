import { createSlice } from "@reduxjs/toolkit";

const item = JSON.parse(localStorage.getItem('user'));
const initialState = {
    status:item ? true : false,
    userData:item ? item : null
};
export const userSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload;
            localStorage.setItem('user',JSON.stringify(state.userData))
        },
        logout:(state)=>{
            state.status = false;
            state.userData = null;
            localStorage.clear();
        }
    }
})

export const {login,logout}  = userSlice.actions;
export default userSlice.reducer; 