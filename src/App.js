import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation';
import Tables from './components/Tables'
import RecipeInput from './components/RecipeInput'

function App() {
  // DATA (will be retrieved via DB)
  // RECIPES
  const recipe_columns = [
    { field: 'id', headerName: 'ID', width: 75 },
    { field: 'recipeTitle', headerName: 'recipeName', width: 200 },
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
    { field: 'id', headerName: 'ID', width: 75 },
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
    { field: 'id', headerName: 'ID', width: 75 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
        }`,
    },
  ]

  const user_rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]

  // SHOPPING CARTS
  const cart_columns = [
    { field: 'id', headerName: 'ID', width: 75 },
    { field: 'cartOwner', headerName: 'cartOwner', width: 100 },
    // add a function to get the full name of the owner from the user data
  ]

  const cart_rows = [
    { id: 1, cartOwner: 1 },
    { id: 2, cartOwner: 3 },
    { id: 3, cartOwner: 6 },
    { id: 4, cartOwner: 9 }
  ]

  // SELECTED RECIPES
  const selected_recipe_columns = [
    { field: 'id', headerName: 'ID', width: 75 },
    // should be pulled from shopping carts
    { field: 'cartID', headerName: 'cartID', width: 75 },
    { field: 'recipeID', headername: 'recipeID', width: 100 },
    // should be pulled from recipes
    { field: 'recipeTitle', headername: 'recipeName', width: 200 }
  ]

  const selected_recipe_rows = [
    { id: 1, cartID: 1, recipeID: 1, recipeTitle: "Chicken Breast" },
    { id: 2, cartID: 1, recipeID: 2, recipeTitle: "Chicken Noodle Soup" },
    { id: 3, cartID: 1, recipeID: 4, recipeTitle: "Chicken Dumpling" },
  ]

  // RECIPE INGREDIENTS
  const recipe_ingr_columns = [
    { field: 'id', headerName: "ID", width: 75 },
    { field: 'recipeID', headerName: 'recipeID', width: 125 },
    // pull from recipes
    { field: 'recipeName', headername: 'recipeName', width: 200 },
    { field: 'ingredientID', headername: "ingredientID", width: 125 },
    // pull from ingredients
    { field: 'ingredientName', headername: 'ingredientName', width: 200 },
    { field: 'uom', headerName: "unit of measurement", width: 200 },

  ]

  const recipe_ingr_rows = [
    { id: 1, recipeID: 1, recipeName: "Chicken Breast", ingredientID: 1, ingredientName: "Chicken Breast", uom: "1 white meat chicken breast" },
    { id: 2, recipeID: 1, recipeName: 'Chicken Breast', ingredientID: 200, ingredientName: 'Sea Salt', uom: '2 tsp' },
    { id: 3, recipeID: 1, recipeName: 'Chicken Breast', ingredientID: 201, ingredientName: 'Black Pepper', uom: '1 tsp' },
    { id: 4, recipeID: 1, recipeName: 'Chicken Breast', ingredientID: 4200, ingredientName: 'Olive Oil', uom: '2 tbsp' },
  ]

  return (
    <Router>
      <Container maxWidth='false' disableGutters>
        <Navigation />
        <Switch>
          <Route path='/recipes'>
            <Tables columns={recipe_columns} rows={recipe_rows} />
            <RecipeInput buttonText={'Create New Recipe'} onNewRecipe={onNewRecipe} />
          </Route>
          <Route path='/ingredients'>
            <Tables columns={ingr_columns} rows={ingr_rows} />
          </Route>
          <Route path='/users'>
            <Tables columns={user_columns} rows={user_rows} />
          </Route>
          <Route path='/shoppingcarts'>
            <Tables columns={cart_columns} rows={cart_rows} />
          </Route>
          <Route path='/selectedrecipes'>
            <Tables columns={selected_recipe_columns} rows={selected_recipe_rows} />
          </Route>
          <Route path='/recipeingredients'>
            <Tables columns={recipe_ingr_columns} rows={recipe_ingr_rows} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
