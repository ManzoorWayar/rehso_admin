import { useState, useMemo } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Tooltip } from "@mui/material";
import { GppGood, Pending } from "@mui/icons-material";
import Meta from "../../components/common/Meta";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAllContacts,
  useGetContactsQuery,
  useChangeStatusMutation,
} from "../../features/contact/contactApiSlice";

const ContactUs = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNoneMobile = useMediaQuery("(min-width:900px)");
  const [showModal, setShowModal] = useState(false);

  const { isLoading, isSuccess, isError, error } = useGetContactsQuery();
  const [changeStatus] = useChangeStatusMutation();

  const changeContactStatus = async (status, id) => {
    await changeStatus({ id, status });
  };

  const contacts = useSelector(selectAllContacts);
  const [pageSize, setPageSize] = useState(11);

  const columns = useMemo(
    () => [
      {
        field: "name",
        valueFormatter: (value) => {
          return value.name;
        },

        headerName: "Name",
        flex: 1,
        type: "string",
      },
      {
        field: "email",
        headerName: "Email",
        valueFormatter: (value) => {
          return value?.email;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "phoneNumber",
        headerName: "PhoneNumber",
        valueFormatter: (value) => {
          return value?.phoneNumber;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "subject",
        headerName: "Subject",
        valueFormatter: (value) => {
          return value?.subject;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "message",
        headerName: "Message",
        valueFormatter: (value) => {
          return value?.message;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "status",
        headerName: "Status",
        valueFormatter: (value) => {
          return value?.status;
        },
        flex: 0.5,
        type: "string",
      },
      {
        field: "actions",
        headerName: "Change Stauts",
        type: "actions",
        flex: 0.7,
        getActions: (params) => [
          <GridActionsCellItem
            icon={
              <Tooltip
                title="Fulfilled"
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: theme.palette.grey[800],
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              >
                <GppGood
                  sx={{
                    color: theme.palette.success.main,
                  }}
                />
              </Tooltip>
            }
            label="Fulfilled"
            onClick={() => changeContactStatus("fulfilled", params.id)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip
                title="Pending"
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: theme.palette.grey[800],
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              >
                <Pending
                  sx={{
                    color: theme.palette.warning.main,
                  }}
                />
              </Tooltip>
            }
            label="Pending"
            onClick={() => changeContactStatus("pending", params.id)}
          />,
        ],
      },
    ],
    [theme]
  );

  return (
    <>
      <Meta title="Contact-Us | Rahanet Dashboard" />

      <Box m="15px">
        <Header title="Contacts' Lists" subtitle="Check them Out!" />
        <Box
          className="scrollbar"
          m="10px 0 0 0"
          height="73vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
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
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[11, 21]}
            pagination
            rows={contacts}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
};

export default ContactUs;
