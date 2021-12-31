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

export default function DeleteRecipeForm(props) {
    const { recipes, baseURL } = props;
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            recipeid: ""
        },
        onSubmit: (values) => {
            axios({
                method: "DELETE",
                url: baseURL + "recipes",
                data: {
                    recipeid: values.recipeid
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
                    <DialogTitle>Delete a Recipe </DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please select a recipe that will be deleted
                        </DialogContentText>

                        {/* select a recipe */}
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <InputLabel id="delete-recipe-label">Recipe</InputLabel>
                            <Select
                                labelId="delete-recipe-label"
                                label="recipeID"
                                name="recipeid"
                                id="recipeid"
                                onChange={formik.handleChange}
                                value={formik.values.recipeid}
                                MenuProps={MenuProps}
                            >
                                {recipes.map((recipe) => (
                                    <MenuItem key={recipe.recipeid} value={recipe.recipeid}>
                                        {recipe.recipeid} - {recipe.recipetitle}
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