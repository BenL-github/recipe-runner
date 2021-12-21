import * as React from "react";
import TextField from "@mui/material/TextField";

export default function AddIngredientForm(props) {
    const { setIngredientName, setIngredientPrice } = props;
    
    return (
        <>
            <TextField
                label="ingredient name"
                type="text"
                onBlur={(e) => setIngredientName(e.target.value)}

                variant="standard"
                margin="dense"
                sx={{ paddingRight: 2 }}
                autoFocus
            />

            <TextField
                label="ingredient price"
                type="number"
                onChange={(e) => setIngredientPrice(e.target.value)}

                variant="standard"
                margin="dense"
                sx={{ paddingRight: 2 }}
                autoFocus
            />
        </>
    )
}