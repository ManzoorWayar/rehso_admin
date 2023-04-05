import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/charts/PieChart";

const Pie = () => {
  return (
    <Box m="10px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <PieChart height="75vh" width="98%" />
    </Box>
  );
};

export default Pie;
