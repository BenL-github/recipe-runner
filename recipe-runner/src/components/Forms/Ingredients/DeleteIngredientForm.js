import * as React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
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

export default function DeleteIngredientForm(props) {
    const { ingredients, baseURL } = props;
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            ingredientid: ""
        },
        onSubmit: (values) => {
            axios({
                method: "DELETE",
                url: baseURL + "ingredients",
                data: {
                    ingredientid: values.ingredientid
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
                    <DialogTitle>Delete an Ingredient </DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please select an ingredient that will be deleted
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