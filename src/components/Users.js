import { useState } from 'react';
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function Users() {
    // USERS
    const user_columns = [
        { field: 'id', headerName: 'customerID', width: 150 },
        { field: 'cartID', headerName: 'cartID', width: 150 },
        { field: 'fName', headerName: 'fName', width: 150 },
        { field: 'lName', headerName: 'lName', width: 150 },
        { field: 'email', headerName: 'email', width: 150 },
        { field: 'zipCode', headerName: 'zipCode', width: 150 },
    ]

    const user_rows = [
        { id: 1, cartID: 1, lName: 'Snow', fName: 'Jon', email: 'example@ex.com', zipCode: '00000' },
        { id: 2, cartID: 2, lName: 'Targ', fName: 'Dany', email: 'example@ex.com', zipCode: '00000' },
        { id: 3, cartID: 3, lName: 'Snow', fName: 'Rob', email: 'example@ex.com', zipCode: '00000' },
        { id: 4, cartID: 4, lName: 'Lannister', fName: 'Cersei', email: 'example@ex.com', zipCode: '00000' },
    ]

    return (
        <>
            <Typography variant='h2'>Users</Typography>
            <Tables columns={user_columns} rows={user_rows} />
            <div>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='fName' variant='outlined' />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='lName' variant='outlined' />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='email' variant='outlined' />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='zipCode' variant='outlined' />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined"> Add </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Users
