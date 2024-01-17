
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  personalDetails: {
    address: string;
    state: string;
    city: string;
    country: string;
    pincode: number;
    
 
  };
  submittedUsers: Array<UserState["personalDetails"]>;
}

const initialState: UserState = {
  personalDetails: {
    address: "",
    state: "",
    city: "",
    country: "",
    pincode: 0,

  },
  submittedUsers: [],
};

const userAdditionalDetailsSlice = createSlice({
  name: "userAdditionalDetails",
  initialState,
  reducers: {
    setPersonalDetails: (state, action: PayloadAction<UserState["personalDetails"]>) => {
      state.personalDetails = action.payload;
    },
    submitUser: (state) => {
      state.submittedUsers.push({ ...state.personalDetails });
      // Reset personalDetails after submission
      state.personalDetails = initialState.personalDetails;
    },
  },
});

export const { setPersonalDetails, submitUser } = userAdditionalDetailsSlice.actions;
const userAdditonalDetailsReducer = userAdditionalDetailsSlice.reducer
export default userAdditonalDetailsReducer;
