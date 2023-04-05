import { useState, useMemo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import Meta from "../../components/common/Meta";
import { useGetBlogsQuery } from "../../features/blog/blogApiSlice";
import { useParams } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const SingleBlog = ({ showModal, setShowModal, id }) => {
  const theme = useTheme();

  const { blog } = useGetBlogsQuery("blogList", {
    selectFromResult: ({ data }) => ({
      blog: data?.entities[id],
    }),
  });

  const date = new Date(blog?.createdAt).toDateString();

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <Dialog
          open={showModal === "singleBlog"}
          onClose={handleClose}
          fullWidth
        >
          <DialogTitle
            sx={{
              backgroundColor: theme.palette.bgColor[500],
              textAlign: "center",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          ></DialogTitle>
          <DialogContent sx={{ backgroundColor: theme.palette.bgColor[500] }}>
            <Box width="100%" height="350px" sx={{ mb: "30px" }}>
              <img src={blog?.image} width="100%" height="100%" />
            </Box>
            <FlexBetween>
              <TextField
                sx={{ mr: "30px" }}
                autoFocus
                margin="dense"
                id="title"
                label="title"
                type="text"
                multiline
                value={blog?.title?.fa}
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="slug"
                label="slug"
                type="text"
                multiline
                value={blog?.slug}
                fullWidth
                variant="standard"
              />
            </FlexBetween>
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="content"
              type="text"
              value={blog?.content?.fa}
              multiline
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="authorName"
              label="AuthorName"
              type="text"
              value={blog?.author?.fullName}
              multiline
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="status"
              label="status"
              type="text"
              value={blog?.status}
              multiline
              fullWidth
              variant="standard"
            />
            <FlexBetween>
              <TextField
                sx={{ mr: "30px" }}
                autoFocus
                margin="dense"
                id="categories"
                label="categories"
                type="text"
                value={blog?.categories}
                multiline
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="status"
                label="status"
                type="text"
                value={blog?.status}
                multiline
                fullWidth
                variant="standard"
              />
            </FlexBetween>
            <FlexBetween>
              <TextField
                sx={{ mr: "30px" }}
                autoFocus
                margin="dense"
                id="careatedAt"
                label="Careated At"
                type="text"
                value={date}
                multiline
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="comments Counts"
                label="Comments Counts"
                type="text"
                value={blog?.comments?.length}
                multiline
                fullWidth
                variant="standard"
              />
            </FlexBetween>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: theme.palette.bgColor[500] }}>
            <Button
              onClick={handleClose}
              sx={{ color: theme.palette.error.main }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default SingleBlog;
