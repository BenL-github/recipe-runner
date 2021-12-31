import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography, TextField, Button } from '@mui/material';
import Container from '@mui/material/Container';
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
                <AddIngredientForm baseURL={baseURL} />

                {/* Update Ingredient */}
                <UpdateIngredientForm ingredients={ingredientRows} baseURL={baseURL} />

                {/* Delete Ingredient */}

                <DeleteIngredientForm ingredients={ingredientRows} baseURL={baseURL} />

            </Container>


            <Tables columns={ingredientColumns} rows={ingredientRows} rowIDTitle={"ingredientid"} />


        </>
    )
}


