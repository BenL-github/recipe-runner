import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography } from '@mui/material';
import FormDialog from './FormDialog';
import Container from '@mui/material/Container';

function Ingredients() {
    const baseURL = "http://localhost:34876/"

    // INGREDIENTS
    const ingredientColumns = [
        { field: 'ingredientID', headerName: 'ingredientID', width: 150 },
        { field: 'ingredientName', headerName: 'ingredientName', width: 200 },
        { field: 'price', headerName: 'price', type: 'number', width: 90 }
    ];

    const [ingredientName, setIngredientName] = useState("")
    const [ingredientPrice, setIngredientPrice] = useState()
    const [ingredientID, setIngredientID] = useState()
    const [ingredientRows, setIngredientRows] = useState([])

    const add_form = {
        buttonLabel: "Add Ingredient",
        title: "Add New Ingredient",
        text: "Please enter an ingredient name and a valid price.",
        inputs: [
            { id: "ingredientName", label: "ingredientName", type: "text", key: "ingredientName", hook: setIngredientName },
            { id: "ingredientPrice", label: "ingredientPrice", type: "number", key: "ingredientPrice", hook: setIngredientPrice }
        ]
    }

    const update_form = {
        buttonLabel: "Update Ingredient",
        title: "Update Ingredient",
        text: "Please a valid ingredient id along with changes.",
        inputs: [
            { id: "ingredientID", label: "ingredientID", type: "number", key: "ingredientID", hook: setIngredientID },
            { id: "ingredientName", label: "ingredientName", type: "text", key: "ingredientName", hook: setIngredientName },
            { id: "ingredientPrice", label: "ingredientPrice", type: "number", key: "ingredientPrice", hook: setIngredientPrice }
        ]
    }

    // get request to database on page load
    useEffect(() => {
        axios
            .get(baseURL + "ingredients")
            .then((response) => {
                setIngredientRows(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    // handles add behavior
    const onAdd = () => {
        axios({
            method: "POST",
            url: baseURL + "ingredients",
            data: {
                name: ingredientName,
                price: ingredientPrice
            }
        })
            .then((response) => {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // handles modify behavior
    const onModify = () => {
        axios({
            method: "PUT",
            url: baseURL + "ingredients",
            data: {
                name: ingredientName,
                price: ingredientPrice,
                id: ingredientID
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
                <Typography variant='h3'>Ingredients Table</Typography>
                <Container disableGutters sx={{width:'auto', marginRight: 0, marginLeft: 0, display:'flex', justifyContent: 'space-around', px:0}}>
                    <FormDialog
                        buttonLabel={add_form.buttonLabel}
                        title={add_form.title}
                        text={add_form.text}
                        submitAction={onAdd}
                        inputs={add_form.inputs}
                    />
                    <FormDialog
                        buttonLabel={update_form.buttonLabel}
                        title={update_form.title}
                        text={update_form.text}
                        submitAction={onModify}
                        inputs={update_form.inputs}
                        sx={{ marginLeft:'1em'}}
                    />
                </Container>
            </Container>

            <Tables columns={ingredientColumns} rows={ingredientRows} rowIDTitle={"ingredientID"} />


        </>
    )
}

export default Ingredients
