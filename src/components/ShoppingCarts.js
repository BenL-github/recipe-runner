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

    const [cartRows, setCartRows] = useState([
        { id: 1, customerID: 1 },
        { id: 2, customerID: 2 },
        { id: 3, customerID: 3 },
        { id: 4, customerID: 4 }
    ])

    const some_users = [
        { id: 1, first: 'bob' },
        { id: 2, first: 'margaret' },
        { id: 3, first: 'gandalf' },
    ]

    const [username, setUsername] = useState("")
    const [userID, setUserID] = useState()

    // handles behavior when a new shopping cart is associated with a user
    const onNewCart = () => {
        // QUERY DATABASE FOR LIST OF AVAILABLE USERS AND THEIR IDS
        // might need to do this on page load get /shoppingcarts

        if (validateUser()) {
            // this will be an INSERT action with an auto increment id#
            setCartRows([...cartRows, { id: Math.floor(Math.random() * 100), customerID: userID }])
        } else {
            alert("sorry, not a valid user")
        }
    }

    // verify that user entry is a valid user
    function validateUser() {
        for (let i = 0; i < some_users.length; i++) {
            let tempUsername = some_users[i].first.toLowerCase()
            // name matches?
            if (tempUsername.includes(username)) {
                // id matches?
                if (some_users[i].id === parseInt(userID)) {
                    return true
                }
            }
        }
        return false
    }

    return (
        <>
            <Typography variant='h2'>ShoppingCarts</Typography>
            <Tables columns={cart_columns} rows={cartRows} />
            <div style={{ marginTop: 10 }}>
                {/* Insert new shopping cart */}
                <Typography variant='h3'>Create a New Shopping Cart</Typography>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='User ID#' variant='outlined'
                            onChange={(e) => setUserID(e.target.value)} />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='User Name' variant='outlined'
                            onChange={(e) => setUsername(e.target.value)} />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined" onClick={onNewCart}> Create New Cart </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ShoppingCarts
