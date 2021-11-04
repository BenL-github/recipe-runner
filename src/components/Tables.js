import { useState } from 'react';
import * as React from 'react';
import { DataGrid, GridArrowUpwardIcon } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const Tables = ({ columns, rows }) => {

    const [isRowSelected, setIsRowSelected] = useState(false)
    const [selectedRow, setSelectedRow] = useState([])

    const onRowDelete = () => {
        console.log(selectedRow)
        setSelectedRow([])
        setIsRowSelected(false)
    }

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
                checkboxSelection={true}
                onSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedRows = rows.filter((row) =>
                        selectedIDs.has(row.id),
                    );
                    setIsRowSelected(true)
                    setSelectedRow(selectedRows);
                }}
            />
            {isRowSelected && 
            <Button variant="outlined" onClick={onRowDelete}> Delete Selected </Button>}
        </div>

    )
}

export default Tables