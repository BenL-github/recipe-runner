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

const baseURL = "http://localhost:34880/api/"
function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Container maxWidth='100%' disableGutters sx={{
                    overflow: 'auto', height: "100vh ", backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover', backgroundImage: 'url(https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)'
                }}>
                    <Container sx={{ marginBottom: 5 }}>
                        <Navigation />
                        <Switch>
                            {/* Home */}
                            <Route path='/' exact>
                                <Home />
                            </Route>

                            {/* Recipes */}
                            <Route path='/recipes'>
                                <Recipes baseURL={baseURL} />
                            </Route>

                            {/* Ingredients */}
                            <Route path='/ingredients'>
                                <Ingredients baseURL={baseURL} />
                            </Route>

                            {/* Users */}
                            <Route path='/users'>
                                <Users baseURL={baseURL} />
                            </Route>

                            {/* Shopping Carts */}
                            <Route path='/shoppingcarts'>
                                <ShoppingCarts baseURL={baseURL} />
                            </Route>

                            {/* Selected Recipes */}
                            <Route path='/selectedrecipes'>
                                <SelectedRecipes baseURL={baseURL} />
                            </Route>

                            {/* Recipe Ingredients */}
                            <Route path='/recipeingredients'>
                                <RecipeIngredients baseURL={baseURL} />
                            </Route>

                            <Route path='/demo'>
                                <Demo baseURL={baseURL} />
                            </Route>
                        </Switch>
                    </Container>
                </Container>
            </ThemeProvider>
        </Router>
    );
}

export default App;
