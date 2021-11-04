import * as React from 'react';
import { DataGrid, GridArrowUpwardIcon } from '@mui/x-data-grid';

const Tables = ({ columns, rows }) => {
  return (
    <div style={{ height: 400, width: '95%', marginRight: 'auto', marginLeft: 'auto' }}>
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
  )
}

export default Tables