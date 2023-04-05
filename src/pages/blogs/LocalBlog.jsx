import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { useUpdateLocalBlogMutation } from "../../features/blog/blogApiSlice";

const LocalBlog = ({ showModal, setShowModal, id }) => {
  const [title_ps, setTitle_ps] = useState("");
  const [content_ps, setContent_ps] = useState("");
  const [excerpt_ps, setExcerpt_ps] = useState("");
  const [title_en, setTitle_en] = useState("");
  const [content_en, setContent_en] = useState("");
  const [excerpt_en, setExcerpt_en] = useState("");

  const theme = useTheme();

  const handleClose = () => {
    setShowModal(false);
  };

  const [updateLocalBlog, { isLoading, isSuccess, isError, error }] =
    useUpdateLocalBlogMutation();

  const onSubmit = async (e) => {
    if (
      title_ps.trim() &&
      content_ps.trim() &&
      excerpt_ps.trim() &&
      title_en.trim() &&
      content_en.trim() &&
      excerpt_en.trim()
    ) {
      await updateLocalBlog({
        id,
        title_ps,
        content_ps,
        excerpt_ps,
        title_en,
        content_en,
        excerpt_en,
      });
      setShowModal(false);
    }
  };

  return (
    <div>
      <Dialog open={showModal === "local"} onClose={handleClose} fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.bgColor[500],
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          Add Blog locals
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: theme.palette.bgColor[500] }}>
          <TextField
            autoFocus
            margin="dense"
            id="title_ps"
            label="Title Pashto"
            onChange={(e) => setTitle_ps(e.target.value)}
            type="text"
            multiline
            defaultValue={title_ps}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="content_ps"
            label="Content Pashto"
            type="text"
            onChange={(e) => setContent_ps(e.target.value)}
            defaultValue={content_ps}
            multiline
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="excerpt_ps"
            label="Excerpt Pashto"
            onChange={(e) => setExcerpt_ps(e.target.value)}
            type="text"
            multiline
            defaultValue={excerpt_ps}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="title_en"
            label="Title English"
            onChange={(e) => setTitle_en(e.target.value)}
            type="text"
            multiline
            defaultValue={title_en}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="content_ps"
            label="Content English"
            type="text"
            onChange={(e) => setContent_en(e.target.value)}
            defaultValue={content_en}
            multiline
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="excerpt_en"
            label="Excerpt English"
            onChange={(e) => setExcerpt_en(e.target.value)}
            type="text"
            multiline
            defaultValue={excerpt_en}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: theme.palette.bgColor[500] }}>
          <Button
            onClick={handleClose}
            sx={{ color: theme.palette.error.main }}
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} sx={{ color: theme.palette.primary[500] }}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LocalBlog;
