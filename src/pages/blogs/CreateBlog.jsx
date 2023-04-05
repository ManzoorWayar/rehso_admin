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
import { useAddBlogMutation } from "../../features/blog/blogApiSlice";
import { selectBlogById } from "../../features/blog/blogApiSlice";
import { useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FlexBetween from "../../components/FlexBetween";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { toast } from 'react-toastify'

const CreateBlog = ({ showModal, setShowModal, id }) => {
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categories, setCategories] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const { t } = useTranslation();
  const statusOptions = [
    { label: "publish", value: "publish" },
    { label: "draft", value: "draft" },
    { label: "pending", value: "pending" },
  ];

  const { control, reset } = useForm({
    mode: "onChange"
  });

  const status = useWatch({
    control,
    name: "status",
    defaultValue: "status",
  });
  const [addBlog, { isLoading, isSuccess, isError, error }] =
    useAddBlogMutation();

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

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFile(undefined);
    setPreview(undefined);
    reset();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("content", content);
      formData.append("excerpt", excerpt);
      formData.append("image", selectedFile);
      formData.append("status", status.value);

      await addBlog(formData).unwrap();
      setShowModal(false);
      setSelectedFile(undefined);
      setPreview(undefined);
      setPreview(undefined);
      setTitle('');
      setSlug('');
      setExcerpt('');
      setContent('');
    } catch (error) {
      console.log('error');
    };
  }

  return (
    <div>
      <Dialog open={showModal === "create"} onClose={handleClose} fullWidth>
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
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="slug"
              label="slug"
              type="text"
              onChange={(e) => setSlug(e.target.value)}
              multiline
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
            multiline
            fullWidth
            variant="standard"
          />

          {/* <TextField
            autoFocus
            margin="dense"
            id="categories"
            label="categories"
            type="text"
            onChange={(e) => setCategories(e.target.value)}
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
              <img src={preview && preview} width="120px" height="120px" />
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

export default CreateBlog;
