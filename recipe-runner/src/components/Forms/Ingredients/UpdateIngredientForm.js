import * as React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useFormik } from 'formik';
import * as yup from 'yup';
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

const validationSchema = yup.object({
    ingredientname: yup
        .string('Enter an ingredient name')
        .required('Name is required'),
    ingredientprice: yup
        .number('Enter an ingredient price')
        .min(0, 'Price should be greater or equal to 0')
        .required('Price is required'),
});

export default function UpdateIngredientForm(props) {
    const { selectedRow, ingredients, baseURL } = props;
    const [open, setOpen] = React.useState(false);
    console.log(selectedRow)
    const formik = useFormik({
        initialValues: {
            ingredientid: selectedRow.ingredientid,
            ingredientname: selectedRow.ingredientname,
            ingredientprice: selectedRow.price
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios({
                method: "PUT",
                url: baseURL + "ingredients",
                data: {
                    ingredientid: values.ingredientid,
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
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Update an Ingredient </DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please select an ingredient id and enter a new name and price.
                        </DialogContentText>

                        {/* select an ingredient */}
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <InputLabel id="delete-ingredient-label">Ingredient</InputLabel>
                            <Select
                                labelId="delete-ingredient-label"
                                label="ingredientid"
                                name="ingredientid"
                                id="ingredientid"
                                onChange={formik.handleChange}
                                value={formik.values.ingredientid}
                                MenuProps={MenuProps}
                            >
                                {ingredients.map((ingredient) => (
                                    <MenuItem key={ingredient.ingredientid} value={ingredient.ingredientid}>
                                        {ingredient.ingredientid} - {ingredient.ingredientname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* name */}
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
                            label="Price"
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