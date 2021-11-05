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

    const [recipeID, setRecipeID] = useState()
    const [ingredientID, setIngredientID] = useState()
    const [ingredientQuantity, setIngredientQuantity] = useState()
    const [uom, setUOM] = useState()

    // handle behavior when an ingredient is associated with a recipe
    const onIngredientAdd = () => {
        // query database to get valid recipe and ingredient IDs
        // if valid, add to database and update display

        // if invalid, alert error message
    }

    // verify that the recipe and ingredient exists
    function validateRecipeIngredient() {

    }

    return (
        <>
            <Typography variant='h2'>RecipeIngredients</Typography>
            <Tables columns={recipe_ingr_columns} rows={recipe_ingr_rows} />

            {/* Associate ingredients with recipes */}
            <Typography variant='h3'>Add Ingredients to a Recipe</Typography>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='Recipe ID#' variant='outlined'
                            onChange={(e) => setRecipeID(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='Ingredient ID#' variant='outlined'
                            onChange={(e) => setIngredientID(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='Ingredient Quantity' variant='outlined'
                            onChange={(e) => setIngredientQuantity(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='Unit of Measurement' variant='outlined'
                            onChange={(e) => setUOM(e.target.value)} />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined" onClick={onIngredientAdd}> Add Ingredient to Recipe </Button>
                    </Grid>
                </Grid>
        </>
    )
}

export default RecipeIngredients
