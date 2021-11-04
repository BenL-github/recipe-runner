import { useState } from 'react';
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function SelectedRecipes() {
    // SELECTED RECIPES
    const selected_recipe_columns = [
        // should be pulled from shopping carts
        { field: 'id', headerName: 'cartID', width: 75 },
        { field: 'recipeID', headername: 'recipeID', width: 100 },
        // should be pulled from recipes
        { field: 'selectedQuantity', headername: 'selectedQuantity', width: 200 }
    ]

    const selected_recipe_rows = [
        { id: 1, recipeID: 1, selectedQuantity: 1 },
        { id: 2, recipeID: 2, selectedQuantity: 3 },
        { id: 3, recipeID: 4, selectedQuantity: 2 },
        { id: 3, recipeID: 2, selectedQuantity: 2 },
    ]

    const [cartID, setCartID] = useState()
    const [recipeID, setRecipeID] = useState()
    const [recipeQuantity, setRecipeQuantity] = useState()

    // handles behavior when a new recipe is added to the cart
    const onNewSelectedRecipe = () => {
        // query database for recipe IDs and userIDs 
        // if valid cart and recipe append to display rows

        // if invalid, error message
    }

    // verify that the cart and recipe exists and the quantity added is greater than 1
    function validateCart() {
        // use the same logic here as in shopping carts
    }

    return (
        <>
            <Typography variant='h2'>SelectedRecipes</Typography>
            <Tables columns={selected_recipe_columns} rows={selected_recipe_rows} />

            {/* Insert new selected recipe (associate recipe with shopping cart) */}
            <Typography variant='h3'>Create a New Shopping Cart</Typography>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='CartID#' variant='outlined'
                            onChange={(e) => setCartID(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='RecipeID#' variant='outlined'
                            onChange={(e) => setRecipeID(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='Recipe Quantity' variant='outlined'
                            onChange={(e) => setRecipeQuantity(e.target.value)} />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined" onClick={onNewSelectedRecipe}> Add Recipe to Cart </Button>
                    </Grid>
                </Grid>
        </>
    )
}

export default SelectedRecipes
