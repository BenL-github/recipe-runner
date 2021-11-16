import { useState, useEffect } from 'react';
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';

function Users() {
    const baseURL = "http://localhost:34876/"
    // USERS
    const user_columns = [
        { field: 'customerID', headerName: 'customerID', width: 150 },
        { field: 'fName', headerName: 'fName', width: 150 },
        { field: 'lName', headerName: 'lName', width: 150 },
        { field: 'email', headerName: 'email', width: 150 },
        { field: 'zipCode', headerName: 'zipCode', width: 150 },
    ]

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [zipCode, setZipCode] = useState()
    const [user_rows, setUserRows] = useState([])

    // get request to database on page load
    useEffect(() => {
        axios
            .get(baseURL + "users")
            .then((response) => {
                console.log(response.data)
                setUserRows(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    // handles behavior to add a new user
    const onAdd = () => {
        axios({
            method: "POST",
            url: baseURL + "users",
            data: {
                fname: fname,
                lname: lname,
                email: email,
                zipCode: zipCode
            }
        })
            .catch((error)=>{
                console.log(error);
            })
    }

    return (
        <>
            <Typography variant='h2'>Users</Typography>
            <Tables columns={user_columns} rows={user_rows} rowIDTitle={"customerID"} />
            <Typography variant='h3'>Add a User</Typography>
            <div>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='fName' variant='outlined' 
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='lName' variant='outlined' 
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='email' variant='outlined' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField id='outlined-basic' label='zipCode' variant='outlined' 
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                    </Grid>
                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined" onClick={onAdd}> Add </Button>
                    </Grid>
                </Grid>
            </div>
            <Typography variant='h3'>Update a User</Typography>
            <div>
                <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Grid item>
                        <TextField id='outlined-basic' label='userID' variant='outlined' />
                    </Grid>
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

                    <Grid item>
                        <TextField id='outlined-basic' label='cartID' variant='outlined' />
                    </Grid>

                    <Grid item sx={{ my: 'auto' }}>
                        <Button variant="outlined"> Update </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Users
