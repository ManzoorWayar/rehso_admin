import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../data/mockData";
import Header from "../components/Header";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";

const ManageTeam = () => {
  const theme = useTheme();
  const isNoneMobile = useMediaQuery("(min-width:900px)");

  const [pageSize, setPageSize] = useState(5);

  const desktopColumns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="90%"
            // m="0 auto"
            py="5px"
            px="10px"
            display="flex"
            justifyContent="space-between"
            backgroundColor={
              access === "admin"
                ? theme.palette.greenAccent.main
                : access === "manager"
                ? theme.palette.greenAccent[1000]
                : theme.palette.greenAccent[1100]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlined />}
            {access === "manager" && <SecurityOutlined />}
            {access === "user" && <LockOpenOutlined />}
            <Typography
              sx={{ ml: "5px" }}
              color={theme.palette.greenAccent[100]}
            >
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  const mobileColumns = [
    { field: "id", flex: 0.5, headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1.5,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="90%"
            // m="0 auto"
            py="5px"
            px="10px"
            display="flex"
            justifyContent="space-between"
            backgroundColor={
              access === "admin"
                ? theme.palette.greenAccent.main
                : access === "manager"
                ? theme.palette.greenAccent[1000]
                : theme.palette.greenAccent[1100]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlined />}
            {access === "manager" && <SecurityOutlined />}
            {access === "user" && <LockOpenOutlined />}
            <Typography
              sx={{ ml: "5px" }}
              color={theme.palette.greenAccent[100]}
            >
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="15px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        className="scrollbar"
        m="10px 0 0 0"
        height="73vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: theme.palette.primary.main,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.light[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.bgColor[1000],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: theme.palette.light[400],
          },
          "& .MuiCheckbox-root": {
            color: `${theme.palette.grey[800]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.grey[900]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          rows={mockDataTeam}
          columns={isNoneMobile ? desktopColumns : mobileColumns}
        />
      </Box>
    </Box>
  );
};

export default ManageTeam;
