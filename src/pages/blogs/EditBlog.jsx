import { useEffect, useState } from "react";
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
  FormControl,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useUpdateBlogMutation } from "../../features/blog/blogApiSlice";
import { selectBlogById } from "../../features/blog/blogApiSlice";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/FlexBetween";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { toast } from 'react-toastify'

const EditBlog = ({ showModal, setShowModal, id }) => {
  const theme = useTheme();
  const blog = useSelector((state) => selectBlogById(state, id));
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const { t } = useTranslation();
  const statusOptions = [
    { label: "publish", value: "publish" },
    { label: "draft", value: "draft" },
    { label: "pending", value: "pending" },
  ];

  const {
    control,
    reset,
    errors
  } = useForm({
    mode: "onChange",
  });

  const status = useWatch({
    control,
    name: "status",
    defaultValue: "status",
  });

  const [updateBlog, { isLoading, isSuccess, isError, error }] =
    useUpdateBlogMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setSlug("");
      setContent("");
      setExcerpt("");
      setCategories("");
      setImage("");
      setSelectedFile(undefined);
      setPreview(undefined);
      reset()
    }

    if (blog) {
      setTitle(blog?.title?.fa);
      setSlug(blog?.slug);
      setContent(blog?.content?.fa);
      setExcerpt(blog?.excerpt?.fa);
      setImage(blog?.image);
      setCategories(blog?.categories);
    }
  }, [isSuccess, blog]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };


  useEffect(() => {
    if (isError) {
      if (error?.data?.errors) {
        error?.data.errors.forEach((error) => {
          return toast.error(error?.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        );
      }
    }
  }, [error, isError]);

  const handleClose = () => {
    setShowModal(false);
    setSelectedFile(undefined);
    setPreview(undefined);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const statusData = status === 'status' ? blog?.status : status?.value
    const imagePath = selectedFile === undefined ? blog?.image : selectedFile
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("image", imagePath);
    formData.append("status", statusData);
    formData.append("publicId", blog?.publicId);

    await updateBlog({ id, formData });
    setShowModal(false);
  };

  return (
    <div>
      <Dialog open={showModal === "edit"} onClose={handleClose} fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: theme.palette.bgColor[500],
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          Edit Blog
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: theme.palette.bgColor[500] }}>
          <FlexBetween>
            <TextField
              sx={{ mr: "30px" }}
              autoFocus
              margin="dense"
              id="title"
              label="title"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              multiline
              defaultValue={blog?.title?.fa}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="slug"
              label="slug"
              onChange={(e) => setSlug(e.target.value)}
              type="text"
              multiline
              defaultValue={blog?.slug}
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
            onChange={(e) => setContent(e.target.value)}
            defaultValue={blog?.content?.fa}
            multiline
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="excertp"
            label="excertp"
            type="text"
            onChange={(e) => setExcerpt(e.target.value)}
            defaultValue={blog?.excerpt?.fa}
            multiline
            fullWidth
            variant="standard"
          />

          {/* <TextField
            sx={{ mr: "30px" }}
            autoFocus
            margin="dense"
            id="categories"
            label="categories"
            type="text"
            onChange={(e) => setCategories(e.target.value)}
            defaultValue={blog?.categories}
            multiline
            fullWidth
            variant="standard"
          /> */}
          <FormControl
            fullWidth
            sx={{
              mt: "30px",
              mb: "20px",
              ".select__control": {
                backgroundColor: theme.palette.bgColor[1000],
                padding: "7px",
                borderColor: theme.palette.black[1100],
                "&:hover": {
                  borderColor: theme.palette.grey[900],
                },
              },
              ".select__placeholder": {
                color: theme.palette.grey[1100],
              },

              ".select__menu": {
                backgroundColor: theme.palette.bgColor.main,
                zIndex: 10000,
                "& > div": {
                  "& > div": {
                    backgroundColor: theme.palette.bgColor.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary[700],
                    },
                  },
                },
              },
              ".select__single-value": {
                color: theme.palette.grey[900],
              },
            }}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    controlShouldRenderValue={true}
                    options={statusOptions}
                    // defaultValue={{ label: blog?.status, value: blog?.status }}
                    id="status"
                    name="status"
                    placeholder={t("Status")}
                    // className={`form-multi-select react-select ${errors.status && "is-invalid"
                    //   }`}
                    classNamePrefix="select"
                    errorText={true}
                    // aria-invalid={errors.status && true}
                    aria-errormessage="status-invalid"
                    {...field}
                  />
                );
              }}
            />
          </FormControl>

          <FlexBetween sx={{ mt: "20px" }}>
            <FlexBetween>
              <Typography sx={{ mr: "10px" }}>Choice your photo</Typography>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={onSelectFile}
                />
                <PhotoCamera />
              </IconButton>
            </FlexBetween>
            <Box>
              <img
                src={preview ? preview : image}
                width="120px"
                height="120px"
              />
            </Box>
          </FlexBetween>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: theme.palette.bgColor[500] }}>
          <Button
            onClick={handleClose}
            sx={{ color: theme.palette.error.main }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={onSubmit}
            sx={{ color: theme.palette.primary[500] }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditBlog;
