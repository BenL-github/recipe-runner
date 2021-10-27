import * as React from 'react';
import { DataGrid, GridArrowUpwardIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
const columns = [
  { field: 'id', headerName: 'ID', width: 75 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  return (
      <>
    <div style={{ height: 400, width: '95%', marginRight:'auto', marginLeft: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        disableColumnMenu
        disableColumnReorder
        disableMultipleColumnsSorting
      />
        
    </div>
    <Grid container spacing={2} sx={{width:95/100, marginLeft:'auto', marginRight: 'auto'}}>
        <Grid item>
        <TextField id="outlined-basic" label="Ingredient Name" variant="outlined" />
        </Grid>

        <Grid item>
        <TextField id="outlined-basic" label="Price" variant="outlined" />
        </Grid>
        
        <Grid item sx={{my:'auto'}}>
        <Button variant="outlined"> Create New Ingredient </Button>
        </Grid>
    </Grid>
        
    </>
  );
}