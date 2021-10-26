import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from '@mui/material/Container';

function App() {
  return (
    <Router>
      <Container maxwidth='lg'>
        <Switch>
          <Route exact path ='/' component={}/>
          <Route path='/recipes' component={}/>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
