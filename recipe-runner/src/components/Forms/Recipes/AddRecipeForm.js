import * as React from "react";
import TextField from "@mui/material/TextField";

export default function AddRecipeForm(props) {
    const { setRecipeTitle, setRecipeServing, setRecipeDescription } = props;

    return (
        <>
            <TextField
                label="Recipe Title"
                type="text"
                onBlur={(e) => setRecipeTitle(e.target.value)}

                variant="standard"
                margin="dense"
                sx={{ paddingRight: 2 }}
                autoFocus
            />

            <TextField
                label="Recipe Serving"
                type="number"
                onChange={(e) => setRecipeServing(e.target.value)}

                variant="standard"
                margin="dense"
                sx={{ paddingRight: 2 }}
                autoFocus
            />

            <TextField
                label="Recipe Description"
                type="text"
                onBlur={(e) => setRecipeDescription(e.target.value)}

                variant="standard"
                margin="dense"
                sx={{ paddingRight: 2 }}
                autoFocus
            />
        </>
    )
}