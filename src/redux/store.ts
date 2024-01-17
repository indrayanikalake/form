import { configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice';
import userAdditonalDetailsReducer from './userAdditionalDetailsSlice';

const store = configureStore({
reducer:{
  user: userReducer,
  userAdditionalDetails: userAdditonalDetailsReducer
}
})

export default store;