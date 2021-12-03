import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";


export default function SelectDialogRecipeIngredients(props) {
  const { buttonLabel, title, text, submitAction, inputs } = props;
  const [recipeID, setRecipeID] = React.useState()
  const [ingredientID, setIngredientID] = React.useState()
  const [uOm, setUOM] = React.useState()
  const [ingredientQuantity, setIngredientQuantity] = React.useState()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = () => {
    setOpen(false);
    submitAction(recipeID, ingredientID, uOm, ingredientQuantity);
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

          {/* Recipe Selection */}
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="userSelect"> Recipe </InputLabel>
            <Select
              value={recipeID}
              label="Recipe"
              onChange={(e) => setRecipeID(e.target.value)}
            >
              {inputs[0].recipeData.map((recipe) => (
                <MenuItem value={recipe.recipeID}> {recipe.recipeID} - {recipe.recipeTitle}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Ingredient Selection */}
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="userSelect"> Ingredient </InputLabel>
            <Select
              value={ingredientID}
              label="Ingredient"
              onChange={(e) => setIngredientID(e.target.value)}
            >
              {inputs[1].ingredientData.map((ingredient) => (
                <MenuItem value={ingredient.ingredientID}> {ingredient.ingredientID} - {ingredient.ingredientName}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* uOm Input */}
          <TextField
            autoFocus
            margin="dense"
            label="uOm"
            variant="standard"
            onChange={(e) => setUOM(e.target.value)}
          />

          {/* Quantity Input */}
          <TextField
            autoFocus
            margin="dense"
            label="quantity"
            variant="standard"
            onChange={(e) => setIngredientQuantity(e.target.value)}
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
