import { useState, useMemo } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Tooltip, Button } from "@mui/material";
import Meta from "../../components/common/Meta";
import {
  useDeletePackageMutation,
  useGetPackagesQuery,
  selectAllPackages,
} from "../../features/packages/packagesApiSlice";
import { useSelector } from "react-redux";
import {
  LanguageOutlined,
  ModeEditOutlined,
  DeleteOutlined,
  ReadMoreOutlined,
  BookOnlineOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";

const MySwal = withReactContent(Swal);

const Packages = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNoneMobile = useMediaQuery("(min-width:900px)");
  const [showModal, setShowModal] = useState(false);
  const [singleFaqId, setSinglFaqId] = useState(null);
  const { t, i18n } = useTranslation();

  const { isLoading, isSuccess, isError, error } = useGetPackagesQuery();

  const packageData = useSelector(selectAllPackages);
  const [pageSize, setPageSize] = useState(10);

  const handleEditFaq = (id) => {
    setShowModal("edit");
    setSinglFaqId(id);
  };

  const handleLocalFaq = (id) => {
    setShowModal("local");
    setSinglFaqId(id);
  };

  const [
    deleteFaq,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeletePackageMutation();

  const deleteHandler = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFaq(id);

        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        field: "name",
        valueFormatter: ({ value }) => {
          return value?.en || value?.fa;
        },

        headerName: "Name",
        flex: 1,
        type: "string",
      },
      {
        field: "slug",
        valueFormatter: ({ value }) => {
          return value?.slug;
        },

        headerName: "Slug",
        flex: 1,
        type: "string",
      },
      {
        field: "type",
        valueFormatter: ({ value }) => {
          return value?.type;
        },

        headerName: "Type",
        flex: 1,
        type: "string",
      },
      {
        field: "capacity",
        valueFormatter: ({ value }) => {
          return value?.capacity;
        },

        headerName: "Capacity",
        flex: 1,
        type: "string",
      },
      {
        field: "province",
        valueFormatter: ({ value }) => {
          return value?.province;
        },

        headerName: "Province",
        flex: 1,
        type: "string",
      },
      {
        field: "category",
        valueFormatter: ({ value }) => {
          return value?.name?.en || value?.name?.fa;
        },

        headerName: "Category",
        flex: 1,
        type: "string",
      },
      {
        field: "duration",
        valueFormatter: (value) => {
          return value?.duration;
        },

        headerName: "Duration",
        flex: 1,
        type: "string",
      },
      {
        field: "bandwidth",
        headerName: "Bandwidth",
        valueFormatter: ({ value }) => {
          return `${value?.type} | ${value?.amount}`;
        },
        flex: 1.3,
        type: "string",
      },
      {
        field: "price",
        headerName: "Price",
        valueFormatter: ({ value }) => {
          return `${value?.main} | ${value?.plus !== undefined ? value?.plus : "none"
            }`;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "properties",
        valueFormatter: ({ value }) => {
          return value[0]?.en;
        },

        headerName: "properties",
        flex: 2,
        type: "string",
      },
      {
        field: "isPlus",
        valueFormatter: ({ value }) => {
          return value?.isPlus ? "Yes" : "NO";
        },

        headerName: "Is Plus",
        flex: 1,
        type: "string",
      },
      {
        field: "isHybrid",
        valueFormatter: ({ value }) => {
          return value?.isHybrid ? "Yes" : "NO";
        },

        headerName: "Is Hybrid",
        flex: 1,
        type: "string",
      },
      // {
      //     field: "marker",
      //     headerName: "Is New",
      //     valueFormatter: ({ value }) => {
      //         return `${}`;
      //     },
      //     flex: 1,
      //     type: "string",
      // },
      {
        field: "priority",
        headerName: "Priority",
        valueFormatter: ({ value }) => {
          return value?.priority;
        },
        flex: 0.5,
        type: "string",
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        flex: 2,
        getActions: (params) => [
          // <GridActionsCellItem
          //   icon={
          //     <Tooltip
          //       title="Change language"
          //       PopperProps={{
          //         sx: {
          //           "& .MuiTooltip-tooltip": {
          //             backgroundColor: theme.palette.grey[800],
          //             color: theme.palette.grey[200],
          //           },
          //         },
          //       }}
          //     >
          //       <LanguageOutlined />
          //     </Tooltip>
          //   }
          //   label="Language"
          //   onClick={() => handleLocalFaq(params.id)}
          // />,
          <GridActionsCellItem
            icon={
              <Tooltip
                title="Edit"
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: theme.palette.grey[800],
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              >
                <ModeEditOutlined />
              </Tooltip>
            }
            label="Edit"
            onClick={() => navigate(`edit/${params.id}`)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip
                title="Delete"
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: theme.palette.grey[800],
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              >
                <DeleteOutlined
                  sx={{
                    color: theme.palette.error.main,
                  }}
                />
              </Tooltip>
            }
            label="Delete"
            onClick={() => deleteHandler(params.id)}
          />,
          // <GridActionsCellItem
          //   icon={
          //     <Tooltip
          //       title="Read More"
          //       PopperProps={{
          //         sx: {
          //           "& .MuiTooltip-tooltip": {
          //             backgroundColor: theme.palette.grey[800],
          //             color: theme.palette.grey[200],
          //           },
          //         },
          //       }}
          //     >
          //       <ReadMoreOutlined />
          //     </Tooltip>
          //   }
          //   label="Read More"
          //   onClick={() => navigate(`/dashboard/faq/${params.id}`)}
          // />,
        ],
      },
    ],
    [theme]
  );

  return (
    <>
      <Meta title="Packages | Rahanet Dashboard" />

      <Box m="15px">
        <Header title="Internet Packages" subtitle="All Packages" />
        <Button onClick={() => navigate("create")}>
          Create Package
        </Button>
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
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            rows={packageData}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
};

export default Packages;
