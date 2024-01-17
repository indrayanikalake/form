
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  personalDetails: {
    name: string;
    age: number;
    sex: string;
    mobile: string;
    govIdType: string;
    govId: string;
  };
  submittedUsers: Array<UserState["personalDetails"]>;
}

const initialState: UserState = {
  personalDetails: {
    name: "",
    age: 0,
    sex: "",
    mobile: "",
    govIdType: "",
    govId: "",
  },
  submittedUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPersonalDetails: (state, action: PayloadAction<UserState["personalDetails"]>) => {
      state.personalDetails = action.payload;
    },
    submitUser: (state) => {
      state.submittedUsers.push({ ...state.personalDetails });
    
      state.personalDetails = initialState.personalDetails;
    },
  },
});

export const { setPersonalDetails, submitUser } = userSlice.actions;
const userReducer = userSlice.reducer
export default userReducer;
