import React from 'react'
import { Grid } from '@mui/material'
import Card from './Card'
import { Paper } from '@mui/material'
import { Container } from '@mui/material'
import { Typography } from '@mui/material'
const Home = () => {
    const content = ' Lorem ipsum dolor sit amet consectetur adipisicing elit. \
    Eligendi aut rerum labore velit eum nostrum amet deserunt vitae, officiis,'

    return (
        <Container maxWidth='false' sx={{width:50/100, display: 'flex', justifyContent: 'space-between'}}>
    
        <Grid container spacing={2} sx={{}}>
            <Grid item xs={4}><Card content={content} title="Recipes" href="/recipes"/></Grid>
            <Grid item xs={4}><Card content={content} title="Ingredients" href="/ingredients"/></Grid>
            <Grid item xs={4}><Card content={content} title="Users" href="#"/></Grid>
            <Grid item xs={4}><Card content={content} title="ShoppingCarts" href="#"/></Grid>
            <Grid item xs={4}><Card content={content} title="SelectedRecipes" href="#"/></Grid>
            <Grid item xs={4}><Card content={content} title="RecipeIngredients" href="#"/></Grid>
        </Grid>
        </Container>
    )
}

export default Home
