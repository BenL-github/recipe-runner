import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography, Container } from '@mui/material';
import AddRecipeIngredientForm from './Forms/RecipeIngredients/AddRecipeIngredientForm';

// table columns
const recipeIngredientsColumns = [
    { field: 'recipeid', headerName: 'recipeID', width: 125 },
    { field: 'ingredientid', headername: "ingredientID", width: 150 },
    { field: 'quantity', headername: 'quantity', width: 200 },
    { field: 'uom', headerName: "unit of measurement", width: 200 },
    { field: 'recipetitle', headerName: 'title', width: 200 },
    { field: 'ingredientname', headername: 'ingredientName', width: 200 },
]

function RecipeIngredients(props) {
    const { baseURL } = props;
    const [recipeIngredientsRows, setRecipeIngredientsRows] = useState([])

    // add mui placeholder ids
    const addIDs = (data) => {
        let i = 0
        data.forEach((object) => {
            // if recipe is null, fill out cell with "null"
            if(!object["recipeid"]){
                object["recipeid"] = "null"
            }
            object["muiID"] = i
            i++
        })
    }

    useEffect(() => {
        axios.get(baseURL + "recipeingredients")
            .then((res) => {
                addIDs(res.data)
                setRecipeIngredientsRows(res.data)
            })
            .catch((err) => console.log(err))
    })

    return (
        <>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant='h3'>Recipes Table</Typography>
            </Container>
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'center', width: '95%', my: '1.5em' }}>
                <AddRecipeIngredientForm baseURL={baseURL}/>
            </Container>
            <Tables columns={recipeIngredientsColumns} rows={recipeIngredientsRows} rowIDTitle={"muiID"} />
        </>
    )
}

export default RecipeIngredients
