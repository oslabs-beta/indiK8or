import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


//define type for homepageSlice state
export interface sideBarState {
    showLogoutText: boolean;
    showThemeText: boolean;
    showDashText: boolean;
}

// Define the initial state using that type
const initialState: sideBarState = {
    showLogoutText: false,
    showThemeText: false,
    showDashText: false,
}


export const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        setShowDashText: (state, action: PayloadAction<boolean>) => {
            state.showDashText = action.payload;
        },
        setShowLogoutText: (state, action: PayloadAction<boolean>) => {
            state.showLogoutText = action.payload;
        },
        setShowThemeText: (state, action: PayloadAction<boolean>) => {
            state.showThemeText = action.payload;
        },
    }
});

export const {  setShowDashText, setShowLogoutText, setShowThemeText } = sideBarSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectShowLogoutText = (state: RootState) => state.sideBar.showLogoutText;
export const selectShowThemeText = (state: RootState) => state.sideBar.showThemeText;
export const selectShowDashText = (state: RootState) => state.sideBar.showDashText;
export default sideBarSlice.reducer;