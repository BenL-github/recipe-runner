import * as React from 'react';
import { TextField, Button, } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useFormik } from 'formik';
import axios from "axios";

export default function DeleteShoppingCartForm(props) {
    const { selectedRow, baseURL } = props;
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            cartid: selectedRow.cartid,
            customerid: selectedRow.customerid
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            axios({
                method: "DELETE",
                url: baseURL + "shoppingcarts",
                data: {
                    customerid: values.customerid,
                    cartid: values.cartid
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
                    <DialogTitle>Delete a Shopping Cart</DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please enter a valid (cartid, customerid) row that will be deleted.
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
                            id="customerid"
                            name="customerid"
                            label="customerid"
                            value={formik.values.customerid}
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