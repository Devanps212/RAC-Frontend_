import { createSlice } from "@reduxjs/toolkit";

const partnerAuth = createSlice({
    name:'partner-auth',
    initialState : {
        isLoggedIn : false
    },
    reducers:{
        isPartnerLogin : (state)=>{
            state.isLoggedIn = true
        },
        partnerLogout: (state)=>{
            state.isLoggedIn = false
        }
    }
})

export const {isPartnerLogin, partnerLogout} = partnerAuth.actions
export default partnerAuth.reducer