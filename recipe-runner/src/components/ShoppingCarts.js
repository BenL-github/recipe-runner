import { useState, useEffect } from 'react';
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';

function ShoppingCarts() {
    const baseURL = "http://localhost:34876/"
    // SHOPPING CARTS
    const cart_columns = [
        { field: 'cartID', headerName: 'cartID', width: 150 },
        { field: 'cartOwner', headerName: 'cartOwner', width: 150 },
        // add a function to get the full name of the owner from the user data
    ]

    const [username, setUsername] = useState("");
    const [userID, setUserID] = useState();
    const [cartRows, setCartRows] = useState([]);

    // add mui placeholder ids
    const addIDs = (data) => {
        let i = 0
        data.map((object) => {
            object["muiID"] = i
            i++
        })
    }

    // get request to database on page load
    useEffect(() => {
        axios
            .get(baseURL + "shoppingcarts")
            .then((response) => {
                let data = response.data
                console.log(data);
                addIDs(data);
                setCartRows(data);
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    return (
        <>
            <Typography variant='h2'>ShoppingCarts</Typography>
            <Tables columns={cart_columns} rows={cartRows} rowIDTitle={"muiID"}/>
            <div style={{ marginTop: 10 }}>
                {/* Insert new shopping cart */}
                <Typography variant='h3'>Create a New Shopping Cart</Typography>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='Cart ID#' variant='outlined'
                            onChange={(e) => setUsername(e.target.value)} />
                    </Grid>
                    
                    <Grid item>
                        <TextField id='outlined-basic' label='User ID#' variant='outlined'
                            onChange={(e) => setUserID(e.target.value)} />
                    </Grid>
                    
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined" > Create New Cart </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ShoppingCarts
