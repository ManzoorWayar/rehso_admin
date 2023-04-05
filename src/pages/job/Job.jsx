import { useState, useMemo } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Tooltip } from "@mui/material";
import Meta from "../../components/common/Meta";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAllJobs,
  useGetJobsQuery,
  useChangeJobStatusMutation,
} from "../../features/job/jobApiSlice";
import { CheckBoxOutlined, CloseOutlined, Pending } from "@mui/icons-material";

const Job = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNoneMobile = useMediaQuery("(min-width:900px)");
  const [showModal, setShowModal] = useState(false);
  const [singleFaqId, setSinglFaqId] = useState(null);

  const { isLoading, isSuccess, isError, error } = useGetJobsQuery();

  const [changeStatus] = useChangeJobStatusMutation();

  const changeContactStatus = async (status, id) => {
    await changeStatus({ id, status });
  };

  const jobs = useSelector(selectAllJobs);
  const [pageSize, setPageSize] = useState(11);

  const columns = useMemo(
    () => [
      {
        field: "fullName",
        valueFormatter: (value) => {
          return value.fullName;
        },

        headerName: "FullName",
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
        field: "province",
        headerName: "Province",
        valueFormatter: (value) => {
          return value?.province;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "attachments",
        headerName: "Attachments",
        valueFormatter: (value) => {
          return value?.attachments;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "position",
        headerName: "Position",
        valueFormatter: ({ value }) => {
          return value?.position;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "company",
        headerName: "Company",
        valueFormatter: ({ value }) => {
          return value?.company;
        },
        flex: 0.7,
        type: "string",
      },
      {
        field: "duration",
        headerName: "Duration",
        valueFormatter: ({ value }) => {
          return value?.duration;
        },
        flex: 0.7,
        type: "string",
      },
      {
        field: "status",
        headerName: "Status",
        valueFormatter: (value) => {
          return value?.status;
        },
        flex: 0.8,
        type: "string",
      },
      {
        field: "actions",
        headerName: "Change Stauts",
        type: "actions",
        flex: 0.9,
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
                title="Declined"
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: theme.palette.grey[800],
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              >
                <CloseOutlined
                  sx={{
                    color: theme.palette.error.main,
                  }}
                />
              </Tooltip>
            }
            label="Declined"
            onClick={() => changeContactStatus("declined", params.id)}
          />,
        ],
      },
    ],
    [theme]
  );

  return (
    <>
      <Meta title="Jobs | Rahanet Dashboard" />

      <Box m="15px">
        <Header title="Applied Jobs List" subtitle="Check them Out!" />
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
            rows={jobs}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
};

export default Job;
