import * as React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
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

export default function UpdateIngredientForm(props) {
    const { ingredients, baseURL } = props;
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            ingredientid: "",
            ingredientname: "",
            price: ""
        },
        onSubmit: (values) => {
            axios({
                method: "PUT",
                url: baseURL + "ingredients",
                data: {
                    ingredientid: values.ingredientid,
                    ingredientname: values.ingredientname,
                    price: values.price
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
                        />

                        {/* price */}
                        <TextField
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}

                            variant="outlined"
                            margin="dense"
                            sx={{ paddingRight: 2 }}
                            autoFocus
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
}