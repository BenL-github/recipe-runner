import * as React from 'react';
import { TextField, Button, } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useFormik } from 'formik';
import axios from "axios";

export default function UpdateSelectedRecipeForm(props) {
    const { selectedRow, baseURL } = props;
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            recipeid: selectedRow.recipeid,
            cartid: selectedRow.cartid,
            quantity: selectedRow.quantity
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            axios({
                method: "PUT",
                url: baseURL + "selectedrecipes",
                data: {
                    recipeid: values.recipeid,
                    cartid: values.cartid,
                    quantity: values.quantity
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
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Update a Selected Recipe</DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please enter a valid (recipeid, cartid) pair and a new quantity.
                            **You may also select a row in the table to autofill the form.**
                        </DialogContentText>

                        <TextField
                            type="text"
                            margin="dense"
                            id="cartid"
                            name="cartid"
                            label="cartid"
                            value={formik.values.cartid}
                            onChange={formik.handleChange}
                            sx={{ marginRight: 2, mb: 2 }}
                        />

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
                            id="quantity"
                            name="quantity"
                            label="quantity"
                            value={formik.values.quantity}
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