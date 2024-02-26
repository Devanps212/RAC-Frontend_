import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface TokenState {
    token : string | null
}
const loadFromLocalStorage = () : string | null =>{
    try{
        const token = localStorage.getItem('token')
        return token ? token : null
    }
    catch(error){
        console.log(error)
        return null
    }
}

const initialState : TokenState = {
    token :loadFromLocalStorage()
}

const tokenSlice =  createSlice({
    name:'token',
    initialState,
    reducers : {
        setToken : (state, action: PayloadAction<string>) => {
            state.token = action.payload
            try{
                localStorage.setItem('token', action.payload)
            }
            catch(error){
                console.log("error string token in local storage")
            }
        },
        clearToken :(state)=>{
            state.token = null
            try{
                localStorage.removeItem('token')
            }
            catch(error){
                console.log("error removing token from localstorage")
            }
        }
    },
    
})
export const {setToken, clearToken} = tokenSlice.actions
export default tokenSlice.reducer