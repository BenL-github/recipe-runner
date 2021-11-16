import { useState, useEffect } from 'react';
import Tables from './Tables'
import RecipeInput from './RecipeInput'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import RecipeIngredients from './RecipeIngredients';

function Recipes() {
    const baseURL = "http://localhost:34876/"

    // RECIPES
    const [keyword, setKeyword] = useState("")
    const [isResults, setIsResults] = useState(false)
    const [isNoResults, setIsNoResults] = useState(false)
    const [searchRows, setSearchRows] = useState([])
    const [recipeID, setRecipeID] = useState()
    const [recipeRows, setRecipeRows] = useState([])
    const [recipeTitle, setRecipeTitle] = useState()
    const [recipeServing, setRecipeServing] = useState()
    const [recipeDescription, setRecipeDescription] = useState()

    const recipeColumns = [
        { field: 'recipeID', headerName: 'recipeID', width: 150 },
        { field: 'recipeTitle', headerName: 'recipeTitle', width: 200 },
        { field: 'recipeServing', headerName: 'recipeServing', type: 'number', width: 150 },
        { field: 'recipeDescription', headerName: 'recipeDescription', width: 800 },
    ];

    // get request to database on page load
    useEffect(() => {
        axios
            .get(baseURL + "recipes")
            .then((response) => {
                setRecipeRows(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    // behavior when user adds a new recipe
    const onAdd = () => {
        axios({
            method: "POST",
            url: baseURL + "recipes",
            data: {
                title: recipeTitle,
                description: recipeDescription,
                serving: recipeServing
            }
        })
            .then((response) => {
                setRecipeTitle()
                setRecipeDescription()
                setRecipeServing()
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // behavior when user searches for a recipe
    const onSearch = () => {
        // query database for matching SELECT
        // const someFuncHere
        let rows = []
        recipeRows.map((row) => {
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

    // behavior when a user deletes a recipe
    const onDelete = () => {
        // send delete request to database

    }

    return (
        <>
            <Typography variant='h2'>Recipes</Typography>
            <Tables columns={recipeColumns} rows={recipeRows} rowIDTitle={"recipeID"} />

            {/* Add new recipe */}
            <div>
                <Typography variant='h3'>Add New Recipe</Typography>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='Recipe Title' variant='outlined'
                            onChange={(e) => setRecipeTitle(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='Recipe Serving' variant='outlined'
                            onChange={(e) => setRecipeServing(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='Recipe Description' variant='outlined'
                            onChange={(e) => setRecipeDescription(e.target.value)} />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined" onClick={onAdd}> Create New Recipe </Button>
                    </Grid>
                </Grid>
            </div>
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
                <Tables columns={recipeColumns} rows={searchRows} />
            </>}

            {/* Delete a Recipe */}
            <Typography variant="h3"> Delete a Recipe </Typography>
            <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid item>
                    <TextField id='outlined-basic' label='Recipe ID#' variant='outlined'
                        onChange={(e) => setRecipeID(e.target.value)} />
                </Grid>
                <Grid item sx={{ my: 'auto' }}>
                    <Button variant="outlined" onClick={onSearch}> Delete </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Recipes
