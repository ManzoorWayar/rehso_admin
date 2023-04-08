import { useState, useMemo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
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
} from "@mui/material";
import Meta from "../../components/common/Meta";
import { useGetVolunteersQuery } from "../../features/volunteer/volunteersApiSlice";
import { useParams } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const SingleVolenteer = ({ showModal, setShowModal, id }) => {
  const theme = useTheme();

  const { volenteer } = useGetVolunteersQuery("VolenteersList", {
    selectFromResult: ({ data }) => ({
      volenteer: data?.entities[id],
    }),
  });

  console.log("Volenteers", volenteer);

  const date = new Date(volenteer?.createdAt).toDateString();

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <Dialog open={showModal} onClose={handleClose} fullWidth>
          <DialogTitle
            sx={{
              backgroundColor: theme.palette.bgColor[500],
              textAlign: "center",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          ></DialogTitle>
          <DialogContent sx={{ backgroundColor: theme.palette.bgColor[500] }}>
            <Box width="150px" height="150px" sx={{ mb: "30px" }}>
              <img src={volenteer?.image} width="100%" height="100%" />
            </Box>
            <FlexBetween>
              <TextField
                sx={{ mr: "30px" }}
                autoFocus
                margin="dense"
                id="firstName"
                label="firstName"
                type="text"
                multiline
                value={volenteer?.firstName}
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="lastName"
                type="text"
                multiline
                value={volenteer?.lastName}
                fullWidth
                variant="standard"
              />
            </FlexBetween>
            <FlexBetween>
              <TextField
                sx={{ mr: "30px" }}
                autoFocus
                margin="dense"
                id="email"
                label="email"
                type="text"
                value={volenteer?.email}
                multiline
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="phones"
                label="phones"
                type="text"
                value={volenteer?.phones}
                multiline
                fullWidth
                variant="standard"
              />
            </FlexBetween>
            <FlexBetween>
              <TextField
                sx={{ mr: "30px" }}
                autoFocus
                margin="dense"
                id="country"
                label="country"
                type="text"
                value={volenteer?.country}
                multiline
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="province"
                label="province"
                type="text"
                value={volenteer?.province}
                multiline
                fullWidth
                variant="standard"
              />
            </FlexBetween>
            <FlexBetween>
              <TextField
                sx={{ mr: "30px" }}
                autoFocus
                margin="dense"
                id="gender"
                label="gender"
                type="text"
                value={volenteer?.gender}
                multiline
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="education"
                label="education"
                type="text"
                value={volenteer?.education}
                multiline
                fullWidth
                variant="standard"
              />
            </FlexBetween>
            <FlexBetween>
              <TextField
                sx={{ mr: "30px" }}
                autoFocus
                margin="dense"
                id="careerType"
                label="careerType"
                type="text"
                value={volenteer?.careerType}
                multiline
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="careers"
                label="careers"
                type="text"
                value={volenteer?.careers}
                multiline
                fullWidth
                variant="standard"
              />
            </FlexBetween>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: theme.palette.bgColor[500] }}>
            <Button
              onClick={handleClose}
              sx={{ color: theme.palette.error.main }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default SingleVolenteer;
