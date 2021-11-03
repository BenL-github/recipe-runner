import { useState } from 'react';
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function Ingredients() {
    // INGREDIENTS
    const ingr_columns = [
        { field: 'id', headerName: 'ingredientID', width: 150 },
        { field: 'ingredientName', headerName: 'ingredientName', width: 200 },
        { field: 'price', headerName: 'price', type: 'number', width: 90 }
    ];

    const ingr_rows = [
        { id: 1, ingredientName: 'Chicken Breast', price: 3.99 },
        { id: 2, ingredientName: 'Wheat Noodles', price: 4.00 },
        { id: 3, ingredientName: 'Tikka Masala Sauce', price: 7.50 },
        { id: 4, ingredientName: 'Chinese Dumpling Wrappers', price: 3.25 },
    ];

    return (
        <>
            <Typography variant='h2'>Ingredients</Typography>
            <Tables columns={ingr_columns} rows={ingr_rows} />
            <div>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='Ingredient Name' variant='outlined' />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='price' variant='outlined' />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined"> Add </Button>
                    </Grid>
                </Grid>
            </div>
            <div style={{ marginTop: 10 }}>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='Ingredient ID' variant='outlined' />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='Ingredient Name' variant='outlined' />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='price' variant='outlined' />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined"> Modify </Button>
                    </Grid>
                </Grid>
            </div>
            <div style={{ marginTop: 10 }}>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='Ingredient ID' variant='outlined' />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined"> Delete </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Ingredients
