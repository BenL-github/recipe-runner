import * as React from 'react';
import { DataGrid} from '@mui/x-data-grid';

const Tables = ({ columns, rows, rowIDTitle }) => {

    return (
        <div style={{ height: 400, width: '95%', marginRight: 'auto', marginLeft: 'auto' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(rows) => rows[`${rowIDTitle}`]}
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