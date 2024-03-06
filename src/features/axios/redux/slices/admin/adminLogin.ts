import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
    name:'admin-auth',
    initialState: {
        isLoggedIn : false
    },
    reducers:{
        isAdminLogin : (state)=>{
            state.isLoggedIn = true
        },
        adminLogout: (state)=>{
            state.isLoggedIn = false
        }
    }
})

export const {isAdminLogin, adminLogout} = adminAuthSlice.actions
export default adminAuthSlice.reducer