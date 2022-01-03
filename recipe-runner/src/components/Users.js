import { useState, useEffect } from 'react';
import Tables from './Tables'
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import AddUserForm from './Forms/Users/AddUserForm';
import DeleteUserForm from './Forms/Users/DeleteUserForm';
import UpdateUserForm from './Forms/Users/UpdateUserForm';

function Users(props) {
    const { baseURL } = props;
    const [userRows, setUserRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);

    
    // USERS
    const userColumns = [
        { field: 'customerid', headerName: 'customerID', width: 150 },
        { field: 'fname', headerName: 'fName', width: 150 },
        { field: 'lname', headerName: 'lName', width: 150 },
        { field: 'email', headerName: 'email', width: 150 },
        { field: 'zipcode', headerName: 'zipCode', width: 150 },
    ]

    // get request to database on page load
    useEffect(() => {
        axios
            .get(baseURL + "users")
            .then((response) => {
                setUserRows(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleCellClick = (e) => {
        setSelectedRow(e);
    }

    return (
        <>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant='h3'>Users Table</Typography>
            </Container>
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'center', width: '95%', my: '1.5em' }}>
                <AddUserForm baseURL={baseURL} />
                <UpdateUserForm selected={selectedRow} users={userRows} baseURL={baseURL} />
                <DeleteUserForm selected={selectedRow} users={userRows} baseURL={baseURL} />
            </Container>
            <Tables columns={userColumns} rows={userRows} onCellClick={handleCellClick} rowIDTitle={"customerid"} />
        </>
    )
}

export default Users
