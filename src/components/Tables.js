import * as React from 'react';
import { DataGrid, GridArrowUpwardIcon } from '@mui/x-data-grid';

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
    
        
    </>
  );
}