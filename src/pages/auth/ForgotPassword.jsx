import {
  Container,
  Box,
  Typography,
  useTheme,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Meta from '../../components/common/Meta'

const ForgotPassword = () => {
  const theme = useTheme();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Meta title="forgot-password | Rahanet Dashboard" />
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
                type="email"
                label="Email"
                variant="outlined"
                error={errors.email ? true : false}
                helperText={errors.email && "This field is required"}
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
                  disabled={loading}
                  fullWidth
                >
                  Send rest password
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
        </Box>
      </Container>
    </>
  );
};

export default ForgotPassword;
