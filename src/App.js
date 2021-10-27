import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation';
import Ingredients from './components/Ingredients';
import Recipes from './components/Recipes';

function App() {
  return (
    <Router>
      <Container maxWidth='false' disableGutters>
        <Navigation />
        <Switch>
          <Route path='/ingredients'>
            <Ingredients/>
          </Route>
          <Route path='/recipes'>
            <Recipes/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
