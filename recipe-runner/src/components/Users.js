import { useState, useEffect } from 'react';
import Tables from './Tables'
import axios from 'axios';
import FormDialog from './FormDialog';
import { Container, Snackbar, Typography } from '@mui/material';

function Users(props) {
    const { baseURL } = props;
    // USERS
    const user_columns = [
        { field: 'customerid', headerName: 'customerID', width: 150 },
        { field: 'fname', headerName: 'fName', width: 150 },
        { field: 'lname', headerName: 'lName', width: 150 },
        { field: 'email', headerName: 'email', width: 150 },
        { field: 'zipcode', headerName: 'zipCode', width: 150 },
    ]

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [zipCode, setZipCode] = useState();
    const [user_rows, setUserRows] = useState([]);
    const [snackbarReveal, setSnackbarReveal] = useState(false);

    const form = {
        buttonLabel: "Add User",
        title: "Add New User",
        text: "Please insert user's first name, last name, email, and zip",
        inputs: [
            { id: "fname", label: "fname", type: "text", key: "fname", hook: setFname },
            { id: "lname", label: "lname", type: "text", key: "lname", hook: setLname },
            { id: "email", label: "email", type: "email", key: "email", hook: setEmail },
            { id: "zipcode", label: "zipCode", type: "number", key: "zipCode", hook: setZipCode },
        ]
    }
    const handleClose = () => {
        setSnackbarReveal(false);
      };

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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
                setSnackbarReveal(true);
            })
    }

    return (
        <>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant='h3'>Users Table</Typography>
            </Container>
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'center', width: '95%', my: '1.5em' }}>
                <FormDialog
                    buttonLabel={form.buttonLabel}
                    title={form.title}
                    text={form.text}
                    submitAction={onAdd}
                    inputs={form.inputs}
                    sx={{ m: '1em' }}
                />
            </Container>
            <Tables columns={user_columns} rows={user_rows} rowIDTitle={"customerid"} />
            <Snackbar
                anchorOrigin={{vertical:'bottom', horizontal:'center'}}
                open={snackbarReveal}
                message="Invalid Form Input"
                onClose={handleClose}
            />
        </>
    )
}

export default Users
