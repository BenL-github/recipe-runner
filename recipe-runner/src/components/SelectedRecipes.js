import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import axios from 'axios';
import SelectDialogSelectedRecipes from './SelectDialogSelectedRecipes';
import Tables from './Tables';
import AddSelectedRecipeForm from './Forms/SelectedRecipe/AddSelectedRecipeForm'

function SelectedRecipes(props) {
    const { baseURL } = props;

    // SELECTED RECIPES
    const selectedRecipeColumns = [
        { field: 'cartid', headerName: 'cartID', width: 150 },
        { field: 'recipeid', headerName: 'recipeID', width: 150 },
        { field: 'fname', headerName: 'Cart Owner', width: 200 },
        { field: 'recipetitle', headerName: 'Title', width: 200 },
        { field: 'quantity', headername: 'quantity', width: 200 }
    ];

    const [selectedRecipeRows, setSelectedRecipeRows] = useState([]);
    const [carts, setCarts] = useState([])
    const [recipes, setRecipes] = useState([])

    const form = {
        buttonLabel: "Add SelectedRecipe",
        title: "Add New Recipe to a Cart",
        text: "Select a cart, recipe, and quantity of recipes to add to selected cart.",
        inputs: [
            { cartData: carts },
            { recipeData: recipes },
        ]
    };

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
            object["fullname"] = `${object.fName} ${object.lName}`
        })
    };

    // get request to database on page load
    async function pageSetup() {
        const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
            axios.get(baseURL + "shoppingcarts"),
            axios.get(baseURL + "recipes"),
            axios.get(baseURL + "selectedRecipes")
        ])
        addIDs(thirdResponse.data)
        setCarts(firstResponse.data)
        setRecipes(secondResponse.data)
        setSelectedRecipeRows(thirdResponse.data)
        console.log(thirdResponse.data)

    }

    useEffect(() => {
        pageSetup()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // add 
    const onAdd = (cartID, recipeID, quantity) => {
        axios({
            method: "POST",
            url: baseURL + "selectedrecipes",
            data: {
                cartID: cartID,
                recipeID: recipeID,
                quantity: quantity
            }
        })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant='h3'>SelectedRecipes Table</Typography>
            </Container>
            <Container disableGutters sx={{ width: 'auto', display: 'flex', justifyContent: 'center', my: '1.5em' }}>
                <AddSelectedRecipeForm baseURL={baseURL}/>
            </Container>
            <Tables columns={selectedRecipeColumns} rows={selectedRecipeRows} rowIDTitle={"muiID"} />
        </>
    )
}

export default SelectedRecipes
