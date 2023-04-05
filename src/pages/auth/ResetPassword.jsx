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
import { useForm } from "react-hook-form";
import { useState } from "react";
import React from "react";
import VerificationInput from "react-verification-input";
import Meta from "../../components/common/Meta";
const ResetPassword = () => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const onChange = (code) => setOTPCode(code);
  const [otpCode, setOTPCode] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Meta title="Reset Password | Rahanet Dashboard" />

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
            Enter the code that you recive on your mobile
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
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      display: "inline",
                      textDecoration: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    Resend
                  </Typography>
                </Typography>
              </Box>

              <FormControl
                error={errors.password ? true : false}
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
                <InputLabel htmlFor="password">New password</InputLabel>
                <OutlinedInput
                  {...register("password", { required: true })}
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
                <FormHelperText>
                  {errors.password && "This field is required"}
                </FormHelperText>
              </FormControl>
              <TextField
                {...register("confirmPassword", { required: true })}
                fullWidth
                id="confirmPassword"
                label="ConfirmPassword"
                variant="outlined"
                type="password"
                error={errors.confirmPassword ? true : false}
                helperText={errors.confirmPassword && "This field is required"}
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
                  disabled={loading}
                  fullWidth
                >
                  Submit
                </Button>
                {loading && (
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
