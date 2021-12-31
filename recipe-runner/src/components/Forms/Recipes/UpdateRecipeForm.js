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

export default function UpdateRecipeForm(props) {
    const { recipes, baseURL } = props;
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            recipeid: "",
            recipetitle: "",
            recipeserving: "",
            recipedescription: ""
        },
        onSubmit: (values) => {
            axios({
                method: "PUT",
                url: baseURL + "recipes",
                data: {
                    recipeid: values.recipeid,
                    recipetitle: values.recipetitle,
                    recipeserving: values.recipeserving,
                    recipedescription: values.recipedescription
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
                    <DialogTitle>Update a Recipe </DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please select a recipe that will be updated and a new serving size & description
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

                        {/* title */}
                        <TextField
                            id="recipetitle"
                            name="recipetitle"
                            label="Recipe Title"
                            type="text"
                            value={formik.values.recipetitle}
                            onChange={formik.handleChange}

                            variant="outlined"
                            margin="dense"
                            sx={{ paddingRight: 2 }}
                            autoFocus
                        />

                        {/* serving */}
                        <TextField
                            id="recipeserving"
                            name="recipeserving"
                            label="Recipe Serving"
                            type="number"
                            value={formik.values.recipeserving}
                            onChange={formik.handleChange}

                            variant="outlined"
                            margin="dense"
                            sx={{ paddingRight: 2 }}
                            autoFocus
                        />
                        
                        {/* description */}
                        <TextField
                            id="recipedescription"
                            name="recipedescription"
                            label="Recipe Description"
                            type="text"
                            
                            value={formik.values.recipedescription}
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