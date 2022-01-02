import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useFormik } from 'formik';
import axios from "axios";

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

export default function AddShoppingCartForm(props) {
    const { baseURL } = props;
    const [open, setOpen] = React.useState(false);

    // retrieves the carts for select input
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(baseURL + "users")
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formik = useFormik({
        initialValues: {
            customerid: ''
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            axios({
                method: "POST",
                url: baseURL + "shoppingcarts",
                data: {
                    customerid: values.customerid
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
                Add
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Add a ShoppingCart</DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please select a user to add an additional cart to.
                        </DialogContentText>

                        {/* Select customer */}
                        <FormControl fullWidth sx={{ my: 2 }}>

                            <InputLabel id="add-user-label">customerID</InputLabel>
                            <Select
                                labelId="add-user-label"
                                id="customerid"
                                name="customerid"
                                label="customerID"
                                onChange={formik.handleChange}
                                value={formik.values.customerid}
                                MenuProps={MenuProps}
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.customerid} value={user.customerid}>
                                        {user.customerid} - {user.lname}, {user.fname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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