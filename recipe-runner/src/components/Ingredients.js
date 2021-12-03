import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography } from '@mui/material';
import FormDialog from './FormDialog';
import UpdateFormDialog from './UpdateFormDialog';
import Container from '@mui/material/Container';

function Ingredients(props) {
    const { baseURL } = props;

    // INGREDIENTS
    const ingredientColumns = [
        { field: 'ingredientID', headerName: 'ingredientID', width: 150 },
        { field: 'ingredientName', headerName: 'ingredientName', width: 200 },
        { field: 'price', headerName: 'price', type: 'number', width: 90 },
        {
            field: 'action', headerName: 'action', width: 150,
            renderCell: (params) => (
                <UpdateFormDialog
                    rowParams={params}
                    submitAction={onModify}
                    sx={{ marginLeft: '1em' }}
                />
            )
        },
    ];

    const [ingredientName, setIngredientName] = useState("")
    const [ingredientPrice, setIngredientPrice] = useState()
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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
    const onModify = (name, price, id) => {
        axios({
            method: "PUT",
            url: baseURL + "ingredients",
            data: {
                name: name,
                price: price,
                id: id
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
                <Container disableGutters sx={{ width: 'auto', marginRight: 0, marginLeft: 0, display: 'flex', justifyContent: 'space-around', px: 0 }}>
                    <FormDialog
                        buttonLabel={add_form.buttonLabel}
                        title={add_form.title}
                        text={add_form.text}
                        submitAction={onAdd}
                        inputs={add_form.inputs}
                    />
                </Container>
            </Container>

            <Tables columns={ingredientColumns} rows={ingredientRows} rowIDTitle={"ingredientID"} />


        </>
    )
}

export default Ingredients
