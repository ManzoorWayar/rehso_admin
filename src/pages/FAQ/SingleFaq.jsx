import { useState, useMemo } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  unstable_resetCleanupTracking,
} from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Tooltip } from "@mui/material";
import Meta from "../../components/common/Meta";
import { useGetSingleFaqQuery } from "../../features/faq/faqApiSlice";
import { selectAllFaqs } from "../../features/faq/faqApiSlice";
import { useSelector } from "react-redux";
import {
  LanguageOutlined,
  ModeEditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import EditFaq from "./EditFaq";
const SingleFaq = () => {
  const theme = useTheme();
  const isNoneMobile = useMediaQuery("(min-width:900px)");
  const [showModal, setShowModal] = useState(false);
  const [singleFaqId, setSinglFaqId] = useState(null);

  const { id } = useParams();
  const {
    data: faq,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSingleFaqQuery(id);
  const [pageSize, setPageSize] = useState(5);

  const columns = useMemo(
    () => [
      {
        field: "question",
        headerName: "Question",
        flex: 1,
        type: "string",
      },
      {
        field: "answer",
        headerName: "Answer",
        flex: 1,
        type: "string",
      },
      {
        field: "category",
        headerName: "Category",
        valueFormatter: ({ value }) => {
          return value?.name?.en || value?.name?.fa || value?.name?.ps;
        },
        flex: 0.5,
      },
    ],
    [theme]
  );

  const handleEditFaq = (id) => {
    setShowModal(true);
    setSinglFaqId(id);
  };

  return (
    <>
      <EditFaq
        showModal={showModal}
        setShowModal={setShowModal}
        id={singleFaqId}
      />
      <Meta title="SingleFaq | Rahanet Dashboard" />

      <Box m="15px">
        <Header
          title="Single Frequently Asked Questions"
          subtitle="Ask you question"
        />
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
          {isSuccess && (
            <DataGrid
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              rows={faq}
              getRowHeight={() => "auto"}
              columns={columns}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default SingleFaq;
