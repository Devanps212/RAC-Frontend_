import { combineReducers } from "@reduxjs/toolkit";
import userLoginAuthReducer from '../slices/user/userLoginAuthSlice'
import tokenReducer from '../slices/user/tokenSlice'
import adminTokenReducer from '../slices/admin/tokenSlice'
import adminLoginReducer from '../slices/admin/adminLogin'
import partnerLoginReducer from '../slices/partner/partnerLogin'
import partnertTokenReducer from '../slices/partner/tokenSlice'

const rootReducer = combineReducers({
    token : tokenReducer,
    userAuth : userLoginAuthReducer,
    adminToken : adminTokenReducer,
    adminAuth : adminLoginReducer,
    partnerToken : partnertTokenReducer,
    partnerLogin : partnerLoginReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer