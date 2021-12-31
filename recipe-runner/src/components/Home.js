import React from 'react'
import { Grid } from '@mui/material'
import Card from './Card'
import { Container } from '@mui/material'
const Home = () => {
    return (
        <Container maxWidth='false' sx={{width:50/100, display: 'flex', justifyContent: 'space-between'}}>
            
         <Grid container spacing={2} sx={{}}>
            <Grid item xs={4}><Card content='Browse and manage recipes' title="Recipes" href="/recipes"/></Grid>
            <Grid item xs={4}><Card content='Browse and manage ingredients' title="Ingredients" href="/ingredients"/></Grid>
            <Grid item xs={4}><Card content='Browse and manage users'title="Users" href="users"/></Grid>
            <Grid item xs={4}><Card content='Browse and manage shopping carts' title="ShoppingCarts" href="shoppingcarts"/></Grid>
            <Grid item xs={4}><Card content='Browse selectedRecipes' title="SelectedRecipes" href="selectedrecipes"/></Grid>
            <Grid item xs={4}><Card content='Browse recipeIngredients' title="RecipeIngredients" href="recipeingredients"/></Grid>
        </Grid> 
        </Container>
    )
}

export default Home
