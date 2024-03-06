import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface tokenState {
    adminToken : string | null
}

const loadTokenFromLocalStorage = () :string | null =>{
    try
    {
        const token = localStorage.getItem('admintoken')
        return token ? token : null
    }
    catch(error)
    {
        console.log("error getting token from loccalStorage")
        return null
    }
}

const initialState : tokenState = {
    adminToken : loadTokenFromLocalStorage()
}

const adminTokenSlice = createSlice({
    name:'admin-Token',
    initialState,
    reducers: {
        setAdminToken: (state, action : PayloadAction<string>)=>{
            state.adminToken = action.payload
            try
            {
                localStorage.setItem('admintoken', action.payload)
            }
            catch(error)
            {
                console.log("error string token in localStorage")
            }
        },
        clearAdminToken: (state) =>
        {
            state.adminToken = null
            try
            {
                localStorage.removeItem('admintoken')
                console.log("admin token removed")
            }
            catch(error)
            {
                console.log(error)
                console.log("error removing admin token")
            }
        }
    }
})

export const {setAdminToken, clearAdminToken} = adminTokenSlice.actions
export default adminTokenSlice.reducer