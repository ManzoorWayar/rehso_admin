import { createSlice } from "@reduxjs/toolkit";

const theme = localStorage.getItem("theme");

const initialState = {
  theme: theme ? theme : "dark",
};

export const globalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const selectTheme = (state) => state.global.theme;

export const { setTheme } = globalSlice.actions;

export default globalSlice.reducer;
