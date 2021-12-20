import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography } from '@mui/material';
import UpdateFormDialog from './UpdateFormDialog';
import Container from '@mui/material/Container';
import Form from './Forms/Form';
import AddIngredientForm from './Forms/Ingredients/AddIngredientForm';
import DeleteIngredientForm from './Forms/Ingredients/DeleteIngredientForm';

export default function Ingredients(props) {
    const { baseURL } = props;

    // INGREDIENTS
    const ingredientColumns = [
        { field: 'ingredientid', headerName: 'ingredientID', width: 150 },
        { field: 'ingredientname', headerName: 'ingredientName', width: 200 },
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

    const [ingredientID, setIngredientID] = useState('')
    const [ingredientName, setIngredientName] = useState("")
    const [ingredientPrice, setIngredientPrice] = useState()
    const [ingredientRows, setIngredientRows] = useState([])

    const onDelete = () => {
        axios({
            method: "DELETE",
            url: baseURL + 'ingredients',
            data: {
                id: ingredientID
            }
        })
            .then((res) => {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error)
            })
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
                    
                    {/* Add Ingredient */}
                    <Form
                        buttonLabel="Add Ingredient"
                        title="Add a New Ingredient"
                        text="Please enter an ingredient name and price"
                        submitAction={onAdd}
                    >
                        <AddIngredientForm 
                            setIngredientName={setIngredientName} 
                            setIngredientPrice={setIngredientPrice}
                        />
                    </Form>
                    
                    {/* Delete Ingredient */}
                    <Form
                        buttonLabel="Delete Ingredient"
                        title="Delete an Ingredient"
                        text="Please select an ingredient to be deleted"
                        submitAction={onDelete}
                    >
                        <DeleteIngredientForm
                            setIngredientID={setIngredientID}
                            ingredients={ingredientRows}
                            value={ingredientID}
                         />
                    </Form>
                </Container>
            </Container>

            <Tables columns={ingredientColumns} rows={ingredientRows} rowIDTitle={"ingredientid"} />


        </>
    )
}


