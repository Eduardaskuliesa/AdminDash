import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarToggled: boolean;
  isDarkMode: boolean;
  isLoggedIn: boolean;
  isDropdownToggled: null | string;
}

const initialState: InitialStateTypes = {
  isSidebarToggled: false,
  isDarkMode: false,
  isLoggedIn: false,
  isDropdownToggled: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSideBarToggled: (state, action: PayloadAction<boolean>) => {
      state.isSidebarToggled = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIsDropdownToggled: (state, action: PayloadAction<null | string>) => {
      state.isDropdownToggled = action.payload;
    },
  },
});

export const {
  setIsSideBarToggled,
  setIsDarkMode,
  setIsLoggedIn,
  setIsDropdownToggled,
} = globalSlice.actions;

export default globalSlice.reducer;
