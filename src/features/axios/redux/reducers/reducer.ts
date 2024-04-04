import { combineReducers } from "@reduxjs/toolkit";
import userLoginAuthReducer from '../slices/user/userLoginAuthSlice'
import tokenReducer from '../slices/user/tokenSlice'
import adminTokenReducer from '../slices/admin/tokenSlice'
import adminLoginReducer from '../slices/admin/adminLogin'
import partnerLoginReducer from '../slices/partner/partnerLogin'
import partnertTokenReducer from '../slices/partner/tokenSlice'
import BlockUnBlockUser from '../slices/user/BlockUnblockuser'

const rootReducer = combineReducers({
    token : tokenReducer,
    userAuth : userLoginAuthReducer,
    adminToken : adminTokenReducer,
    adminAuth : adminLoginReducer,
    partnerToken : partnertTokenReducer,
    partnerLogin : partnerLoginReducer,
    UBUser : BlockUnBlockUser
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer