import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataInvoices } from "../data/mockData";
import Header from "../components/Header";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";

const Invoices = () => {
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
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={theme.palette.primary.main}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];
  const mobileColumns = [
    { field: "id", headerName: "ID" },
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
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={theme.palette.primary.main}>
          ${params.row.cost}
        </Typography>
      ),
    },
  ];
  return (
    <Box m="15px">
      <Header
        title="Invoices"
        subtitle="List of invoices for Future Reference"
      />
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
          rows={mockDataInvoices}
          columns={isNoneMobile ? desktopColumns : mobileColumns}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
