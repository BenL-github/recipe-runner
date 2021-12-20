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
    const {setRecipeID, recipes, value} = props;

    return (
        <FormControl fullWidth sx={{ my:2 }}>
            <InputLabel id="delete-recipe-label">Recipe</InputLabel>
            <Select
                labelId="delete-recipe-label"
                label="recipeID"
                onChange={(e) => setRecipeID(e.target.value)}
                value={value}
                MenuProps={MenuProps}
            >
                {recipes.map((recipe) => (
                    <MenuItem key={recipe.recipeid} value={recipe.recipeid}> 
                        {recipe.recipeid} - {recipe.recipetitle}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}