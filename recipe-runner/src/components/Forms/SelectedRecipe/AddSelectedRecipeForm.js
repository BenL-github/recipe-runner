import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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

export default function AddSelectedRecipeForm(props) {
    const { baseURL } = props;
    const [open, setOpen] = React.useState(false);

    // retrieves the recipe and ingredient ids for select input
    const [recipes, setRecipes] = useState([]);
    const [shoppingCarts, setShoppingCarts] = useState([]);
    async function getData() {
        const [firstResponse, secondResponse] = await Promise.all([
            axios.get(baseURL + "recipes"),
            axios.get(baseURL + "shoppingcarts")
        ]);
        setRecipes(firstResponse.data)
        setShoppingCarts(secondResponse.data)
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formik = useFormik({
        initialValues: {
            recipeid: '',
            cartid: '',
            quantity: ''
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            axios({
                method: "POST",
                url: baseURL + "selectedrecipes",
                data: {
                    recipeid: values.recipeid,
                    cartid: values.cartid,
                    quantity: values.quantity
                }
            })
                .then((res) => window.location.reload())
                .catch((err) => console.log(err))
        },
    });

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
                    <DialogTitle>Add a Recipe Ingredient</DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{ marginBottom: 2 }}>
                            Please enter a valid (recipeid, cartid) pair that does not already exist.
                            Additionally, please enter a quantity for the selectedrecipe.
                        </DialogContentText>

                        {/* Select cart */}
                        <FormControl fullWidth sx={{ my: 2 }}>

                            <InputLabel id="add-cart-label">cartID</InputLabel>
                            <Select
                                labelId="add-cart-label"
                                id="cartid"
                                name="cartid"
                                label="cartid"
                                onChange={formik.handleChange}
                                value={formik.values.cartid}
                                MenuProps={MenuProps}
                            >
                                {shoppingCarts.map((cart) => (
                                    <MenuItem key={cart.cartid} value={cart.cartid}>
                                        {cart.cartid}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Select recipe */}
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <InputLabel id="add-recipe-label">recipeID</InputLabel>
                            <Select
                                labelId="add-recipe-label"
                                id="recipeid"
                                name="recipeid"
                                label="RecipeID"
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

                        {/* quantity entry */}
                        <TextField
                            type="text"
                            margin="dense"
                            id="quantity"
                            name="quantity"
                            label="quantity"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
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
};