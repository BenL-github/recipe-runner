import * as React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";

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

export default function UpdateIngredientForm(props) {
    const { setIngredientID, setIngredientName, setIngredientPrice, ingredients, value } = props;

    return (
        <>
            <FormControl fullWidth sx={{ my: 2 }}>
                {/* // Select ID */}
                <InputLabel id="update-ingredient-label">Ingredient</InputLabel>
                <Select
                    labelId="update-ingredient-label"
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

                {/* // Edit name */}
                <TextField
                    label="ingredient name"
                    type="text"
                    onBlur={(e) => setIngredientName(e.target.value)}

                    variant="standard"
                    margin="dense"
                    sx={{ paddingRight: 2 }}
                    autoFocus
                />
                {/* // Edit price */}
                <TextField
                    label="ingredient price"
                    type="number"
                    onChange={(e) => setIngredientPrice(e.target.value)}

                    variant="standard"
                    margin="dense"
                    sx={{ paddingRight: 2 }}
                    autoFocus
                />
            </FormControl>
        </>
    )
}