import { useState, useEffect } from 'react';
import axios from 'axios'
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

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
        console.log(ingredientName, ingredientPrice)
        axios({
            method: "POST",
            url: baseURL + "ingredients",
            data: {
                name: ingredientName,
                price: ingredientPrice
            }
        })
        .then((response) => {
            setIngredientName("")
            setIngredientPrice()
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    // handles modify behavior
    const onModify = () => {

    }


    

    return (
        <>
            <Typography variant='h2'>Ingredients</Typography>
            <Tables columns={ingredientColumns} rows={ingredientRows} rowIDTitle={"ingredientID"} />

            {/* ADD a new ingredient */}
            <div>
                <Typography variant='h3'>Add an Ingredient</Typography>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='Ingredient Name' variant='outlined'
                            onChange={(e) => setIngredientName(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='price' variant='outlined'
                            onChange={(e) => setIngredientPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined" onClick={onAdd}> Add </Button>
                    </Grid>
                </Grid>
            </div>

            {/* UPDATE existing ingredient */}
            <div style={{ marginTop: 10 }}>
                <Typography variant='h3'>Update an Ingredient</Typography>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='Ingredient ID' variant='outlined'
                            onChange={(e) => setIngredientID(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='Ingredient Name' variant='outlined'
                            onChange={(e) => setIngredientName(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='price' variant='outlined'
                            onChange={(e) => setIngredientPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined" onClick={onModify}> Modify </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Ingredients
