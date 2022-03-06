import { useState } from 'react';
import { Typography, Container, TextField, Button } from '@mui/material';
import axios from 'axios';
import Tables from './Tables'

function Demo(props) {
    const { baseURL } = props;
    // SHOPPING CARTS
    const columns = [
        { field: 'ingredientid', headerName: 'ingredientID', width: 150 },
        { field: 'ingredientname', headerName: 'ingredientName', width: 250 },
        { field: 'quantity', headerName: 'quantity', width: 150 },
        { field: 'uom', headerName: 'units', width: 150 }
    ];

    const [customerID, setCustomerID] = useState(0);
    const [rows, setRows] = useState([])

    const addIDs = (data) => {
        let i = 0
        data.forEach((object) => {
            // if recipe is null, fill out cell with "null"
            if (!object["recipeid"]) {
                object["recipeid"] = "null"
            }

            object["muiID"] = i
            i++
        })
    }

    const onSearch = () => {
        axios({
            method: "GET",
            url: baseURL + `demo`,
            params: {
                customerID: customerID
            },
        })
            .then((res) => {
                console.log(res.data)
                if (res.data.length > 0) {
                    addIDs(res.data)
                    setRows(res.data);
                } else {
                    setRows([]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleCellClick = (e) => {
    }

    return (
        <>
            <Container maxWidth='false' sx={{ display: 'flex', justifyContent: 'space-between', width: '95%', mb: '0.5em' }}>
                <Typography variant='h3' color="white">Get a User's Grocery list</Typography>
                <Container disableGutters
                    sx={{
                        width: 'auto',
                        marginRight: 0,
                        marginLeft: 0,
                        display: 'flex',
                        justifyContent: 'space-around',
                        px: 0,
                        '& .MuiButton-root': {
                            color: 'white',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            border: '1px solid white'
                        }
                    }}>
                    <TextField
                        id='outlined-basic'
                        size="small"
                        label='User'
                        variant='outlined'
                        onChange={(e) => setCustomerID(e.target.value)}
                        sx={{ marginLeft: '1em', my: 'auto' }}
                    />
                    <Button
                        variant="outlined"
                        onClick={onSearch}
                        sx={{ marginLeft: '1em', my: 'auto' }}
                    >Search</Button>
                </Container>
            </Container>
            <Tables columns={columns} rows={rows} onCellClick={handleCellClick} rowIDTitle={"muiID"} />
        </>
    )
}

export default Demo