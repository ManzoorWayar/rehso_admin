import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  useTheme,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
  Button,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../../assets/img/logo2.png";
import { yupResolver } from "@hookform/resolvers/yup";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import VerificationInput from "react-verification-input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ResetPasswords from "../../utils/validationSchema/ResetPassword";
import {
  useResendMutation,
  useResetPasswordMutation,
} from "../../features/auth/authApiSlice";
import Meta from "../../components/common/Meta";
const MySwal = withReactContent(Swal);

const ResetPassword = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { t } = useTranslation();

  const [otpCode, setOTPCode] = useState(null);
  const onChange = (code) => setOTPCode(code);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resend] = useResendMutation();
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ResetPasswords),
  });

  useEffect(() => {
    if (!userInfo) navigate("/");
  }, [userInfo]);

  const resendHandler = async (e) => {
    e.preventDefault();

    try {
      await resend({ email: userInfo.email }).unwrap();
    } catch (rejectResp) {
      MySwal.fire({
        title: t("error"),
        text: t("messages:failed"),
        icon: "warning",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const onSubmit = async (data) => {
    data.otpCode = otpCode;
    data.email = userInfo.email;

    try {
      const userData = await resetPassword(data).unwrap();

      if (userData.success) return navigate("/");
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
      <Meta title="Reset Password | REHSO Dashboard" />

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: "10px",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.bgColor[1000],
            width: "80%",
            overflow: "hidden",
            filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.32))",
            borderRadius: "5px",
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
            Reset password
          </Typography>
          <Typography
            variant="h5"
            textAlign="left"
            px="20px"
            sx={{
              color: theme.palette.grey[900],
            }}
          >
            Enter the code that you recive on your email
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            my="20px"
          >
            <img src={logo} alt="logo" height="130px" />
            <Typography variant="h4" mt="10px">
              Verify-otp
            </Typography>
          </Box>
          <Box noValidate autoComplete="off" sx={{ p: "20px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  ".character--inactive": {
                    backgroundColor: theme.palette.bgColor[800],
                    borderRadius: "5px",
                  },
                  ".character--selected": {
                    backgroundColor: theme.palette.primary[100],
                    borderRadius: "5px",
                  },
                  ".character": {
                    borderRadius: "5px",
                  },
                }}
              >
                <VerificationInput
                  classNames={{
                    container: "varification-container",
                    character: "character",
                    characterInactive: "character--inactive",
                    characterSelected: "character--selected",
                  }}
                  validChars="0-9"
                  placeholder="_"
                  length={6}
                  autoFocus={true}
                  onChange={onChange}
                />
                <Typography alignSelf="start" mt="10px" sx={{ mt: "15px" }}>
                  Did not recived any token{" "}
                  <Button
                    variant="text"
                    onClick={resendHandler}
                    sx={{
                      color: theme.palette.primary.main,
                      display: "inline",
                      textDecoration: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    Resend
                  </Button>
                </Typography>
              </Box>

              <FormControl
                error={errors.newPassword ? true : false}
                variant="outlined"
                name="newPassword"
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
                <InputLabel htmlFor="newPassword">New password</InputLabel>
                <OutlinedInput
                  {...register("newPassword", { required: true })}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New password"
                />
                <FormHelperText>{errors?.newPassword?.message}</FormHelperText>
              </FormControl>
              <TextField
                {...register("confirmPassword", { required: true })}
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="confirmPassword"
                variant="outlined"
                type="password"
                error={errors?.confirmPassword ? true : false}
                helperText={errors?.confirmPassword?.message}
                sx={{
                  mt: "10px",
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
                  Submit
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
        </Box>
      </Container>
    </>
  );
};

export default ResetPassword;