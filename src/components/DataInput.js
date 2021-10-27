import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';

const DataInput = ({ textfields, buttonText, onNewRecipe }) => {
    return (
        <div>
            <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                {textfields.map((field) => (
                    <Grid item>
                        <TextField id={field.id} label={field.label} variant={field.variant} />
                    </Grid>
                ))}
                <Grid item sx={{ my: 'auto' }}>
                    <Button variant="outlined"> {buttonText} </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default DataInput
