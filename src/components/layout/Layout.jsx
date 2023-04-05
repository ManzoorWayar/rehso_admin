import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { Box, Container } from "@mui/material";

const Layout = () => {
  return (
    <Box display="flex" width="100%" height="100%">
      <Sidebar />
      <Container maxWidth="xl">
        <Navbar />
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
