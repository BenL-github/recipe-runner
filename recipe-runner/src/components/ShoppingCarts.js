import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import axios from 'axios';
import SelectDialogShoppingCarts from './SelectDialogShoppingCarts';
import Tables from './Tables'

function ShoppingCarts(props) {
    const { baseURL } = props;
    // SHOPPING CARTS
    const cart_columns = [
        { field: 'cartid', headerName: 'cartID', width: 150 },
        { field: 'customerid', headerName: 'customerID', width: 150 },
        { field: 'fname', headerName: 'Owner Name', width: 200 },
    ];

    const [cartRows, setCartRows] = useState([]);
    const [users, setUsers] = useState([])

    const form = {
        buttonLabel: "Add Cart",
        title: "Add New Cart",
        text: "Select a user without a cart to create one for them.",
        inputs: [
            { data: users },
        ]
    };

    // add mui placeholder ids
    const addIDs = (data) => {
        let i = 0
        data.forEach((userObject) => {
            userObject["muiID"] = i
            i++
            userObject["fullName"] = `${userObject.fName} ${userObject.lName}`
        })
    };

    // get request to populate primary table and get users for drop down table
    async function pageSetup() {
        const [firstResponse, secondResponse] = await Promise.all([
            axios.get(baseURL + "shoppingcarts"),
            axios.get(baseURL + "users")
        ])

        addIDs(firstResponse.data)
        setCartRows(firstResponse.data)
        setUsers(filterUsers(secondResponse.data, firstResponse.data))
    }
    
    useEffect(() => {
        pageSetup()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // filter out users who don't already have carts
    const filterUsers = (userData, cartData) => {
        userData = userData.filter(ar => !cartData.find(rm => (rm.customerID === ar.customerID)))
        return userData
    }

    // add 
    const onAdd = (userID) => {
        axios({
            method: "POST",
            url: baseURL + "shoppingcarts",
            data: {
                customerID: userID
            }
        })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant='h3'>ShoppingCarts Table</Typography>
            </Container>
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'center', width: '95%', my: '1.5em' }}>
                {users && <SelectDialogShoppingCarts
                    buttonLabel={form.buttonLabel}
                    title={form.title}
                    text={form.text}
                    submitAction={onAdd}
                    inputs={form.inputs}
                    sx={{ m: '1em' }}
                />}
            </Container>
            <Tables columns={cart_columns} rows={cartRows} rowIDTitle={"muiID"} />
        </>
    )
}

export default ShoppingCarts
