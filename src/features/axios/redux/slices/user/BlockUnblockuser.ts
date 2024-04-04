import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blockeduser:[] as string[]
}

const blockUnblockUser = createSlice({
    name:'UB_user',
    initialState,
    reducers:{
        block :(state, action)=>{
            const userId :string = action.payload
            if(!state.blockeduser.includes(userId))
            {
                state.blockeduser.push(userId)
            }
        },
        unBlock :(state, action)=>{
            const userId = action.payload
            state.blockeduser = state.blockeduser.filter((id)=>id!==userId)
        }
    }
})

export const {block, unBlock} = blockUnblockUser.actions

export default blockUnblockUser.reducer


//start from here 
