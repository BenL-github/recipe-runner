import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import Tables from './Tables'
import Form from './Forms/Form';
import AddRecipeForm from './Forms/Recipes/AddRecipeForm';
import DeleteRecipeForm from './Forms/Recipes/DeleteRecipeForm';
import UpdateRecipeForm from './Forms/Recipes/UpdateRecipeForm';

function Recipes(props) {
    const { baseURL } = props;
    const [keyword, setKeyword] = useState("")
    const [recipeid, setRecipeID] = useState(1)
    const [recipeRows, setRecipeRows] = useState([])

    const [recipetitle, setRecipeTitle] = useState()
    const [recipeserving, setRecipeServing] = useState()
    const [recipedescription, setRecipeDescription] = useState()

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

    // behavior when user adds a new recipe
    const onAdd = () => {
        axios({
            method: "POST",
            url: baseURL + "recipes",
            data: {
                title: recipetitle,
                description: recipedescription,
                serving: recipeserving
            }
        })
            .then((response) => {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // update
    const onModify = () => {
        axios({
            method: "PUT",
            url: baseURL + "recipes",
            data: {
                id: recipeid,
                title: recipetitle,
                serving: recipeserving,
                description: recipedescription
            }
        })
            .then((res) => window.location.reload())
            .catch((err) => console.log(err))
    }

    // behavior when a user deletes a recipe
    const onDelete = () => {
        axios({
            method: "DELETE",
            url: baseURL + 'recipes',
            data: {
                id: recipeid
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
                <Form
                    buttonLabel="Add Recipe"
                    title="Add A Recipe"
                    text="Please enter a recipe title, serving size, and description"
                    submitAction={onAdd}
                >
                    <AddRecipeForm
                        setRecipeTitle={setRecipeTitle}
                        setRecipeServing={setRecipeServing}
                        setRecipeDescription={setRecipeDescription}
                    />
                </Form>

                {/* Modify Recipe */}
                <Form
                    buttonLabel="Update Recipe"
                    title="Edit A Recipe"
                    text="Please enter a new recipe title, serving size, and description"
                    submitAction={onModify}
                >
                    <UpdateRecipeForm
                        setRecipeID={setRecipeID}
                        setRecipeTitle={setRecipeTitle}
                        setRecipeServing={setRecipeServing}
                        setRecipeDescription={setRecipeDescription}
                        recipes={recipeRows}
                        value={recipeid}
                    />
                </Form>

                {/*  Delete */}
                <Form
                    buttonLabel="Delete Recipe"
                    title="Delete a Recipe"
                    text="Please select a Recipe to Delete"
                    submitAction={onDelete}
                >
                    <DeleteRecipeForm
                        setRecipeID={setRecipeID}
                        recipes={recipeRows}
                        value={recipeid}
                    />
                </Form>
            </Container>

            <Tables density="comfortable" columns={recipeColumns} rows={recipeRows} rowIDTitle={"recipeid"} />
        </>
    )
}

export default Recipes
