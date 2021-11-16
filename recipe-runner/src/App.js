import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation';
import Tables from './components/Tables'
import Home from './components/Home';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

import Recipes from './components/Recipes';
import Ingredients from './components/Ingredients'
import Users from './components/Users'
import ShoppingCarts from './components/ShoppingCarts'
import SelectedRecipes from './components/SelectedRecipes'
import RecipeIngredients from './components/RecipeIngredients';
import TestingForm from './components/test';
function App() {
    return (
        <Router>
            <Container maxWidth='false' disableGutters>
                <Navigation />
                <Switch>
                    {/* Home */}
                    <Route path='/' exact>
                        <Home />
                    </Route>

                    {/* Recipes */}
                    <Route path='/recipes'>
                        <Recipes />
                    </Route>

                    {/* Ingredients */}
                    <Route path='/ingredients'>
                        <Ingredients />
                    </Route>

                    {/* Users */}
                    <Route path='/users'>
                        <Users />
                    </Route>

                    {/* Shopping Carts */}
                    <Route path='/shoppingcarts'>
                        <ShoppingCarts />
                    </Route>

                    {/* Selected Recipes */}
                    <Route path='/selectedrecipes'>
                        <SelectedRecipes />
                    </Route>

                    {/* Recipe Ingredients */}
                    <Route path='/recipeingredients'>
                        <RecipeIngredients />
                    </Route>

                    <Route path='/testing'>
                        <TestingForm />
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
}

export default App;
