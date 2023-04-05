import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  useTheme,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import ForgotPasswords from "../../utils/validationSchema/ForgotPassword";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useForgotPasswordMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import Meta from '../../components/common/Meta'
const MySwal = withReactContent(Swal);

const ForgotPassword = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ForgotPasswords),
  });

  const onSubmit = async (data) => {
    try {
      const userData = await forgotPassword(data).unwrap();
      dispatch(setCredentials(userData));
      if (userData?.success) return navigate("/auth/reset-password");
      reset();
    } catch (rejectResp) {
      const { data } = rejectResp;
      if (data?.errors) {
        data.errors.forEach((error) =>
          setError(error["param"], { type: "manual", message: error["msg"] })
        );
      } else {
        MySwal.fire({
          title: t("error"),
          text: t(data?.message),
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <>
      <Meta title="forgot password | REHSO Dashboard" />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.bgColor[1000],
            width: "70%",
            overflow: "hidden",
            filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.32))",
            borderRadius: "5px",
            px: "20px",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            p={2}
            sx={{
              color: theme.palette.grey[900],
              fontWeight: "bold",
            }}
          >
            Forgot password?
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              color: theme.palette.grey[800],
            }}
          >
            To reset your password please send us your email
          </Typography>
          <Box noValidate autoComplete="off" sx={{ py: "20px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("email", { required: true })}
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                sx={{
                  "& .MuiFormLabel-root": {
                    "&.Mui-focused": {
                      color: theme.palette.grey[900],
                    },
                  },
                }}
              />

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
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  disabled={isLoading}
                  fullWidth
                >
                  Send rest password
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: theme.palette.greenAccent[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%) !important",
                    }}
                  />
                )}
              </Box>
            </form>
          </Box>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                my: "10px",
                color: theme.palette.grey[900],
              }}
            >
              return to sign?
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default ForgotPassword;