import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import FormDialog from './FormDialog';
import axios from 'axios';
import Tables from './Tables'

function Recipes() {
    const baseURL = "http://localhost:34876/"

    // RECIPES
    const [keyword, setKeyword] = useState("")
    const [isResults, setIsResults] = useState(false)
    const [isNoResults, setIsNoResults] = useState(false)
    const [searchRows, setSearchRows] = useState([])
    const [recipeID, setRecipeID] = useState()
    const [recipeRows, setRecipeRows] = useState([])

    const [recipeTitle, setRecipeTitle] = useState()
    const [recipeServing, setRecipeServing] = useState()
    const [recipeDescription, setRecipeDescription] = useState()

    const add_form = {
        buttonLabel: "Add a Recipe",
        title: "Add New Recipe",
        text: "Please enter recipe title, how many people the recipe serves, and a short description.",
        inputs: [
            { id: "recipeTitle", label: "title", type: "text", key: "recipeTitle", hook: setRecipeTitle },
            { id: "recipeServing", label: "serving(s)", type: "number", key: "recipeServing", hook: setRecipeServing },
            { id: "recipeDescription", label: "description", type: "text", key: "recipeDescription", hook: setRecipeDescription }
        ]
    }

    const delete_form = {
        buttonLabel: "Delete a Recipe",
        title: "Delete a Recipe",
        text: "Please enter valid recipe ID to be deleted.",
        inputs: [
            { id: "recipeID", label: "recipeID", type: "number", key: "recipeID", hook: setRecipeID }
        ]
    }

    const recipeColumns = [
        { field: 'recipeID', headerName: 'recipeID', width: 150 },
        { field: 'recipeTitle', headerName: 'recipeTitle', width: 200 },
        { field: 'recipeServing', headerName: 'recipeServing', type: 'number', width: 150 },
        { field: 'recipeDescription', headerName: 'recipeDescription', width: 800 },
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
    }, [])

    // behavior when user adds a new recipe
    const onAdd = () => {
        axios({
            method: "POST",
            url: baseURL + "recipes",
            data: {
                title: recipeTitle,
                description: recipeDescription,
                serving: recipeServing
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
        // .then((response) => {
        //     if (response.data.length > 0) {
        //         setSearchRows(response.data)
        //         setIsResults(true)
        //         setIsNoResults(false)
        //     } else {
        //         setIsNoResults(true)
        //         setIsResults(false)
        //     }
        // })
        // .catch(function (error) {
        //     console.log(error)
        //     setIsNoResults(true)
        //     setIsResults(false)
        // })
    }

    // behavior when a user deletes a recipe
    const onDelete = () => {
        axios({
            method: "DELETE",
            url: baseURL + 'recipes',
            data: {
                id: recipeID
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

            <Tables columns={recipeColumns} rows={recipeRows} rowIDTitle={"recipeID"} />


            {/*             
            <Typography variant='h3'>Search for a Recipe</Typography> */}


            {/* <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid item>
                    <TextField id='outlined-basic' label='Title Keyword' variant='outlined'
                        onChange={(e) => setKeyword(e.target.value)} />
                </Grid>
                <Grid item sx={{ my: 'auto' }}>
                    <Button variant="outlined" onClick={onSearch}> Search </Button>
                </Grid>
            </Grid> */}

            {/*             
            {isNoResults && <>
                <Typography variant='h4'>Search Results</Typography>
                <Typography variant='p'>{`No recipes with the keyword "${keyword}"; try again with a different keyword or add a new recipe!`}</Typography>
            </>}

            
            {isResults && <>
                <Typography variant="h4">Search Results</Typography>
                <Tables columns={recipeColumns} rows={searchRows} rowIDTitle={"recipeID"} />
            </>} */}
        </>
    )
}

export default Recipes
