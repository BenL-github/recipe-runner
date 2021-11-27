import { useState } from 'react';
import { Typography, Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import Tables from './Tables'

function Demo(props) {
    const { baseURL } = props;
    // SHOPPING CARTS
    const columns = [
        { field: 'ingredientID', headerName: 'ingredientID', width: 150 },
        { field: 'ingredientName', headerName: 'ingredientName', width: 250 },
        { field: 'quantity', headerName: 'quantity', width: 150 },
        { field: 'uOm', headerName: 'units', width: 150 }
    ];

    const [customerID, setCustomerID] = useState(0);
    const [rows, setRows] = useState([])

    const onSearch = () => {
        axios({
            method: "GET",
            url: baseURL + `demo`,
            params: {
                customerID: customerID
            },
        })
            .then((res) => {
                if (res.data.length > 0) {
                    setRows(res.data);
                } else {
                    setRows([]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <>
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', mb: '0.5em' }}>
                <Typography variant='h3'>Get a User's Grocery list</Typography>
                <Container disableGutters sx={{ width: 'auto', marginRight: 0, marginLeft: 0, display: 'flex', justifyContent: 'space-around', px: 0 }}>
                    <TextField
                            id='outlined-basic'
                            size="small"
                            label='User'
                            variant='outlined'
                            onChange={(e) => setCustomerID(e.target.value)}
                            sx={{ marginLeft: '1em', my:'auto'}}
                        />
                        <Button
                            variant="outlined"
                            onClick={onSearch}
                            sx={{ marginLeft: '1em', my: 'auto' }}
                        >Search</Button>
                </Container>
            </Container>
            <Tables columns={columns} rows={rows} rowIDTitle={"ingredientID"}/>
        </>
    )
}

export default Demo