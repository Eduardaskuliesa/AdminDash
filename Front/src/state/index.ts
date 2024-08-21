import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarToggled: boolean;
  isDarkMode: boolean;
}

const initialState: InitialStateTypes = {
  isSidebarToggled: false,
  isDarkMode: false,
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
  },
});

export const { setIsSideBarToggled, setIsDarkMode } = globalSlice.actions;

export default globalSlice.reducer;
