import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Tables = ({ columns, rows, onCellClick, rowIDTitle }) => {

    return (
        <div style={{ height: 400, width: '95%', marginRight: 'auto', marginLeft: 'auto' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(rows) => rows[`${rowIDTitle}`]}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                disableColumnMenu
                onCellClick={(e) => onCellClick(e.row)}
                sx={{
                    color: "white",
                    backgroundColor: "rgb(0,0,0,0.5)",
                    '& .MuiToolbar-root': {
                        color: 'white',
                      },
                }}
            />
        </div>
    )
}

export default Tables