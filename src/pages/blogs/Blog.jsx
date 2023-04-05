import { useState, useMemo } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Box, useTheme, useMediaQuery, Tooltip, Button } from "@mui/material";
import Meta from "../../components/common/Meta";
import {
  selectAllBlogs,
  useGetBlogsQuery,
  useDeleteBlogMutation,
} from "../../features/blog/blogApiSlice";
import { useSelector } from "react-redux";
import {
  LanguageOutlined,
  ModeEditOutlined,
  DeleteOutlined,
  ReadMoreOutlined,
  BookOnlineOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import CreateFaq from "./CreateFaq";
// import LocalFaq from "./LocalFaq";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EditBlog from "./EditBlog";
import FlexBetween from "../../components/FlexBetween";
import CreateBlog from "./CreateBlog";
import SingleBlog from "./SingelBlog";
import LocalBlog from "./LocalBlog";
const MySwal = withReactContent(Swal);

const Blog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNoneMobile = useMediaQuery("(min-width:900px)");
  const [showModal, setShowModal] = useState(false);
  const [singleBlogId, setSinglBlogId] = useState(null);

  const { isLoading, isSuccess, isError, error } = useGetBlogsQuery();
  const blogs = useSelector(selectAllBlogs);
  const [pageSize, setPageSize] = useState(10);

  const handleEditBlog = (id) => {
    setShowModal("edit");
    setSinglBlogId(id);
  };

  const handleSingleBlog = (id) => {
    setShowModal("singleBlog");
    setSinglBlogId(id);
  };

  const handleCreateBlog = () => {
    setShowModal("create");
  };

  const handleLocalBlog = (id) => {
    setShowModal("local");
    setSinglBlogId(id);
  };

  const [
    deleteBlog,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteBlogMutation();

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
        await deleteBlog(id);

        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        field: "title",
        headerName: "Title",
        valueFormatter: ({ value }) => {
          return value?.fa;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "content",
        headerName: "Content",
        valueFormatter: ({ value }) => {
          return value?.fa;
        },
        flex: 1,
        type: "string",
      },
      {
        field: "slug",
        headerName: "Slug",
        flex: 1,
        type: "string",
      },
      {
        field: "excerpt",
        valueFormatter: ({ value }) => {
          return value?.fa;
        },
        headerName: "Excerpt",
        flex: 1,
        type: "string",
      },
      {
        field: "comments",
        headerName: "Comments",
        valueFormatter: ({ value }) => {
          return value?.length;
        },
        flex: 0.5,
        type: "string",
      },
      {
        field: "author",
        valueFormatter: ({ value }) => {
          return value?.fullName;
        },

        headerName: "Name",
        flex: 1,
        type: "string",
      },
      {
        field: "createdAt",
        valueFormatter: ({ value }) => {
          const date = new Date(value);
          return date.toDateString();
        },
        headerName: "Created At",
        flex: 1,
        type: "string",
      },
      {
        field: "status",
        headerName: "Status",
        flex: 0.5,
        type: "string",
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        flex: 1.2,
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
            onClick={() => handleLocalBlog(params.id)}
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
            onClick={() => handleEditBlog(params.id)}
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
            onClick={() => handleSingleBlog(params.id)}
          />,
        ],
      },
    ],
    [theme]
  );

  return (
    <>
      <EditBlog
        showModal={showModal}
        setShowModal={setShowModal}
        id={singleBlogId}
      />
      <CreateBlog showModal={showModal} setShowModal={setShowModal} />
      <LocalBlog
        showModal={showModal}
        setShowModal={setShowModal}
        id={singleBlogId}
      />
      <SingleBlog
        showModal={showModal}
        setShowModal={setShowModal}
        id={singleBlogId}
      />
      {/* <LocalFaq
        showModal={showModal}
        setShowModal={setShowModal}
        id={singleFaqId}
      /> */}
      <Meta title="Blog | Rahanet Dashboard" />

      <Box m="15px">
        <FlexBetween>
          <Header title="Blog" subtitle="Blog" />
          <Button variant="contained" onClick={() => handleCreateBlog()}>
            Create Blog
          </Button>
        </FlexBetween>
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
            rows={blogs}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
};

export default Blog;
