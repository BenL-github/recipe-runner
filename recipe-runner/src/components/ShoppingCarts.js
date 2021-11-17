import { useState, useEffect } from 'react';
import Tables from './Tables'
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import axios from 'axios';
import FormDialog from './FormDialog';

function ShoppingCarts() {
    const baseURL = "http://localhost:34876/"
    // SHOPPING CARTS
    const cart_columns = [
        { field: 'cartID', headerName: 'cartID', width: 150 },
        { field: 'cartOwner', headerName: 'cartOwner', width: 150 },
        // add a function to get the full name of the owner from the user data
    ]

    const [cartID, setCartID] = useState();
    const [cartOwner, setCartOwner] = useState();
    const [cartRows, setCartRows] = useState([]);

    const form = {
        buttonLabel: "Add Cart",
        title: "Add New Cart",
        text: "Please enter a valid customerID along with the new cart.",
        inputs: [
            { id: "cartID", label: "cartID", type: "number", key: "cartID", hook: setCartID },
            { id: "cartOwner", label: "cartOwner", type: "number", key: "cartOwner", hook: setCartOwner },
        ]
    }

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

    // add 
    function onAdd(){
        axios({
            method: "POST",
            url: baseURL + "shoppingcarts",
            data: {
                cartID: cartID,
                cartOwner: cartOwner
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', mb: '0.5em' }}>
                <Typography variant='h3'>ShoppingCarts Table</Typography>
                <FormDialog
                    buttonLabel={form.buttonLabel}
                    title={form.title}
                    text={form.text}
                    submitAction={onAdd}
                    inputs={form.inputs}
                    sx={{ m: '1em' }}
                />
            </Container>
            <Tables columns={cart_columns} rows={cartRows} rowIDTitle={"muiID"}/>
        </>
    )
}

export default ShoppingCarts
