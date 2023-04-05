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
  FormControlLabel,
  FormGroup,
  Checkbox,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import React from "react";
import Cookies from 'js-cookie';
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../features/auth/authSlice'
import usePersist from '../../hooks/UsePersist'
import LoginSchema from "../../utils/validationSchema/LoginSchema"
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { toast } from 'react-toastify'
import Meta from '../../components/common/Meta'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme()
  const [persist, setPersist] = usePersist()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
  })

  const [login, { isLoading }] = useLoginMutation()

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleToggle = () => setPersist(prev => !prev)

  const onSubmitHandler = async (data) => {
    try {
      const userData = await login(data).unwrap()
      dispatch(setCredentials({ userData }))
      navigate('/dashboard')
      reset()

    } catch (rejectResp) {
      const { data } = rejectResp
      console.log(data);
      if (data?.errors) {
        data.errors.forEach(error => setError(error["param"], { type: "manual", message: error["msg"] }))
      } else {
        toast.error(data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

      }
    }
  }

  return (
    <>
      <Meta title="Login | Rahanet Dashboard" />

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
            Sign In Rahanet
          </Typography>
          <Typography
            variant="h5"
            textAlign="left"
            px="20px"
            sx={{
              color: theme.palette.grey[900],
            }}
          >
            Welcome to Rahanet management system
          </Typography>
          <Box noValidate autoComplete="off" sx={{ p: "20px" }}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <TextField
                {...register("emailUsername", { required: true })}
                fullWidth
                id="emailUsername"
                label="Email"
                variant="outlined"
                error={errors.emailUsername ? true : false}
                helperText={errors.emailUsername?.message}
                sx={{
                  "& .MuiFormLabel-root": {
                    "&.Mui-focused": {
                      color: theme.palette.grey[900],
                    },
                  },
                }}
              />

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
                <InputLabel htmlFor="password">Password</InputLabel>
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
                  label="Password"
                />
                <FormHelperText>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
              <FlexBetween>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Keep me logged in"
                    sx={{ color: theme.palette.grey[900] }}
                    onChange={handleToggle}
                    checked={persist}
                  />
                </FormGroup>
                <Button
                  variant="text"
                  size="small"
                  sx={{ color: theme.palette.grey[900] }}
                >
                  Forgot Password?
                </Button>
              </FlexBetween>
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
                  disabled={isLoading}
                  fullWidth
                >  Login
                  {isLoading && (
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
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
