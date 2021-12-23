import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography, TextField, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Form from './Forms/Form';
import AddIngredientForm from './Forms/Ingredients/AddIngredientForm';
import DeleteIngredientForm from './Forms/Ingredients/DeleteIngredientForm';
import UpdateIngredientForm from './Forms/Ingredients/UpdateIngredientForm';

export default function Ingredients(props) {
    const { baseURL } = props;

    // INGREDIENTS
    const ingredientColumns = [
        { field: 'ingredientid', headerName: 'ingredientID', width: 150 },
        { field: 'ingredientname', headerName: 'ingredientName', width: 200 },
        { field: 'price', headerName: 'price', type: 'number', width: 90 },
    ];

    const [ingredientid, setIngredientID] = useState("");
    const [ingredientname, setIngredientName] = useState("");
    const [ingredientprice, setIngredientPrice] = useState();
    const [keyword, setKeyword] = useState("");
    const [ingredientRows, setIngredientRows] = useState([]);

    // get request to database on page load
    useEffect(() => {
        axios
            .get(baseURL + "ingredients")
            .then((res) => {
                setIngredientRows(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onSearch = () => {
        axios({
            method: "GET",
            url: baseURL + 'ingredients',
            params: {
                keyword: keyword
            }
        })
            .then((res) => {
                if (res.data.length > 0) {
                    console.log(res.data);
                    setIngredientRows(res.data);
                } else {
                    setIngredientRows([]);
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // handles add behavior
    const onAdd = () => {
        axios({
            method: "POST",
            url: baseURL + "ingredients",
            data: {
                name: ingredientname,
                price: ingredientprice
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
                name: ingredientname,
                price: ingredientprice,
                id: ingredientid
            }
        })
            .then((response) => window.location.reload())
            .catch((err) => console.log(err))
    }

    const onDelete = () => {
        axios({
            method: "DELETE",
            url: baseURL + 'ingredients',
            data: {
                id: ingredientid
            }
        })
            .then((res) => {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant='h3'>Ingredients Table</Typography>
            </Container>
            
                
                <Container disableGutters sx={{ width: 'auto', display: 'flex', justifyContent: 'center', my: '1.5em' }}>
                    
                    {/* Search Ingredient */}
                    <TextField
                        id='outlined-basic'
                        size="small"
                        label='Search Title'
                        variant='outlined'
                        onChange={(e) => setKeyword(e.target.value)}
                        sx={{ marginLeft: '1em', my: 'auto' }}
                    />
                    <Button
                        variant="outlined"
                        onClick={onSearch}
                        sx={{ marginLeft: '1em', my: 'auto' }}
                    >Search</Button>

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

                    {/* Update Ingredient */}
                    <Form
                        buttonLabel="Update Ingredient"
                        title="Update an existing Ingredient"
                        text="Please a new name and price"
                        submitAction={onModify}
                    >
                        <UpdateIngredientForm
                            setIngredientID={setIngredientID}
                            setIngredientName={setIngredientName}
                            setIngredientPrice={setIngredientPrice}
                            ingredients={ingredientRows}
                            value={ingredientid}
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
                            value={ingredientid}
                        />
                    </Form>
                </Container>
            

            <Tables columns={ingredientColumns} rows={ingredientRows} rowIDTitle={"ingredientid"} />


        </>
    )
}


