import { Box, MenuItem, Typography, useTheme } from "@mui/material";

import profile from "../../../assets/img/profile.jpeg";

const MessageItem = () => {
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
        <Box textAlign="left">
          <Typography
            fontWeight="bold"
            fontSize="0.85rem"
            sx={{ color: theme.palette.grey[900] }}
            className="user"
          >
            Sara Rogi
          </Typography>
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

export default MessageItem;
