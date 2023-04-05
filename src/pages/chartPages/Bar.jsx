import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/charts/BarChart";

const Bar = () => {
  return (
    <Box m="10px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <BarChart height="75vh" width="98%" />
    </Box>
  );
};

export default Bar;
