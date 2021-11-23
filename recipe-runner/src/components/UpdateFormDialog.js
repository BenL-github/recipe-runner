import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import FormInput from "./FormInput";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export default function UpdateFormDialog(props) {
  const { submitAction, rowParams } = props;
  const [open, setOpen] = React.useState(false);
  const [ingredientName, setIngredientName] = useState(rowParams.row.ingredientName)
  const [ingredientPrice, setIngredientPrice] = useState(rowParams.row.price)
  const [ingredientID, setIngredientID] = useState(rowParams.row.ingredientID)

  const update_form = {
    buttonLabel: "Update",
    title: "Update Ingredient",
    text: "Please a valid ingredient id along with changes.",
    inputs: [
      { id: "ingredientID", label: `ID: ${rowParams.row.ingredientID}`, type: "number", key: "ingredientID", hook: setIngredientID, disabled: true },
      { id: "ingredientName", label: `Name: ${rowParams.row.ingredientName}`, type: "text", key: "ingredientName", hook: setIngredientName, disabled: false },
      { id: "ingredientPrice", label: `Price: ${rowParams.row.price}`, type: "number", key: "ingredientPrice", hook: setIngredientPrice, disabled: false }
    ]
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = () => {
    setOpen(false);
    submitAction(ingredientName, ingredientPrice, ingredientID);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ my: 'auto', marginLeft: '1em' }}>
        {update_form.buttonLabel}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{update_form.title}</DialogTitle>
        <DialogContent>
          <DialogContentText> Updating ingredient #{rowParams.id}: {rowParams.row.ingredientName}</DialogContentText>
          {update_form["inputs"].map((input) => (
            <FormInput id={input.id} label={input.label} type={input.type} key={input.key} hook={input.hook} disabled={input.disabled} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
