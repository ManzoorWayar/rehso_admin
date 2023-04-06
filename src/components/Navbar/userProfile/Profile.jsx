import { useState } from "react";
import {
  useTheme,
  Box,
  Menu,
  Avatar,
  MenuItem,
  ListItemIcon,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";

import {
  PersonAdd,
  Settings,
  Logout,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useSendLogoutMutation } from "../../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [sendLogout, {}] = useSendLogoutMutation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    sendLogout();
    navigate("/");
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip
          title="Account settings"
          PopperProps={{
            sx: {
              "& .MuiTooltip-tooltip": {
                backgroundColor: theme.palette.grey[800],
                color: theme.palette.grey[200],
              },
            },
          }}
        >
          <Button
            onClick={handleClick}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "none",
              gap: "1rem",
            }}
          >
            <Avatar sx={{ bgcolor: theme.palette.primary[400] }}>
              {userInfo?.fullName[0]}
            </Avatar>

            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.85rem"
                sx={{ color: theme.palette.grey[900] }}
              >
                {userInfo?.username}
              </Typography>
              <Typography
                fontSize="0.75rem"
                sx={{ color: theme.palette.grey[800] }}
              >
                {userInfo?.superAdmin ? "SuperAdmin" : userInfo?.role}
              </Typography>
            </Box>
            <ArrowDropDownOutlined
              sx={{ color: theme.palette.grey[800], fontSize: "25px" }}
            />
          </Button>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: theme.palette.bgColor[400],
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: theme.palette.bgColor[400],
            "& .MuiMenuItem-root": {
              ":hover": {
                "& svg": {
                  color: theme.palette.primary.main,
                },
                color: theme.palette.primary.main,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <Typography>Add another</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Typography>Settings</Typography>
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
