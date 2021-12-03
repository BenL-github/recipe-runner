import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";


export default function FormDialogSelect(props) {
  const { buttonLabel, title, text, submitAction, inputs } = props;
  const [userID, setUserID] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = () => {
    setOpen(false);
    submitAction(userID);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ my: 'auto', marginLeft: '1em' }}>
        {buttonLabel}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          {inputs[0].data.length > 0
            ?
            <FormControl fullWidth>
              <InputLabel id="userSelect"> Name </InputLabel>
              <Select
                value={userID}
                label="Name"
                onChange={(e) => setUserID(e.target.value)}
              >
                {inputs[0].data.map((user) => (
                  <MenuItem value={user.customerID}> {user.customerID} - {user.fName} {user.lName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            :
            <p> All current users are assigned carts. </p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
