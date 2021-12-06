import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";


export default function SelectDialogSelectedRecipes(props) {
  const { buttonLabel, title, text, submitAction, inputs } = props;
  const [cartID, setCartID] = React.useState()
  const [recipeID, setRecipeID] = React.useState()
  const [quantity, setQuantity] = React.useState()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = () => {
    setOpen(false);
    submitAction(cartID, recipeID, quantity);
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

          {/* Cart Selection */}
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="userSelect"> Cart Owner </InputLabel>
            <Select
              value={cartID}
              label="Cart Owner"
              onChange={(e) => setCartID(e.target.value)}
            >
              {inputs[0].cartData.map((cart) => (
                <MenuItem value={cart.cartID}> {cart.customerID} - {cart.fName} {cart.lName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Recipe Selection */}
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="userSelect"> Recipe </InputLabel>
            <Select
              value={recipeID}
              label="Recipe"
              onChange={(e) => setRecipeID(e.target.value)}
            >
              {inputs[1].recipeData.map((recipe) => (
                <MenuItem value={recipe.recipeID}> {recipe.recipeID} - {recipe.recipeTitle}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Quantity Input */}
          <TextField
            autoFocus
            margin="dense"
            label="quantity"
            variant="standard"
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
