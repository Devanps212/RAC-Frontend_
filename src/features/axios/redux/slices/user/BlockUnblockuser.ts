import { createSlice } from "@reduxjs/toolkit";

interface userBlock {
    blockeduser : string[]
}

const loadBlockedUsers = ()=>{
    try
    {
        const Buser = localStorage.getItem('BlockedUsers')
        return Buser ? JSON.parse(Buser) : []
    }
    catch(error:any)
    {
        console.log(error.message)
        return []
    }
}

const initialState : userBlock = {
    blockeduser: loadBlockedUsers()
}

const blockUnblockUser = createSlice({
    name:'UB_user',
    initialState,
    reducers:{
        block :(state, action)=>{
            console.log("admin blocking user ")
            const userId :string = action.payload
            if(!state.blockeduser.includes(userId))
            {
                console.log("user blocked :", userId)
                state.blockeduser.push(userId)
            }
            localStorage.setItem('BlockedUsers' ,JSON.stringify(state.blockeduser))
            console.log(localStorage.getItem('BlockedUsers'))
        },
        unBlock :(state, action)=>{
            const userId = action.payload
            state.blockeduser = state.blockeduser.filter((id)=>id!==userId)
            localStorage.setItem('BlockedUsers' ,JSON.stringify(state.blockeduser))
            console.log(localStorage.getItem('BlockedUsers'))
        }
    }
})
 

export const {block, unBlock} = blockUnblockUser.actions

export default blockUnblockUser.reducer


//start from here 
