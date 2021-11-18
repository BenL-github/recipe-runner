import { useState, useEffect } from 'react';
import Tables from './Tables'
import { Typography } from '@mui/material';
import axios from 'axios';
import FormDialog from './FormDialog';
import { Container } from '@mui/material';

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

    const form = {
        buttonLabel: "Add User",
        title: "Add New User",
        text: "Please insert user's first name, last name, email, and zip",
        inputs: [
            { id: "fname", label: "fname", type: "text", key: "fname", hook: setFname },
            { id: "lname", label: "lname", type: "text", key: "lname", hook: setLname },
            { id: "email", label: "email", type: "email", key: "email", hook: setEmail },
            { id: "zipCode", label: "zipCode", type: "number", key: "zipCode", hook: setZipCode },
        ]
    }

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
            .then((res) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', mb: '0.5em' }}>
                <Typography variant='h3'>Users Table</Typography>
                <FormDialog
                    buttonLabel={form.buttonLabel}
                    title={form.title}
                    text={form.text}
                    submitAction={onAdd}
                    inputs={form.inputs}
                    sx={{ m: '1em' }}
                />
            </Container>
            <Tables columns={user_columns} rows={user_rows} rowIDTitle={"customerID"} />
        </>
    )
}

export default Users
