import * as React from "react";
import { TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";

const validationSchema = yup.object({
    fname: yup
        .string('Enter a first name')
        .required('first name is required'),
    lname: yup
        .string('Enter a last name')
        .required('last name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    zipcode: yup
        .number("Enter user's zipcode")
        .min(1, 'Please enter a valid zipcode')
        .required('Zipcode is required'),
});

export default function AddUserForm(props) {
    const { baseURL } = props;
    const [open, setOpen] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            email: "",
            zipcode: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios({
                method: "POST",
                url: baseURL + "users",
                data: {
                    fname: values.fname,
                    lname: values.lname,
                    email: values.email,
                    zipcode: values.zipcode
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
                Add
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Add a User</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please enter a first & last name, email, and zipcode.
                        </DialogContentText>

                        {/* fname */}
                        <TextField
                            id="fname"
                            name="fname"
                            label="First Name"
                            type="text"
                            value={formik.values.fname}
                            onChange={formik.handleChange}

                            variant="outlined"
                            margin="dense"
                            sx={{ paddingRight: 2 }}
                            autoFocus

                            error={formik.touched.fname && Boolean(formik.errors.fname)}
                            helperText={formik.touched.fname && formik.errors.fname}
                        />
                        
                        {/* lname */}
                        <TextField
                            id="lname"
                            name="lname"
                            label="Last Name"
                            type="text"
                            value={formik.values.lname}
                            onChange={formik.handleChange}

                            variant="outlined"
                            margin="dense"
                            sx={{ paddingRight: 2 }}
                            autoFocus

                            error={formik.touched.lname && Boolean(formik.errors.lname)}
                            helperText={formik.touched.lname && formik.errors.lname}
                        />
                        
                        {/* email */}
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            type="text"
                            
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            
                            variant="outlined"
                            margin="dense"
                            sx={{ paddingRight: 2 }}
                            autoFocus

                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        {/* zipcode */}
                        <TextField
                            id="zipcode"
                            name="zipcode"
                            label="Zipcode"
                            type="number"
                            
                            value={formik.values.zipcode}
                            onChange={formik.handleChange}
                            
                            variant="outlined"
                            margin="dense"
                            sx={{ paddingRight: 2 }}
                            autoFocus

                            error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                            helperText={formik.touched.zipcode && formik.errors.zipcode}
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
}