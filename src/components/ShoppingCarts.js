import { useState } from 'react';
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function ShoppingCarts() {
    // SHOPPING CARTS
    const cart_columns = [
        { field: 'id', headerName: 'cartID', width: 150 },
        { field: 'customerID', headerName: 'customerID', width: 150 },
        // add a function to get the full name of the owner from the user data
    ]

    const cart_rows = [
        { id: 1, customerID: 1 },
        { id: 2, customerID: 2 },
        { id: 3, customerID: 3 },
        { id: 4, customerID: 4 }
    ]

    return (
        <>
            <Typography variant='h2'>ShoppingCarts</Typography>
            <Tables columns={cart_columns} rows={cart_rows} />
            <div style={{ marginTop: 10 }}>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='Ingredient ID' variant='outlined' />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined"> Add </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ShoppingCarts
