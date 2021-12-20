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

export default function UpdateRecipeForm(props) {
    const { setRecipeID, setRecipeTitle, setRecipeServing, setRecipeDescription, recipes, value } = props;

    return (
        <>
            <FormControl fullWidth sx={{ my: 2 }}>
                {/* Select ID */}
                <InputLabel id="update-recipe-label">Recipe</InputLabel>
                <Select
                    labelId="update-recipe-label"
                    label="RecipeID"
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

                {/* Edit title */}
                <TextField
                    label="Recipe Title"
                    type="text"
                    onChange={(e) => setRecipeTitle(e.target.value)}

                    variant="standard"
                    margin="dense"
                    sx={{ paddingRight: 2 }}
                    autoFocus
                />

                {/* Edit price */}
                <TextField
                    label="Recipe Serving"
                    type="number"
                    onChange={(e) => setRecipeServing(e.target.value)}

                    variant="standard"
                    margin="dense"
                    sx={{ paddingRight: 2 }}
                    autoFocus
                />

                {/* Edit Description */}
                <TextField
                    label="Recipe Description"
                    type="text"
                    onChange={(e) => setRecipeDescription(e.target.value)}

                    variant="standard"
                    margin="dense"
                    sx={{ paddingRight: 2 }}
                    autoFocus
                />
            </FormControl>
        </>
    )
}