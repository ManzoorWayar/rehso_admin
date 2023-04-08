import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import FlexBetween from "../FlexBetween";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";

import { useProSidebar } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { setTheme } from "../../features/global/globalSlice";
import Profile from "./userProfile/Profile";
import Messages from "./messages/Messages";
import Notifications from "./notifications/Notifications";
const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { collapseSidebar, toggleSidebar } = useProSidebar();

  return (
    <AppBar
      sx={{
        background: theme.palette.bgColor.main,
        boxShadow: "none",
      }}
      position="sticky"
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          {/* Side bar collapse sidebar button */}
          <IconButton
            sx={{ mr: "10px", display: { xs: "none", md: "flex" } }}
            onClick={() => {
              collapseSidebar();
            }}
          >
            <MenuIcon
              sx={{ fontSize: "25px", color: theme.palette.primary.main }}
            />
          </IconButton>
          {/* Toggle sidebar button */}
          <IconButton
            sx={{ mr: "10px", display: { md: "none" } }}
            onClick={() => {
              collapseSidebar(true);
              toggleSidebar();
            }}
          >
            <MenuIcon
              sx={{ fontSize: "25px", color: theme.palette.primary.main }}
            />
          </IconButton>

          {/* Search input */}
          {/* <FlexBetween
            backgroundColor={theme.palette.light.main}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            <InputBase placeholder="Search..." />

            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween> */}
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setTheme())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined
                sx={{ fontSize: "25px", color: theme.palette.primary.main }}
              />
            ) : (
              <LightModeOutlined
                sx={{ fontSize: "25px", color: theme.palette.primary.main }}
              />
            )}
          </IconButton>
          <IconButton
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            <SettingsOutlined
              sx={{
                fontSize: "25px",
                color: theme.palette.primary.main,
              }}
            />
          </IconButton>
          {/* <Notifications />
          <Messages /> */}
          <Profile />
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
