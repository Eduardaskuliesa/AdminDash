import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarToggled: boolean;
  isDarkMode: boolean;
  isLoggedIn: boolean;
}

const initialState: InitialStateTypes = {
  isSidebarToggled: false,
  isDarkMode: false,
  isLoggedIn: false,
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
  },
});

export const { setIsSideBarToggled, setIsDarkMode, setIsLoggedIn } =
  globalSlice.actions;

export default globalSlice.reducer;
