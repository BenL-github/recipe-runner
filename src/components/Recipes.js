import { useState } from 'react';
import Tables from './Tables'
import RecipeInput from './RecipeInput'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function Recipes() {
    const [keyword, setKeyword] = useState("")
    const [isResults, setIsResults] = useState(false)
    const [isNoResults, setIsNoResults] = useState(false)
    const [searchRows, setSearchRows] = useState([])

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

    // behavior when user adds a new recipe
    const onNewRecipe = ({ title, serving, description }) => {
        // will be a PUT to the database
        const new_recipe = { id: Math.floor(Math.random() * 10000), recipeTitle: title, recipeServing: serving, recipeDescription: description }
        set_recipe_rows([...recipe_rows, new_recipe])

    }

    // behavior when user searches for a recipe
    const onSearch = () => {
        // query database for matching SELECT
        // const someFuncHere
        let rows = []
        recipe_rows.map((row) => {
            let title = row.recipeTitle.toLowerCase()
            if (title.includes(keyword)) {
                rows.push(row)
                setIsResults(true)
                setIsNoResults(false)
            }
        })

        setSearchRows(rows)

        if (rows.length < 1) {
            setIsNoResults(true)
            setIsResults(false)
        }
    }

    return (
        <>
            <Typography variant='h2'>Recipes</Typography>
            <Tables columns={recipe_columns} rows={recipe_rows} />
            <Typography variant='h3'>Enter New Recipe</Typography>
            <RecipeInput buttonText={'Create New Recipe'} onNewRecipe={onNewRecipe} />
            <Typography variant='h3'>Search for a Recipe</Typography>

            {/* Search Field */}
            <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid item>
                    <TextField id='outlined-basic' label='Title Keyword' variant='outlined'
                        onChange={(e) => setKeyword(e.target.value)} />
                </Grid>
                <Grid item sx={{ my: 'auto' }}>
                    <Button variant="outlined" onClick={onSearch}> Search </Button>
                </Grid>
            </Grid>

            {/* No Matching Results */}
            {isNoResults && <>
                <Typography variant='h4'>Search Results</Typography>
                <Typography variant='p'>{`No recipes with the keyword "${keyword}"; try again with a different keyword or add a new recipe!`}</Typography>
            </>}

            {/* Results Found! */}
            {isResults && <>
                <Typography variant="h4">Search Results</Typography>
                <Tables columns={recipe_columns} rows={searchRows} />
            </>}

        </>
    )
}

export default Recipes
