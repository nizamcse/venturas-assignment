import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
// import { PrivateRoute } from './routes/private-route';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/login';
import Car from './pages/Car';
import City from './pages/City';
import User from './pages/User';
import { LoginRoute } from './routes/login-route';
import MapView from './pages/MapView';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Car />} />
            <Route path="city" element={<City />} />
            <Route path="user" element={<User />} />
            <Route path="tracking" element={<MapView />} />
          </Route>
          <Route path="/login" element={<LoginRoute />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </ThemeProvider>
);
export default App;
