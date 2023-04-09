import { useState, useMemo } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Tooltip } from "@mui/material";
import Meta from "../../components/common/Meta";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAllVolunteers,
  useGetVolunteersQuery,
  useChangeVolunteerStatusMutation,
} from "../../features/volunteer/volunteersApiSlice";
import SingleVolenteer from "./SingleVolenteer";

import {
  CheckBoxOutlined,
  CloseOutlined,
  Pending,
  Info,
} from "@mui/icons-material";

const Volunteer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNoneMobile = useMediaQuery("(min-width:900px)");

  const { isLoading, isSuccess, isError, error } = useGetVolunteersQuery();

  const [changeStatus] = useChangeVolunteerStatusMutation();

  const volunteers = useSelector(selectAllVolunteers);
  const [pageSize, setPageSize] = useState(11);
  const [showModal, setShowModal] = useState(false);
  const [singleVolenteerId, setShowSingleVolenteerId] = useState(null);

  const changeContactStatus = async (status, id) => {
    await changeStatus({ id, status });
  };

  const moreInfo = (id) => {
    setShowModal(true);
    setShowSingleVolenteerId(id);
  };

  const columns = useMemo(
    () => [
      {
        field: "firstName",
        valueFormatter: (value) => {
          return value.firstName;
        },

        headerName: "FirstName",
        flex: 1,
        type: "string",
      },
      {
        field: "lastName",
        valueFormatter: (value) => {
          return value.lastName;
        },

        headerName: "LastName",
        flex: 1,
        type: "string",
      },
      {
        field: "email",
        headerName: "Email",
        valueFormatter: (value) => {
          return value?.email;
        },
        flex: 2,
        type: "string",
      },
      {
        field: "phones",
        headerName: "Phone Numbers",
        valueFormatter: (value) => {
          return value?.phones;
        },
        flex: 1.5,
        type: "string",
      },
      {
        field: "country",
        headerName: "Country",
        valueFormatter: (value) => {
          return value?.country;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "city",
        headerName: "Province",
        valueFormatter: (value) => {
          return value?.city;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "age",
        headerName: "Age",
        valueFormatter: ({ value }) => {
          return value?.age;
        },
        flex: 0.5,
        type: "string",
      },
      {
        field: "gender",
        headerName: "Gender",
        valueFormatter: ({ value }) => {
          return value?.gender;
        },
        flex: 0.7,
        type: "string",
      },
      {
        field: "careers",
        headerName: "Careers",
        valueFormatter: ({ value }) => {
          return value?.careers;
        },
        flex: 1.5,
        type: "string",
      },
      {
        field: "careerType",
        headerName: "Career Type",
        valueFormatter: ({ value }) => {
          return value;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "education",
        headerName: "Education",
        valueFormatter: ({ value }) => {
          return value?.education;
        },
        flex: 1,
        type: "string",
      },
      // {
      //     field: "attachments",
      //     headerName: "Attachments",
      //     valueFormatter: (value) => {
      //         return value?.attachments;
      //     },
      //     flex: 1,
      //     type: "string",
      // },
      // {
      //     field: "image",
      //     headerName: "Image",
      //     valueFormatter: (value) => {
      //         return value?.image;
      //     },
      //     flex: 1,
      //     type: "string",
      // },
      {
        field: "status",
        headerName: "Status",
        valueFormatter: (value) => {
          return value?.status;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "actions",
        headerName: "Change Stauts",
        type: "actions",
        flex: 2,
        getActions: (params) => [
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
          <GridActionsCellItem
            icon={
              <Tooltip
                title="Approved"
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: theme.palette.grey[800],
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              >
                <CheckBoxOutlined
                  sx={{
                    color: theme.palette.success.main,
                  }}
                />
              </Tooltip>
            }
            label="Approved"
            onClick={() => changeContactStatus("approved", params.id)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip
                title="MoreInfo"
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: theme.palette.grey[800],
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              >
                <Info
                  sx={{
                    color: theme.palette.success.main,
                  }}
                />
              </Tooltip>
            }
            label="MoreInfo"
            onClick={() => moreInfo(params.id)}
          />,
        ],
      },
    ],
    [theme]
  );

  return (
    <>
      <SingleVolenteer
        showModal={showModal}
        setShowModal={setShowModal}
        id={singleVolenteerId}
      />

      <Meta title="Volunteer | REHSO Dashboard" />

      <Box m="15px">
        <Header title="Volunteer's List" />
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
            rows={volunteers}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Volunteer;
