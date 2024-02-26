import { combineReducers } from "@reduxjs/toolkit";
import userLoginAuthReducer from '../slices/user/userLoginAuthSlice'
import tokenReducer from '../slices/user/tokenSlice'

const rootReducer = combineReducers({
    token : tokenReducer,
    userAuth : userLoginAuthReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer