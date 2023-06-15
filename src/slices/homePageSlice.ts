import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


//define type for homepageSlice state
export interface homePageState {
  loggedIn: boolean;
  dashboardClicked: boolean;
  darkMode: boolean;
  userId: null | string;
}

// Define the initial state using that type
const initialState: homePageState = {
    loggedIn: false,
    dashboardClicked: false,
    darkMode: false,
    userId: null,
}




export const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.loggedIn = true;
    },
    setDashboardClicked: (state,  action: PayloadAction<boolean>) => {
      state.dashboardClicked = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setUserId: (state, action: PayloadAction<null | string>) => {
      state.userId = action.payload;
    },
  }
});

export const { setLoggedIn, setDashboardClicked, setDarkMode, setUserId } = homePageSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectLoggedIn = (state: RootState) => state.homePage.loggedIn;
export const selectDashboardClicked = (state: RootState) => state.homePage.dashboardClicked;
export const selectDarkMode = (state: RootState) => state.homePage.darkMode;
export const selectUserId = (state: RootState) => state.homePage.userId;
export default homePageSlice.reducer;