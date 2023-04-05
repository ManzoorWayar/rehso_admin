import { useState } from "react";
import {
  useTheme,
  Box,
  Menu,
  IconButton,
  Tooltip,
  Button,
  Badge,
} from "@mui/material";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip
          title="New Notifications"
          PopperProps={{
            sx: {
              "& .MuiTooltip-tooltip": {
                backgroundColor: theme.palette.grey[800],
                color: theme.palette.grey[200],
              },
            },
          }}
        >
          <IconButton onClick={handleClick}>
            <Badge color="error" badgeContent={16} max={15}>
              <NotificationsNoneOutlined
                sx={{ fontSize: "25px", color: theme.palette.primary.main }}
              />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="messages-menu"
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
            minWidth: "250px",
            "& .MuiMenuItem-root": {
              ":hover": {
                "& .user": {
                  color: theme.palette.primary.main,
                },
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <Button fullWidth={true} sx={{ p: "10px" }}>
          Read All Notifications
        </Button>
      </Menu>
    </>
  );
};

export default Notifications;
