import * as React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DeleteIngredientForm(props) {
    const {setIngredientID, ingredients, value} = props;

    return (
        <FormControl fullWidth sx={{ my:2 }}>
            <InputLabel id="delete-ingredient-label">Ingredient</InputLabel>
            <Select
                labelId="delete-ingredient-label"
                label="IngredientID"
                onChange={(e) => setIngredientID(e.target.value)}
                value={value}
                MenuProps={MenuProps}
            >
                {ingredients.map((ingredient) => (
                    <MenuItem key={ingredient.ingredientid} value={ingredient.ingredientid}> 
                        {ingredient.ingredientid} - {ingredient.ingredientname}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}