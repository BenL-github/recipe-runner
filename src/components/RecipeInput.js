import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { useState } from 'react';

const DataInput = ({ buttonText, onNewRecipe }) => {
    const [title, setTitle] = useState('')
    const [serving, setServing] = useState()
    const [description, setDescription] = useState('')

    const onAdd = () => {
        onNewRecipe({ title, serving, description })
        setTitle('')
        setServing()
        setDescription('')
    }

    return (
        <div>
            <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid item>
                    <TextField id='outlined-basic' label='Recipe Title' variant='outlined'
                        onChange={(e) => setTitle(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField id='outlined-basic' label='Recipe Serving' variant='outlined'
                        onChange={(e) => setServing(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField id='outlined-basic' label='Recipe Description' variant='outlined'
                        onChange={(e) => setDescription(e.target.value)} />
                </Grid>
                <Grid item sx={{ my: 'auto' }}>
                    <Button variant="outlined" onClick={onAdd}> {buttonText} </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default DataInput
