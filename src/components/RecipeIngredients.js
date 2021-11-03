import { useState } from 'react';
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function RecipeIngredients() {
    // RECIPE INGREDIENTS
    const recipe_ingr_columns = [
        { field: 'id', headerName: 'recipeID', width: 125 },
        { field: 'ingredientID', headername: "ingredientID", width: 125 },
        // pull from recipes
        // pull from ingredients
        { field: 'ingredientQuantity', headername: 'ingredientQuantity', width: 200 },
        { field: 'uom', headerName: "unit of measurement", width: 200 },
    ]

    const recipe_ingr_rows = [
        { id: 1, ingredientID: 1, ingredientQuantity: 5, uom: "g" },
        { id: 2, ingredientID: 1, ingredientQuantity: 6, uom: 'tsp' },
        { id: 3, ingredientID: 3, ingredientQuantity: 6, uom: 'tsp' },
        { id: 4, ingredientID: 4, ingredientQuantity: 2, uom: 'tbsp' },
    ]

    return (
        <>
            <Typography variant='h2'>RecipeIngredients</Typography>
            <Tables columns={recipe_ingr_columns} rows={recipe_ingr_rows} />
        </>
    )
}

export default RecipeIngredients
