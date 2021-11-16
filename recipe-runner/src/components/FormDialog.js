import * as React from "react";
import Button from "@mui/material/Button";
import FormInput from "./FormInput";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function FormDialog(props) {
  const {buttonLabel, title, text, submitAction, inputs} = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if(submitAction == undefined){
      setOpen(false);
    } else {
      setOpen(false);
      submitAction();
    }
    
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonLabel}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
          {inputs.map((input) => (
            <FormInput id={input.id} label={input.label} type={input.type} key={input.key} hook={input.hook}/>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
