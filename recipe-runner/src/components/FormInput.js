import * as React from "react";
import TextField from "@mui/material/TextField";

export default function FormInput({id, label, type, key, hook}){
    return (
        <TextField
            autoFocus
            margin="dense"
            id={id}
            label={label}
            type={type}
            variant="standard"
            onChange={(e)=>hook(e.target.value)}
            key={key}
            sx={{paddingRight:2}}
        />
    )
}