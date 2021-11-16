import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function RecipeIngredients() {
    const baseURL = "http://localhost:34876/"

    // RECIPE INGREDIENTS
    const recipeIngredientsColumns = [
        { field: 'recipeID', headerName: 'recipeID', width: 125 },
        { field: 'recipeTitle', headerName: 'title', width: 200 },
        { field: 'ingredientID', headername: "ingredientID", width: 125 },
        { field: 'ingredientName', headername: 'ingredientName', width: 200 },
        { field: 'ingredientQuantity', headername: 'ingredientQuantity', width: 200 },
        { field: 'uOm', headerName: "unit of measurement", width: 200 },
    ]

    const [recipeID, setRecipeID] = useState()
    const [ingredientID, setIngredientID] = useState()
    const [ingredientQuantity, setIngredientQuantity] = useState()
    const [uOm, setUOM] = useState()
    const [recipeIngredientsRows, setRecipeIngredientsRows] = useState([])

    // add mui placeholder ids
    const addIDs = (data) => {
        let i = 0
        data.map((object) => {
            object["muiID"] = i
            i++
        })
    }

    // get request to database on page load
    useEffect(() => {
        axios
            .get(baseURL + 'recipeingredients')
            .then((response) => {
                let data = response.data
                addIDs(data)
                setRecipeIngredientsRows(data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    // handle behavior when an ingredient is associated with a recipe
    const onIngredientAdd = () => {
        axios({
            method: "POST",
            url: baseURL + 'recipeingredients',
            data: {
                recipeID: recipeID,
                ingredientID: ingredientID,
                uOm: uOm,
                quantity: ingredientQuantity
            }
        })
            .then((response) => {
                setRecipeID()
                setIngredientID()
                setUOM()
                setIngredientQuantity()
            })
            .catch(function (error) {
                console.log(error)
                alert("Ingredient or recipe does not exist.")
                setRecipeID()
                setIngredientID()
                setUOM()
                setIngredientQuantity()
            })
    }


    return (
        <>
            <Typography variant='h2'>RecipeIngredients</Typography>
            <Tables columns={recipeIngredientsColumns} rows={recipeIngredientsRows} rowIDTitle={"muiID"} />

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
