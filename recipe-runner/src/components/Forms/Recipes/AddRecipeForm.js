import * as React from "react";
import { TextField, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useFormik } from 'formik';
import axios from "axios";

export default function AddRecipeForm(props) {
    const { baseURL } = props;
    const [open, setOpen] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            recipetitle: "",
            recipeserving: "",
            recipedescription: "",
        },
        onSubmit: (values) => {
            axios({
                method: "POST",
                url: baseURL + "recipes",
                data: {
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
                Add
            </Button>

            <Dialog open={open} onclose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Add a Recipe</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please enter a recipe title, serving size, and description.
                        </DialogContentText>

                        {/* Recipe title */}
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