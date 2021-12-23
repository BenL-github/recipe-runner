import * as React from 'react';
import { DataGrid} from '@mui/x-data-grid';

const Tables = ({ columns, rows, rowIDTitle }) => {

    return (
        <div style={{ height: 400, width: '95%', marginRight: 'auto', marginLeft: 'auto' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(rows) => rows[`${rowIDTitle}`]}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                hideFooterSelectedRowCount
                disableColumnMenu
            />
        </div>
    )
}

export default Tables