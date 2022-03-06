import { useState, useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import AddShoppingCartForm from './Forms/ShoppingCarts/AddShoppingCartForm'
import DeleteShoppingCartForm from './Forms/ShoppingCarts/DeleteShoppingCartForm';
import axios from 'axios';
import Tables from './Tables'

const cart_columns = [
    { field: 'cartid', headerName: 'cartID', width: 150 },
    { field: 'customerid', headerName: 'customerID', width: 150 },
    { field: 'fname', headerName: 'Owner Name', width: 200 },
];

function ShoppingCarts(props) {
    const { baseURL } = props;
    const [cartRows, setCartRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);

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
        const [firstResponse] = await Promise.all([
            axios.get(baseURL + "shoppingcarts")
        ])

        addIDs(firstResponse.data)
        setCartRows(firstResponse.data)
    }
    
    useEffect(() => {
        pageSetup()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    const handleCellClick = (e) => {
        setSelectedRow(e);
    }

    return (
        <>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant='h3' color="white">ShoppingCarts Table</Typography>
            </Container>
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'center', width: '95%', my: '1.5em', '& .MuiButton-root': {
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        border: '1px solid white'
                    }, }}>
                <AddShoppingCartForm baseURL={baseURL} />
                <DeleteShoppingCartForm selectedRow={selectedRow} baseURL={baseURL} />
            </Container>
            <Tables columns={cart_columns} rows={cartRows} onCellClick={handleCellClick} rowIDTitle={"muiID"} />
        </>
    )
}

export default ShoppingCarts
