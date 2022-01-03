import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography, Container, TextField, Button } from '@mui/material';
import AddRecipeIngredientForm from './Forms/RecipeIngredients/AddRecipeIngredientForm.js';
import UpdateRecipeIngredientForm from './Forms/RecipeIngredients/UpdateRecipeIngredientForm';
import DeleteRecipeIngredientForm from './Forms/RecipeIngredients/DeleteRecipeIngredientForm.js';

// table columns
const recipeIngredientsColumns = [
    { field: 'recipeid', headerName: 'recipeID', width: 125 },
    { field: 'ingredientid', headername: "ingredientID", width: 150 },
    { field: 'quantity', headername: 'quantity', width: 200 },
    { field: 'uom', headerName: "unit of measurement", width: 200 },
    { field: 'ingredientname', headername: 'ingredientName', width: 200 },
    { field: 'recipetitle', headerName: 'recipeTitle', width: 200 },
]

function RecipeIngredients(props) {
    const { baseURL } = props;
    const [recipeIngredientsRows, setRecipeIngredientsRows] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [selectedRow, setSelectedRow] = useState([]);
    // add mui placeholder ids

    const addIDs = (data) => {
        let i = 0
        data.forEach((object) => {
            // if recipe is null, fill out cell with "null"
            if (!object["recipeid"]) {
                object["recipeid"] = "null"
            }

            object["muiID"] = i
            i++
        })
    }

    const handleCellClick = (e) => {
        setSelectedRow(e);
    }

    const handleSearch = () => {
        axios({
            method: "GET",
            url: baseURL + "recipeingredients",
            params: {
                keyword: keyword
            }
        })
            .then((res) => {
                addIDs(res.data)
                setRecipeIngredientsRows(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        axios.get(baseURL + "recipeingredients")
            .then((res) => {
                addIDs(res.data)
                setRecipeIngredientsRows(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant='h3'>RecipeIngredients Table</Typography>
            </Container>
            <Container disableGutters sx={{ width: 'auto', display: 'flex', justifyContent: 'center', my: '1.5em' }}>
                <TextField
                    id='outlined-basic'
                    size="small"
                    label='Search recipetitle'
                    variant='outlined'
                    onBlur={(e) => setKeyword(e.target.value)}
                    sx={{ marginLeft: '1em', my: 'auto' }}
                />
                <Button
                    variant="outlined"
                    onClick={handleSearch}
                    sx={{ marginLeft: '1em', my: 'auto' }}
                >Search</Button>
                <AddRecipeIngredientForm baseURL={baseURL} />
                <UpdateRecipeIngredientForm selectedRow={selectedRow} baseURL={baseURL} />
                <DeleteRecipeIngredientForm selectedRow={selectedRow} baseURL={baseURL} />
            </Container>
            <Tables columns={recipeIngredientsColumns} rows={recipeIngredientsRows} onCellClick={handleCellClick} rowIDTitle={"muiID"} />
        </>
    )
}

export default RecipeIngredients
