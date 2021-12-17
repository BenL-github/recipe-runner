import * as React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from "@mui/material";

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
            >
                {ingredients.map((ingredient) => (
                    <MenuItem key={ingredient.ingredientID} value={ingredient.ingredientID}> 
                        {ingredient.ingredientID} - {ingredient.ingredientName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}