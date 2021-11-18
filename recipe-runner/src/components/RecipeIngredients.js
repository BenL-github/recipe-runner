import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import FormDialog
 from './FormDialog';
function RecipeIngredients(props) {
    const { baseURL } = props;

    // RECIPE INGREDIENTS
    const recipeIngredientsColumns = [
        { field: 'recipeID', headerName: 'recipeID', width: 125 },
        { field: 'ingredientID', headername: "ingredientID", width: 150 },
        { field: 'ingredientQuantity', headername: 'ingredientQuantity', width: 200 },
        { field: 'uOm', headerName: "unit of measurement", width: 200 },
        { field: 'recipeTitle', headerName: 'title', width: 200 },
        { field: 'ingredientName', headername: 'ingredientName', width: 200 },
    ]

    const [recipeID, setRecipeID] = useState()
    const [ingredientID, setIngredientID] = useState()
    const [ingredientQuantity, setIngredientQuantity] = useState()
    const [uOm, setUOM] = useState()
    const [recipeIngredientsRows, setRecipeIngredientsRows] = useState([])

    const form = {
        buttonLabel: "Add RecipeIngredient",
        title: "Add an Ingredient to a Recipe",
        text: "Please a valid recipe id, ingredient id, a quantity, and a unit of measurement.",
        inputs: [
            { id: "recipeID", label: "recipeID", type: "number", key: "recipeID", hook: setRecipeID },
            { id: "ingredientID", label: "ingredientID", type: "number", key: "ingredientID", hook: setIngredientID },
            { id: "ingredientQuantity", label: "ingredientQuantity", type: "number", key: "ingredientQuantity", hook: setIngredientQuantity },
            { id: "uOm", label: "uOm", type: "text", key: "uOm", hook: setUOM }
        ]
    }

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
    const onAdd = () => {
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
                window.location.reload();
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
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', mb: '0.5em' }}>
                <Typography variant='h3'>RecipeIngredients Table</Typography>
                <FormDialog
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
