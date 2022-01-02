import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import axios from 'axios';
import Tables from './Tables';
import AddSelectedRecipeForm from './Forms/SelectedRecipe/AddSelectedRecipeForm';
import UpdateSelectedRecipeForm from './Forms/SelectedRecipe/UpdateSelectedRecipeForm';
import DeleteSelectedRecipeForm from './Forms/SelectedRecipe/DeleteSelectedRecipeForm';

// SELECTED RECIPES
const selectedRecipeColumns = [
    { field: 'cartid', headerName: 'cartID', width: 150 },
    { field: 'recipeid', headerName: 'recipeID', width: 150 },
    { field: 'fullname', headerName: 'Cart Owner', width: 200 },
    { field: 'recipetitle', headerName: 'Recipe Title', width: 200 },
    { field: 'quantity', headername: 'quantity', width: 200 }
];

function SelectedRecipes(props) {
    const { baseURL } = props;
    const [selectedRecipeRows, setSelectedRecipeRows] = useState([]);
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
            object["fullname"] = `${object.fname} ${object.lname}`
        })
        console.log(data);
    };

    const handleCellClick = (e) => {
        setSelectedRow(e);
    }

    // get request to database on page load
    async function pageSetup() {
        const [thirdResponse] = await Promise.all([
            axios.get(baseURL + "selectedRecipes")
        ])
        addIDs(thirdResponse.data)
        setSelectedRecipeRows(thirdResponse.data)
    }

    useEffect(() => {
        pageSetup()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant='h3'>SelectedRecipes Table</Typography>
            </Container>
            <Container disableGutters sx={{ width: 'auto', display: 'flex', justifyContent: 'center', my: '1.5em' }}>
                <AddSelectedRecipeForm baseURL={baseURL}/>
                <UpdateSelectedRecipeForm selectedRow={selectedRow} baseURL={baseURL} />
                <DeleteSelectedRecipeForm selectedRow={selectedRow} baseURL={baseURL} />
            </Container>
            <Tables columns={selectedRecipeColumns} rows={selectedRecipeRows} onCellClick={handleCellClick} rowIDTitle={"muiID"} />
        </>
    )
}

export default SelectedRecipes
