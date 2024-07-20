"use client";

import { useState } from "react";
import { apiPath } from "../../utils/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Loading from "./Loading";
import "./styles/createTeam.css";

const CreateTeam = ({ setTeamsDatabase }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newName, setNewName] = useState("");
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [teamCode, setTeamCode] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleCreateTeam = async () => {
    try {
      setIsLoading(true);
      const randomCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

      const response = await fetch(apiPath("/teams"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ team_name: newName, team_code: randomCode }),
      });

      if (!response.ok) {
        throw new Error("Failed to create team");
      }

      const newTeam = await response.json();
      setTeamsDatabase((prevTeams) => [...prevTeams, newTeam]);

      setTeamCode(randomCode);
      setSuccessDialogOpen(true);
      handleCloseDialog();
    } catch (error) {
      console.error("Error creating team:", error);
      setErrorDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        className="create-team-button"
      >
        Create Team
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create a New Team</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Team Name"
            type="text"
            fullWidth
            value={newName}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateTeam} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseErrorDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <Alert severity="error">Failed to create team. Please try again.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
        <DialogContent>
          <Alert severity="success">
            Team created successfully! Your team code is {teamCode}.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTeam;
