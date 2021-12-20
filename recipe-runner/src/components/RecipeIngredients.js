import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import SelectDialogRecipeIngredients from './SelectDialogRecipeIngredients';
function RecipeIngredients(props) {
    const { baseURL } = props;

    // RECIPE INGREDIENTS
    const recipeIngredientsColumns = [
        { field: 'recipeid', headerName: 'recipeID', width: 125 },
        { field: 'ingredientid', headername: "ingredientID", width: 150 },
        { field: 'quantity', headername: 'quantity', width: 200 },
        { field: 'uom', headerName: "unit of measurement", width: 200 },
        { field: 'recipetitle', headerName: 'title', width: 200 },
        { field: 'ingredientname', headername: 'ingredientName', width: 200 },
    ]

    const [recipeIngredientsRows, setRecipeIngredientsRows] = useState([])
    const [recipes, setRecipes] = useState([])
    const [ingredients, setIngredients] = useState([])

    const form = {
        buttonLabel: "Add RecipeIngredient",
        title: "Add an Ingredient to a Recipe",
        text: "Please a valid recipe id, ingredient id, a quantity, and a unit of measurement.",
        inputs: [
            { recipeData: recipes },
            { ingredientData: ingredients }
        ]
    }

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

    // get request to database on page load
    async function pageSetup() {
        const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
            axios.get(baseURL + "recipeingredients"),
            axios.get(baseURL + "recipes"),
            axios.get(baseURL + "ingredients")
        ])

        addIDs(firstResponse.data)
        setRecipeIngredientsRows(firstResponse.data)
        setRecipes(secondResponse.data)
        setIngredients(thirdResponse.data)
    }

    useEffect(() => {
        pageSetup()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // handle behavior when an ingredient is associated with a recipe
    const onAdd = (recipeID, ingredientID, uOm, quantity) => {
        axios({
            method: "POST",
            url: baseURL + 'recipeingredients',
            data: {
                recipeID: recipeID,
                ingredientID: ingredientID,
                uOm: uOm,
                quantity: quantity
            }
        })
            .then((response) => {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    return (
        <>
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', mb: '0.5em' }}>
                <Typography variant='h3'>RecipeIngredients Table</Typography>
                <SelectDialogRecipeIngredients
                    buttonLabel={form.buttonLabel}
                    title={form.title}
                    text={form.text}
                    submitAction={onAdd}
                    inputs={form.inputs}
                    sx={{ m: '1em' }}
                />
            </Container>
            <Tables columns={recipeIngredientsColumns} rows={recipeIngredientsRows} rowIDTitle={"muiID"} />
        </>
    )
}

export default RecipeIngredients
