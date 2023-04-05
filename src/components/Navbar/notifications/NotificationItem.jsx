import { Box, MenuItem, Typography, useTheme } from "@mui/material";

import profile from "../../../assets/img/profile.jpeg";

const NotificationItem = () => {
  const theme = useTheme();
  return (
    <MenuItem>
      <Box display="flex" columnGap="6px">
        <Box
          component="img"
          alt="profile"
          src={profile}
          height="32px"
          width="32px"
          borderRadius="50%"
          sx={{ objectFit: "cover" }}
        />
        <Box textAlign="left" width="250px">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              fontWeight="bold"
              fontSize="0.85rem"
              sx={{ color: theme.palette.grey[900] }}
              className="user"
            >
              Sara Rogi
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.grey[800] }}>
              5 Min ago
            </Typography>
          </Box>
          <Typography
            fontSize="0.75rem"
            sx={{ color: theme.palette.grey[800] }}
          >
            Recently liked you photo
          </Typography>
        </Box>
      </Box>
    </MenuItem>
  );
};

export default NotificationItem;
