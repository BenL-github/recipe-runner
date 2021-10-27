import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation';
import Tables from './components/Tables'
import Home from './components/Home';

// DATA (will be retrieved via DB)
const recipe_columns = [
  { field: 'id', headerName: 'ID', width: 75 },
  { field: 'recipeTitle', headerName: 'recipeTame', width: 200 },
  { field: 'recipeServing', headerName: 'recipeServing', type: 'number', width: 150 },
  { field: 'recipeDescription', headerName: 'recipeDescription', width: 800 },
];

const recipe_rows = [
  { id: 1, recipeTitle: 'Chicken Parmesan', recipeServing: 3, recipeDescription:'mmm it taste good'},
  { id: 2, recipeTitle: 'Chicken Noodle Soup', recipeServing: 8, recipeDescription:'good soup'},
  { id: 3, recipeTitle: 'Chicken Tikka Masala', recipeServing: 5, recipeDescription:'mmm it taste good'},
  { id: 4, recipeTitle: 'Chicken Dumpling', recipeServing: 2, recipeDescription:'mmm it taste good'},
];

const ingr_columns = [
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
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const ingr_rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


function App() {
  return (
    <Router>
      <Container maxWidth='false' disableGutters>
        <Navigation />
        <Switch>
          <Route path='/ingredients'>
            <Tables columns={ingr_columns} rows={ingr_rows}/>
          </Route>
          <Route path='/recipes'>
            <Tables columns={recipe_columns} rows = {recipe_rows}/>
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
