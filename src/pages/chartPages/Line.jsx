import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/charts/LineChart";

const Line = () => {
  return (
    <Box m="10px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <LineChart height="75vh" width="98%" />
    </Box>
  );
};

export default Line;
