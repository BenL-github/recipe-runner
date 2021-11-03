import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation';
import Tables from './components/Tables'
import Home from './components/Home';
import RecipeInput from './components/RecipeInput'
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

function App() {
  // DATA (will be retrieved via DB)
  // RECIPES
  const recipe_columns = [
    { field: 'id', headerName: 'recipeID', width: 150 },
    { field: 'recipeTitle', headerName: 'recipeTitle', width: 200 },
    { field: 'recipeServing', headerName: 'recipeServing', type: 'number', width: 150 },
    { field: 'recipeDescription', headerName: 'recipeDescription', width: 800 },
  ];

  // using state here to update web page when user adds or deletes a recipe
  const [recipe_rows, set_recipe_rows] = useState([
    { id: 1, recipeTitle: 'Chicken Parmesan', recipeServing: 3, recipeDescription: 'mmm it taste good' },
    { id: 2, recipeTitle: 'Chicken Noodle Soup', recipeServing: 8, recipeDescription: 'good soup' },
    { id: 3, recipeTitle: 'Chicken Tikka Masala', recipeServing: 5, recipeDescription: 'mmm it taste good' },
    { id: 4, recipeTitle: 'Chicken Dumpling', recipeServing: 2, recipeDescription: 'mmm it taste good' },
  ]);

  // behavior when user adds a new recipe
  const onNewRecipe = ({ title, serving, description }) => {
    // will be a PUT to the database
    const new_recipe = { id: Math.floor(Math.random() * 10000), recipeTitle: title, recipeServing: serving, recipeDescription: description }
    set_recipe_rows([...recipe_rows, new_recipe])

  }

  // INGREDIENTS
  const ingr_columns = [
    { field: 'id', headerName: 'ingredientID', width: 150 },
    { field: 'ingredientName', headerName: 'ingredientName', width: 200 },
    { field: 'price', headerName: 'price', type: 'number', width: 90 }
  ];

  const ingr_rows = [
    { id: 1, ingredientName: 'Chicken Breast', price: 3.99 },
    { id: 2, ingredientName: 'Wheat Noodles', price: 4.00 },
    { id: 3, ingredientName: 'Tikka Masala Sauce', price: 7.50 },
    { id: 4, ingredientName: 'Chinese Dumpling Wrappers', price: 3.25 },
  ];

  // USERS
  const user_columns = [
    { field: 'id', headerName: 'customerID', width: 150 },
    { field: 'cartID', headerName: 'cartID', width: 150 },
    { field: 'fName', headerName: 'fName', width: 150 },
    { field: 'lName', headerName: 'lName', width: 150 },
    { field: 'email', headerName: 'email', width: 150 },
    { field: 'zipCode', headerName: 'zipCode', width: 150 },
  ]

  const user_rows = [
    { id: 1, cartID: 1, lName: 'Snow', fName: 'Jon', email:'example@ex.com', zipCode:'00000' },
    { id: 2, cartID: 2, lName: 'Targ', fName: 'Dany', email:'example@ex.com', zipCode:'00000' },
    { id: 3, cartID: 3, lName: 'Snow', fName: 'Rob', email:'example@ex.com', zipCode:'00000' },
    { id: 4, cartID: 4, lName: 'Lannister', fName: 'Cersei', email:'example@ex.com', zipCode:'00000' },

  ]

  // SHOPPING CARTS
  const cart_columns = [
    { field: 'id', headerName: 'cartID', width: 150 },
    { field: 'customerID', headerName: 'customerID', width: 150 },
    // add a function to get the full name of the owner from the user data
  ]

  const cart_rows = [
    { id: 1, customerID: 1 },
    { id: 2, customerID: 2 },
    { id: 3, customerID: 3 },
    { id: 4, customerID: 4 }
  ]

  // SELECTED RECIPES
  const selected_recipe_columns = [
    // should be pulled from shopping carts
    { field: 'id', headerName: 'cartID', width: 75 },
    { field: 'recipeID', headername: 'recipeID', width: 100 },
    // should be pulled from recipes
    { field: 'selectedQuantity', headername: 'selectedQuantity', width: 200 }
  ]

  const selected_recipe_rows = [
    { id: 1, recipeID: 1, selectedQuantity: 1 },
    { id: 2, recipeID: 2, selectedQuantity: 3 },
    { id: 3, recipeID: 4, selectedQuantity: 2 },
    { id: 3, recipeID: 2, selectedQuantity: 2 },
  ]

  // RECIPE INGREDIENTS
  const recipe_ingr_columns = [
    { field: 'id', headerName: 'recipeID', width: 125 },
    { field: 'ingredientID', headername: "ingredientID", width: 125 },
    // pull from recipes
    // pull from ingredients
    { field: 'ingredientQuantity', headername: 'ingredientQuantity', width: 200 },
    { field: 'uom', headerName: "unit of measurement", width: 200 },
  ]

  const recipe_ingr_rows = [
    { id: 1, ingredientID: 1, ingredientQuantity: 5, uom: "g" },
    { id: 2, ingredientID: 1, ingredientQuantity: 6, uom: 'tsp' },
    { id: 3, ingredientID: 3, ingredientQuantity: 6, uom: 'tsp' },
    { id: 4, ingredientID: 4, ingredientQuantity: 2, uom: 'tbsp' },
  ]

  return (
    <Router>
      <Container maxWidth='false' disableGutters>
        <Navigation />
        <Switch>
          <Route path='/recipes'>
            <Typography variant='h2' align='center'>Recipes</Typography>
            <Tables columns={recipe_columns} rows={recipe_rows} />
            <RecipeInput buttonText={'Create New Recipe'} onNewRecipe={onNewRecipe} />
          </Route>
          <Route path='/ingredients'>
          <Typography variant='h2' align='center'>Ingredients</Typography>
            <Tables columns={ingr_columns} rows={ingr_rows} />
            <div>
              <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                  <Grid item>
                      <TextField id='outlined-basic' label='Ingredient Name' variant='outlined'/>
                  </Grid>
                  <Grid item>
                      <TextField id='outlined-basic' label='price' variant='outlined'/>
                  </Grid>
                  <Grid item sx={{ my: 'auto' }}>
                      <Button variant="outlined"> Add </Button>
                  </Grid>
                </Grid>
            </div>
            <div style={{marginTop:10}}>
              <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
              <Grid item>
                      <TextField id='outlined-basic' label='Ingredient ID' variant='outlined'/>
                  </Grid>
                  <Grid item>
                      <TextField id='outlined-basic' label='Ingredient Name' variant='outlined'/>
                  </Grid>
                  <Grid item>
                      <TextField id='outlined-basic' label='price' variant='outlined'/>
                  </Grid>
                  <Grid item sx={{ my: 'auto' }}>
                      <Button variant="outlined"> Modify </Button>
                  </Grid>
                </Grid>
            </div>
            <div style={{marginTop:10}}>
              <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                  <Grid item>
                      <TextField id='outlined-basic' label='Ingredient ID' variant='outlined'/>
                  </Grid>
                  <Grid item sx={{ my: 'auto' }}>
                      <Button variant="outlined"> Delete </Button>
                  </Grid>
                </Grid>
            </div>
          </Route>
          <Route path='/users'>
          <Typography variant='h2' align='center'>Users</Typography>
            <Tables columns={user_columns} rows={user_rows} />
            <div>
              <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                  <Grid item>
                      <TextField id='outlined-basic' label='fName' variant='outlined'/>
                  </Grid>
                  <Grid item>
                      <TextField id='outlined-basic' label='lName' variant='outlined'/>
                  </Grid>
                  <Grid item>
                      <TextField id='outlined-basic' label='email' variant='outlined'/>
                  </Grid>
                  <Grid item>
                      <TextField id='outlined-basic' label='zipCode' variant='outlined'/>
                  </Grid>
                  <Grid item sx={{ my: 'auto' }}>
                      <Button variant="outlined"> Add </Button>
                  </Grid>
                </Grid>
            </div>
          </Route>
          <Route path='/shoppingcarts'>
          <Typography variant='h2' align='center'>ShoppingCarts</Typography>
            <Tables columns={cart_columns} rows={cart_rows} />
            <div style={{marginTop:10}}>
              <Grid container spacing={2} sx={{ width: 95 / 100, marginLeft: 'auto', marginRight: 'auto' }}>
                  <Grid item>
                      <TextField id='outlined-basic' label='Ingredient ID' variant='outlined'/>
                  </Grid>
                  <Grid item sx={{ my: 'auto' }}>
                      <Button variant="outlined"> Add </Button>
                  </Grid>
                </Grid>
            </div>
          </Route>
          <Route path='/selectedrecipes'>
          <Typography variant='h2' align='center'>SelectedRecipes</Typography>
            <Tables columns={selected_recipe_columns} rows={selected_recipe_rows} />
          </Route>
          <Route path='/recipeingredients'>
          <Typography variant='h2' align='center'>RecipeIngredients</Typography>
            <Tables columns={recipe_ingr_columns} rows={recipe_ingr_rows} />
          </Route>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
