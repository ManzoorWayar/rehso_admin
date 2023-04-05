import { Box, Typography, Avatar, Badge, useTheme } from "@mui/material";
import profile from "../../assets/img/profile.jpeg";
import FlexBetween from "../../components/FlexBetween";
const Contact = ({ hasMessage }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      sx={{
        py: "10px",
        px: "10px",
        cursor: "pointer",
        ":hover": { backgroundColor: theme.palette.bgColor[500] },
      }}
    >
      <Badge
        color="warning"
        variant="dot"
        overlap="circular"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Avatar alt="Remy Sharp" src={profile} />
      </Badge>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        sx={{
          ml: "5px",
          display: {
            xs: "none",
            lg: "flex",
          },
        }}
      >
        <FlexBetween>
          <Typography
            variant="h5"
            sx={{ fontWeight: "600", color: theme.palette.grey[900] }}
          >
            Sara Sussan
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.grey[800] }}>
            19 jan
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.grey[800], fontWeight: "bold" }}
          >
            Last messagefadss
          </Typography>
          {hasMessage && (
            <Box sx={{ mr: "10px" }}>
              <Badge badgeContent={4} color="error"></Badge>
            </Box>
          )}
        </FlexBetween>
      </Box>
    </Box>
  );
};

export default Contact;
