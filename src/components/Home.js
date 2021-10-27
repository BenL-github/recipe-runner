import React from 'react'
import { Grid } from '@mui/material'
import Card from './Card'
const Home = () => {
    return (
        <Grid container spacing={2}>
            <Grid item>
                <Card></Card>
            </Grid>
            <Grid item>
                <Card></Card>
            </Grid>
            <Grid item>
                <Card></Card>
            </Grid>
            <Grid item>
                <Card></Card>
            </Grid>
            <Grid item>
                <Card></Card>
            </Grid>
        </Grid>
    )
}

export default Home
