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
import { useAddUserMutation } from "../../features/users/userApiSlice";
import RegisterSchema from "../../utils/validationSchema/RegisterSchema";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MySwal = withReactContent(Swal);

const CreateUser = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterSchema),
  });

  const isSuperAdmin = useWatch({
    control,
    name: "isSuperAdmin",
    defaultValue: false,
  });

  const [addUser, { isLoading, isSuccess, isError, error }] =
    useAddUserMutation();

  const onSubmitHandler = async (data) => {
    try {
      data.isSuperAdmin = isSuperAdmin;

      const formData = new FormData();

      formData.append(data);

      await addUser(formData).unwrap();
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
      <Grid item xs={12} sm={7}>
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

              <FlexBetween>
                <FormControl
                  error={errors.password && true}
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: "20px",
                    ".MuiFormLabel-root": {
                      "&.Mui-focused": {
                        color: theme.palette.grey[900],
                      },
                    },
                  }}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    {...register("password", { required: true })}
                    type="password"
                    label="Password"
                  />
                  <FormHelperText>{errors.password?.message}</FormHelperText>
                </FormControl>
                <FormControl
                  error={errors.confirmPassword && true}
                  variant="outlined"
                  fullWidth
                  sx={{
                    mt: "20px",
                    ".MuiFormLabel-root": {
                      "&.Mui-focused": {
                        color: theme.palette.grey[900],
                      },
                    },
                  }}
                >
                  <InputLabel htmlFor="confirmPassword">
                    confirmPassword
                  </InputLabel>
                  <OutlinedInput
                    {...register("confirmPassword", { required: true })}
                    type="password"
                    label="ConfirmPassword"
                  />
                  <FormHelperText>
                    {errors.confirmPassword?.message}
                  </FormHelperText>
                </FormControl>
              </FlexBetween>

              <FormGroup>
                <FormControlLabel
                  {...register("isSuperAdmin")}
                  control={<Switch />}
                  label="isSuperAdmin"
                />
              </FormGroup>
            </Box>

            <Box
              sx={{
                p: "20px",
              }}
            >
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
                ADD User
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
        </form>
      </Grid>
    </Grid>
  );
};

export default CreateUser;
