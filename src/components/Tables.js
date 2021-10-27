import * as React from 'react';
import { DataGrid, GridArrowUpwardIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';


export default function DataTable(props) {
    const {columns, rows} = props;
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