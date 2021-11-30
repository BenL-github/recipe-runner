import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import axios from 'axios';
import FormDialog from './FormDialog';
import Tables from './Tables';

function SelectedRecipes(props) {
    const { baseURL } = props;

    // SELECTED RECIPES
    const selectedRecipeColumns = [
        { field: 'selectedCart', headerName: 'selectedCart', width: 200 },
        { field: 'selectedRecipe', headername: 'selectedRecipe', width: 200 },
        { field: 'selectedQuantity', headername: 'selectedQuantity', width: 200 }
    ];

    const [selectedCart, setCartID] = useState();
    const [selectedRecipe, setRecipeID] = useState();
    const [selectedQuantity, setSelectedQuantity] = useState();
    const [selectedRecipeRows, setSelectedRecipeRows] = useState([]);

    const form = {
        buttonLabel: "Add SelectedRecipe",
        title: "Add New Recipe to a Cart",
        text: "Please enter a valid cart ID and valid recipe ID in addition to the quantity.",
        inputs: [
            { id: "selectedCart", label: "selectedCart", type: "number", key: "selectedCart", hook: setCartID },
            { id: "selectedRecipe", label: "selectedRecipe", type: "number", key: "selectedRecipe", hook: setRecipeID },
            { id: "selectedQuantity", label: "quantity", type: "number", key: "selectedQuantity", hook: setSelectedQuantity }
        ]
    };

    // add mui placeholder ids
    const addIDs = (data) => {
        let i = 0
        data.map((object) => {
            // if recipe is null, fill out cell with "null"
            if(!object["selectedRecipe"]){
                object["selectedRecipe"] = "null"
            }
            object["muiID"] = i
            i++
        })
    };

    // get request to database on page load
    useEffect(() => {
        axios
            .get(baseURL + 'selectedrecipes')
            .then((response) => {
                let data = response.data;
                console.log(data)
                addIDs(data);
                setSelectedRecipeRows(data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // add 
    function onAdd(){
        axios({
            method: "POST",
            url: baseURL + "selectedrecipes",
            data: {
                selectedCart: selectedCart,
                selectedRecipe: selectedRecipe,
                selectedQuantity: selectedQuantity
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
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', mb: '0.5em' }}>
                <Typography variant='h3'>SelectedRecipes Table</Typography>
                <FormDialog
                    buttonLabel={form.buttonLabel}
                    title={form.title}
                    text={form.text}
                    submitAction={onAdd}
                    inputs={form.inputs}
                    sx={{ m: '1em' }}
                />
            </Container>
            <Tables columns={selectedRecipeColumns} rows={selectedRecipeRows} rowIDTitle={"muiID"}/>
        </>
    )
}

export default SelectedRecipes
