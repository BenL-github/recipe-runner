import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
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

export default function AddUserForm(props) {
    const { selected, users , baseURL } = props;
    const [open, setOpen] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            customerid: selected.customerid
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            axios({
                method: "DELETE",
                url: baseURL + "users",
                data: {
                    customerid: values.customerid
                }
            })
                .then((res) => window.location.reload())
                .catch((err) => console.log(err))
        }
    })

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
                    <DialogTitle>Delete a User</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please select a user to be deleted.
                        </DialogContentText>

                        {/* select a user */}
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <InputLabel id="delete-user-label">User</InputLabel>
                            <Select
                                labelId="delete-user-label"
                                label="customerid"
                                name="customerid"
                                id="customerid"
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
}