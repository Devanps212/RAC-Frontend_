import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface tokenState {
    partnerToken : string | null
}

const loadTokenFromLocalStorage = () : string | null=>{
    try
    {
        const token = localStorage.getItem('partnerToken')
        return token ? token : ''
    }
    catch(error)
    {
        console.log("error getting token from session storage")
        return null
    }
}

const initialState : tokenState = {
    partnerToken : loadTokenFromLocalStorage()
}

const partnerTokenSlice = createSlice({
    name:'partner-token',
    initialState,
    reducers:{
        setPartnerToken : (state, action:PayloadAction<string>)=>{
            state.partnerToken = action.payload

            try
            {
                localStorage.setItem('partnerToken', action.payload)
            }
            catch(error)
            {
                console.log("error string token in localStorage")
            }
        },
        clearPartnerToken : (state)=>{
            state.partnerToken = null
            try
            {
                localStorage.removeItem('partnerToken')
                console.log("Partner token removed")
            }
            catch(error)
            {
                console.log("error removing partner token")
            }
        }

    }
})

export const {setPartnerToken, clearPartnerToken} = partnerTokenSlice.actions
export default partnerTokenSlice.reducer