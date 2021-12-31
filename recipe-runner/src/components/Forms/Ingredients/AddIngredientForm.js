import * as React from "react";
import { TextField, Button} from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { useFormik } from 'formik';
import axios from "axios";

export default function AddIngredientForm(props) {
    const { baseURL } = props;
    const [open, setOpen] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            ingredientname: "",
            ingredientprice: ""
        },
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