import React from "react";
import { Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  return (
    <Grid
      xs={12}
      md={2.8}
      backgroundColor={theme.palette.light.main}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.grey[900] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.primary.main }}
      >
        {value}
      </Typography>
      <FlexBetween>
        <Typography
          variant="body1"
          fontStyle="italic"
          sx={{ color: theme.palette.grey[800] }}
        >
          {increase}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.grey[800] }}>
          {description}
        </Typography>
      </FlexBetween>
    </Grid>
  );
};

export default StatBox;
