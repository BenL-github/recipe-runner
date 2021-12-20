import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import FormDialog from './FormDialog';
import axios from 'axios';
import Tables from './Tables'

function Recipes(props) {
    const { baseURL } = props;

    // RECIPES
    const [keyword, setKeyword] = useState("")
    const [recipeid, setRecipeID] = useState()
    const [recipeRows, setRecipeRows] = useState([])

    const [recipetitle, setRecipeTitle] = useState()
    const [recipeserving, setRecipeServing] = useState()
    const [recipedescription, setRecipeDescription] = useState()

    const add_form = {
        buttonLabel: "Add a Recipe",
        title: "Add New Recipe",
        text: "Please enter recipe title, how many people the recipe serves, and a short description.",
        inputs: [
            { id: "recipetitle", label: "title", type: "text", key: "recipeTitle", hook: setRecipeTitle },
            { id: "recipeserving", label: "serving(s)", type: "number", key: "recipeServing", hook: setRecipeServing },
            { id: "recipedescription", label: "description", type: "text", key: "recipeDescription", hook: setRecipeDescription }
        ]
    }

    const delete_form = {
        buttonLabel: "Delete a Recipe",
        title: "Delete a Recipe",
        text: "Please enter valid recipe ID to be deleted.",
        inputs: [
            { id: "recipeid", label: "recipeID", type: "number", key: "recipeID", hook: setRecipeID }
        ]
    }

    const recipeColumns = [
        { field: 'recipeid', headerName: 'recipeID', width: 150 },
        { field: 'recipetitle', headerName: 'recipeTitle', width: 200 },
        { field: 'recipeserving', headerName: 'recipeServing', type: 'number', width: 150 },
        { field: 'recipedescription', headerName: 'recipeDescription', width: 800 },
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

    // behavior when a user deletes a recipe
    const onDelete = () => {
        axios({
            method: "DELETE",
            url: baseURL + 'recipes',
            data: {
                id: recipeid
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
                <Typography variant='h3'>Recipes Table</Typography>
                <Container disableGutters sx={{ width: 'auto', marginRight: 0, marginLeft: 0, display: 'flex', justifyContent: 'space-around', px: 0 }}>
                    <TextField
                        id='outlined-basic'
                        size="small"
                        label='Search Title'
                        variant='outlined'
                        onChange={(e) => setKeyword(e.target.value)}
                        sx={{ marginLeft: '1em', my:'auto'}}
                    />
                    <Button
                        variant="outlined"
                        onClick={onSearch}
                        sx={{ marginLeft: '1em', my: 'auto' }}
                    >Search</Button>

                    <FormDialog
                        buttonLabel={add_form.buttonLabel}
                        title={add_form.title}
                        text={add_form.text}
                        submitAction={onAdd}
                        inputs={add_form.inputs}
                    />
                    <FormDialog
                        buttonLabel={delete_form.buttonLabel}
                        title={delete_form.title}
                        text={delete_form.text}
                        submitAction={onDelete}
                        inputs={delete_form.inputs}
                    />
                </Container>
            </Container>

            <Tables columns={recipeColumns} rows={recipeRows} rowIDTitle={"recipeid"} />
        </>
    )
}

export default Recipes
