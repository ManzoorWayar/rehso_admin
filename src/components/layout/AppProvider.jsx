import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectTheme } from "../../features/global/globalSlice";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { themeSettings } from "../../theme";

const AppProvider = () => {
    const mode = useSelector(selectTheme);
    const theme = createTheme(themeSettings(mode));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Outlet />
            <ToastContainer />
        </ThemeProvider>
    )
}

export default AppProvider