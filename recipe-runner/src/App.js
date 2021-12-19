import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation';
import Home from './components/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Recipes from './components/Recipes';
import Ingredients from './components/Ingredients'
import Users from './components/Users'
import ShoppingCarts from './components/ShoppingCarts'
import SelectedRecipes from './components/SelectedRecipes'
import RecipeIngredients from './components/RecipeIngredients';
import Demo from './components/Demo';

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    }
})

const baseURL = "http://localhost:34876/api/"
function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Container maxWidth='false' disableGutters>
                    <Navigation />
                    <Switch>
                        {/* Home */}
                        <Route path='/' exact>
                            <Home />
                        </Route>

                        {/* Recipes */}
                        <Route path='/recipes'>
                            <Recipes baseURL={baseURL}/>
                        </Route>

                        {/* Ingredients */}
                        <Route path='/ingredients'>
                            <Ingredients baseURL={baseURL}/>
                        </Route>

                        {/* Users */}
                        <Route path='/users'>
                            <Users baseURL={baseURL}/>
                        </Route>

                        {/* Shopping Carts */}
                        <Route path='/shoppingcarts'>
                            <ShoppingCarts baseURL={baseURL}/>
                        </Route>

                        {/* Selected Recipes */}
                        <Route path='/selectedrecipes'>
                            <SelectedRecipes baseURL={baseURL}/>
                        </Route>

                        {/* Recipe Ingredients */}
                        <Route path='/recipeingredients'>
                            <RecipeIngredients baseURL={baseURL}/>
                        </Route>

                        <Route path='/demo'>
                            <Demo baseURL={baseURL}/>
                        </Route>
                    </Switch>
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;
