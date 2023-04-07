import {
  Grid,
  Box,
  Typography,
  useTheme,
  TextField,
  FormControl,
  CircularProgress,
  Button,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  IconButton,
  FormControlLabel,
  Switch,
  FormGroup,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import {
  selectUserById,
  useUpdateUserMutation,
} from "../../features/users/userApiSlice";
import userUpdateSchema from "../../utils/validationSchema/userUpdateSchema";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const MySwal = withReactContent(Swal);

const EditUser = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(userUpdateSchema),
  });

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  useEffect(() => {
    setValue("fullName", `${user?.fullName}`);
    setValue("email", `${user?.email}`);
    setValue("isSuperAdmin", `${user?.isSuperAdmin}`);
  }, [setValue]);

  const isSuperAdmin = useWatch({
    control,
    name: "isSuperAdmin",
    defaultValue: user?.isSuperAdmin,
  });

  const onSubmitHandler = async (data) => {
    try {
      await updateUser({ id, data }).unwrap();
      await MySwal.fire({
        title: t("success"),
        text: t("messages:success", { key: "" }),
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      reset();
      navigate("/dashboard/users");
    } catch (rejectResp) {
      const { data } = rejectResp;

      if (data?.errors) {
        data.errors.forEach((error) =>
          setError(error["param"], { type: "manual", message: error["msg"] })
        );
      } else {
        MySwal.fire({
          title: t("error"),
          text: t("messages:failed"),
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <Grid container sx={{ mt: "10px", mb: "20px" }} gap="20px">
      <Grid item xs={12} sm={7} sx={{ m: "auto" }}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Box
            sx={{
              backgroundColor: theme.palette.bgColor[1000],
              width: "100%",
              filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.32))",
              borderRadius: "5px",
            }}
          >
            <Typography variant="body1" sx={{ pt: "10px", pl: "10px" }}>
              User General Info
            </Typography>
            <Box
              noValidate
              autoComplete="off"
              sx={{ p: "20px", width: "100%" }}
            >
              <FlexBetween>
                <TextField
                  {...register("fullName", { required: true })}
                  fullWidth
                  id="fullName"
                  label="FullName"
                  variant="outlined"
                  error={errors.fullName && true}
                  helperText={errors.fullName?.message}
                  sx={{
                    mr: "10px",
                    "& .MuiFormLabel-root": {
                      "&.Mui-focused": {
                        color: theme.palette.grey[900],
                      },
                    },
                  }}
                />

                <TextField
                  {...register("email", { required: true })}
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  error={errors.email && true}
                  helperText={errors.email?.message}
                  sx={{
                    mr: "10px",
                    "& .MuiFormLabel-root": {
                      "&.Mui-focused": {
                        color: theme.palette.grey[900],
                      },
                    },
                  }}
                />
              </FlexBetween>

              <FormGroup>
                <FormControlLabel
                  {...register("isSuperAdmin")}
                  control={<Switch defaultChecked={user?.isSuperAdmin} />}
                  label="isSuperAdmin"
                />
              </FormGroup>
            </Box>

            <Box
              sx={{
                p: "20px",
              }}
            >
              <Box display="flex" alignItems="center">
                <Box sx={{ position: "relative", mt: "20px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      color: theme.palette.light[100],
                      backgroundColor: theme.palette.primary.main,
                      fontWeight: "bold",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: theme.palette.primary[400],
                      },
                    }}
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {" "}
                    Edit User
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: theme.palette.primary[400],
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%) !important",
                        }}
                      />
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditUser;
