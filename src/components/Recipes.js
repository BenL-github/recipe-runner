import { useState } from 'react';
import Tables from './Tables'
import RecipeInput from './RecipeInput'
import { Typography } from '@mui/material';

function Recipes() {
    // RECIPES
    // behavior when user adds a new recipe
    const onNewRecipe = ({ title, serving, description }) => {
        // will be a PUT to the database
        const new_recipe = { id: Math.floor(Math.random() * 10000), recipeTitle: title, recipeServing: serving, recipeDescription: description }
        set_recipe_rows([...recipe_rows, new_recipe])

    }

    const recipe_columns = [
        { field: 'id', headerName: 'recipeID', width: 150 },
        { field: 'recipeTitle', headerName: 'recipeTitle', width: 200 },
        { field: 'recipeServing', headerName: 'recipeServing', type: 'number', width: 150 },
        { field: 'recipeDescription', headerName: 'recipeDescription', width: 800 },
    ];

    // using state here to update web page when user adds or deletes a recipe
    const [recipe_rows, set_recipe_rows] = useState([
        { id: 1, recipeTitle: 'Chicken Parmesan', recipeServing: 3, recipeDescription: 'mmm it taste good' },
        { id: 2, recipeTitle: 'Chicken Noodle Soup', recipeServing: 8, recipeDescription: 'good soup' },
        { id: 3, recipeTitle: 'Chicken Tikka Masala', recipeServing: 5, recipeDescription: 'mmm it taste good' },
        { id: 4, recipeTitle: 'Chicken Dumpling', recipeServing: 2, recipeDescription: 'mmm it taste good' },
    ]);

    return (
        <>
            <Typography variant='h2'>Recipes</Typography>
            <Tables columns={recipe_columns} rows={recipe_rows} />
            <RecipeInput buttonText={'Create New Recipe'} onNewRecipe={onNewRecipe} />
        </>
    )
}

export default Recipes
