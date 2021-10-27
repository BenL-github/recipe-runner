import * as React from 'react';
import { DataGrid, GridArrowUpwardIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
const columns = [
  { field: 'id', headerName: 'ID', width: 75 },
  { field: 'recipeTitle', headerName: 'recipeTame', width: 200 },
  { field: 'recipeServing', headerName: 'recipeServing', type: 'number', width: 150 },
  { field: 'recipeDescription', headerName: 'recipeDescription', width: 800 },
];

const rows = [
  { id: 1, recipeTitle: 'Chicken Parmesan', recipeServing: 3, recipeDescription:'mmm it taste good'},
  { id: 2, recipeTitle: 'Chicken Noodle Soup', recipeServing: 8, recipeDescription:'good soup'},
  { id: 3, recipeTitle: 'Chicken Tikka Masala', recipeServing: 5, recipeDescription:'mmm it taste good'},
  { id: 4, recipeTitle: 'Chicken Dumpling', recipeServing: 2, recipeDescription:'mmm it taste good'},
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
        <TextField id="outlined-basic" label="Recipe Title" variant="outlined" />
        </Grid>

        <Grid item>
        <TextField id="outlined-basic" label="RecipeServing" variant="outlined" />
        </Grid>

        <Grid item>
        <TextField id="outlined-basic" label="RecipeDescription" variant="outlined" />
        </Grid>
        
        <Grid item sx={{my:'auto'}}>
        <Button variant="outlined"> Create New Recipe </Button>
        </Grid>
    </Grid>
        
    </>
  );
}