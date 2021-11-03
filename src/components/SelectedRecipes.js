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

    return (
        <>
            <Typography variant='h2'>SelectedRecipes</Typography>
            <Tables columns={selected_recipe_columns} rows={selected_recipe_rows} />
        </>
    )
}

export default SelectedRecipes
