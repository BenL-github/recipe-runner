import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import Tables from './Tables'
import AddRecipeForm from './Forms/Recipes/AddRecipeForm';
import DeleteRecipeForm from './Forms/Recipes/DeleteRecipeForm';
import UpdateRecipeForm from './Forms/Recipes/UpdateRecipeForm';

function Recipes(props) {
    const { baseURL } = props;
    const [keyword, setKeyword] = useState("")
    const [recipeRows, setRecipeRows] = useState([])
    const [selectedRow, setSelectedRow] = useState([]);

    const recipeColumns = [
        { field: 'recipeid', headerName: 'recipeID', width: 150 },
        { field: 'recipetitle', headerName: 'recipeTitle', width: 200 },
        { field: 'recipeserving', headerName: 'recipeServing', width: 150 },
        { field: 'recipedescription', headerName: 'recipeDescription', width: 500 },
    ];

    // get request to database on page load
    useEffect(() => {
        axios
            .get(baseURL + "recipes")
            .then((response) => {
                setRecipeRows(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // behavior when user searches for a recipe
    const onSearch = () => {
        axios({
            method: "GET",
            url: baseURL + `recipes/`,
            params: {
                keyword: keyword
            },
        })
            .then((res) => {
                if (res.data.length > 0) {
                    setRecipeRows(res.data);
                } else {
                    setRecipeRows([]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleCellClick = (e) => {
        setSelectedRow(e);
    }

    return (
        <>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant='h3'>Recipes Table</Typography>
            </Container>
            <Container disableGutters sx={{ width: 'auto', display: 'flex', justifyContent: 'center', my: '1.5em' }}>

                {/* Search */}
                <TextField
                    id='outlined-basic'
                    size="small"
                    label='Search Title'
                    variant='outlined'
                    onBlur={(e) => setKeyword(e.target.value)}
                    sx={{ marginLeft: '1em', my: 'auto' }}
                />
                <Button
                    variant="outlined"
                    onClick={onSearch}
                    sx={{ marginLeft: '1em', my: 'auto' }}
                >Search</Button>

                {/* Add Recipe */}
                <AddRecipeForm baseURL={baseURL} />
                {/*  Modify Recipe */}
                <UpdateRecipeForm selectedRow={selectedRow} baseURL={baseURL} recipes={recipeRows} />
                {/* Delete Recipe */}
                <DeleteRecipeForm selectedRow={selectedRow} baseURL={baseURL} recipes={recipeRows} />


            </Container>

            <Tables density="comfortable" columns={recipeColumns} rows={recipeRows}  onCellClick={handleCellClick} rowIDTitle={"recipeid"} />
        </>
    )
}

export default Recipes
