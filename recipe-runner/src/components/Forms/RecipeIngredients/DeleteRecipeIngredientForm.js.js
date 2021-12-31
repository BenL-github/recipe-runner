import * as React from 'react';
import { TextField, Button, } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useFormik } from 'formik';
import axios from "axios";

export default function DeleteRecipeIngredientForm(props) {
    const { selectedRow, baseURL } = props;
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            recipeid: selectedRow.recipeid,
            ingredientid: selectedRow.ingredientid
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            axios({
                method: "DELETE",
                url: baseURL + "recipeingredients",
                data: {
                    recipeid: values.recipeid,
                    ingredientid: values.ingredientid
                }
            })
                .then((res) => window.location.reload())
                .catch((err) => console.log(err))
        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ my: 'auto', marginLeft: '1em' }}>
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Delete a Recipe Ingredient</DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please enter a valid (recipeid, ingredientid) row that will be deleted.
                            **You may also select a row in the table to autofill the form.**
                        </DialogContentText>

                        <TextField
                    type="text"
                    margin="dense"
                    id="recipeid"
                    name="recipeid"
                    label="recipeID"
                    value={formik.values.recipeid}
                    onChange={formik.handleChange}
                    sx={{ marginRight: 2, mb: 2 }}
                />
                <TextField
                    type="text"
                    margin="dense"
                    id="ingredientid"
                    name="ingredientid"
                    label="ingredientID"
                    value={formik.values.ingredientid}
                    onChange={formik.handleChange}
                />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} type="submit">Submit</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
};