import { useState, useMemo } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Tooltip, Button } from "@mui/material";
import Meta from "../../components/common/Meta";
import {
  useDeleteFaqMutation,
  useGetFaqsQuery,
} from "../../features/faq/faqApiSlice";
import { selectAllFaqs } from "../../features/faq/faqApiSlice";
import { useSelector } from "react-redux";
import {
  LanguageOutlined,
  ModeEditOutlined,
  DeleteOutlined,
  ReadMoreOutlined,
  BookOnlineOutlined,
} from "@mui/icons-material";
import EditFaq from "./EditFaq";
import { useNavigate } from "react-router-dom";
import CreateFaq from "./CreateFaq";
import LocalFaq from "./LocalFaq";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const FAQ = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNoneMobile = useMediaQuery("(min-width:900px)");
  const [showModal, setShowModal] = useState(false);
  const [singleFaqId, setSinglFaqId] = useState(null);

  const { isLoading, isSuccess, isError, error } = useGetFaqsQuery();

  const faqs = useSelector(selectAllFaqs);
  const [pageSize, setPageSize] = useState(10);

  const handleEditFaq = (id) => {
    setShowModal("edit");
    setSinglFaqId(id);
  };

  const handleCreateFaq = (id) => {
    setShowModal("create");
  };

  const handleLocalFaq = (id) => {
    setShowModal("local");
    setSinglFaqId(id);
  };

  const [
    deleteFaq,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteFaqMutation();

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
        field: "question",
        valueFormatter: ({ value }) => {
          return value?.en || value?.fa || value?.ps;
        },

        headerName: "Question",
        flex: 1,
        type: "string",
      },
      {
        field: "answer",
        headerName: "Answer",
        valueFormatter: ({ value }) => {
          return value?.en || value?.fa || value?.ps;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        flex: 0.5,
        getActions: (params) => [
          <GridActionsCellItem
            icon={
              <Tooltip
                title="Change language"
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: theme.palette.grey[800],
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              >
                <LanguageOutlined />
              </Tooltip>
            }
            label="Language"
            onClick={() => handleLocalFaq(params.id)}
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
            onClick={() => handleEditFaq(params.id)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip
                title="Read More"
                PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      backgroundColor: theme.palette.grey[800],
                      color: theme.palette.grey[200],
                    },
                  },
                }}
              >
                <ReadMoreOutlined />
              </Tooltip>
            }
            label="Read More"
            onClick={() => navigate(`/dashboard/faq/${params.id}`)}
          />,
        ],
      },
    ],
    [theme]
  );

  return (
    <>
      <EditFaq
        showModal={showModal}
        setShowModal={setShowModal}
        id={singleFaqId}
      />
      <CreateFaq showModal={showModal} setShowModal={setShowModal} />
      <LocalFaq
        showModal={showModal}
        setShowModal={setShowModal}
        id={singleFaqId}
      />
      <Meta title="FAQ | Rahanet Dashboard" />

      <Box m="15px">
        <Header
          title="Frequently Asked Questions"
          subtitle="Ask you question"
        />
        <Button onClick={() => handleCreateFaq()}>Create FAQ</Button>
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
            rows={faqs}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
};

export default FAQ;
