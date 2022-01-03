import * as React from 'react';
import { TextField, Button, } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";

const validationSchema = yup.object({
    cartid: yup
        .number('Enter a cartid')
        .min(1, 'CartID should be greater than 0')
        .required('cartid is required'),
    customerid: yup
        .number('Enter a customerid')
        .min(1, 'CustomerID should be greater than 0')
        .required('customerid is required'),
});

export default function DeleteShoppingCartForm(props) {
    const { selectedRow, baseURL } = props;
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            cartid: selectedRow.cartid,
            customerid: selectedRow.customerid
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
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
                            type="number"
                            margin="dense"
                            id="cartid"
                            name="cartid"
                            label="cartid"
                            value={formik.values.cartid}
                            onChange={formik.handleChange}
                            sx={{ marginRight: 2, mb: 2 }}

                            error={formik.touched.cartid && Boolean(formik.errors.cartid)}
                            helperText={formik.touched.cartid && formik.errors.cartid}
                        />

                        <TextField
                            type="number"
                            margin="dense"
                            id="customerid"
                            name="customerid"
                            label="customerid"
                            value={formik.values.customerid}
                            onChange={formik.handleChange}

                            error={formik.touched.customerid && Boolean(formik.errors.customerid)}
                            helperText={formik.touched.customerid && formik.errors.customerid}
                        />
                    
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Submit</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
};