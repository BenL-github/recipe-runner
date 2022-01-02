import * as React from "react";
import { TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";

const validationSchema = yup.object({
    ingredientname: yup
        .string('Enter an ingredient name')
        .required('Name is required'),
    ingredientprice: yup
        .number('Enter an ingredient price')
        .min(0, 'Price should be greater or equal to 0')
        .required('Price is required'),
});

export default function AddIngredientForm(props) {
    const { baseURL } = props;
    const [open, setOpen] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            ingredientname: "",
            ingredientprice: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios({
                method: "POST",
                url: baseURL + "ingredients",
                data: {
                    ingredientname: values.ingredientname,
                    ingredientprice: values.ingredientprice
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

            <Dialog open={open} onclose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Add an Ingredient</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please enter an ingredient name and price.
                        </DialogContentText>

                        {/* ingredient name */}
                        <TextField
                            id="ingredientname"
                            name="ingredientname"
                            label="Ingredient Name"
                            type="text"
                            value={formik.values.ingredientname}
                            onChange={formik.handleChange}

                            variant="outlined"
                            margin="dense"
                            sx={{ paddingRight: 2 }}
                            autoFocus

                            error={formik.touched.ingredientname && Boolean(formik.errors.ingredientname)}
                            helperText={formik.touched.ingredientname && formik.errors.ingredientname}
                        />

                        {/* price */}
                        <TextField
                            id="ingredientprice"
                            name="ingredientprice"
                            label="Ingredient Price"
                            type="number"
                            value={formik.values.ingredientprice}
                            onChange={formik.handleChange}

                            variant="outlined"
                            margin="dense"
                            sx={{ paddingRight: 2 }}
                            autoFocus

                            error={formik.touched.ingredientprice && Boolean(formik.errors.ingredientprice)}
                            helperText={formik.touched.ingredientprice && formik.errors.ingredientprice}
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