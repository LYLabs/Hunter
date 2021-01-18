import React, { useState } from 'react';
import DashboardContainer from './components/pages/Dashboard/DashboardContainer';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Signup from './components/pages/Signup/Signup';
import Signin from './components/pages/Signin/Signin';
import GlobalStyle from './style/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import LightTheme from './components/themes/light';
import DarkTheme from './components/themes/dark';

const App = () => {
  const [theme, setTheme] = useState(LightTheme);
  return (
    <ThemeProvider
      theme={{
        ...theme,
        setTheme: () => {
          setTheme((theme) => (theme.id === 'light' ? DarkTheme : LightTheme));
        },
      }}
    >
      <GlobalStyle />
      <Switch>
        <Route exact path="/signin">
          <Signin />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <PrivateRoute exact path="/">
          <DashboardContainer />
        </PrivateRoute>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
