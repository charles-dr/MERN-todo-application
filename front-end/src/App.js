import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './App.css';

const HomePage = React.lazy(() => import('./pages'));
const ErrorPage = React.lazy(() => import('./pages/error'));


function App() {
  return (
    <>
      <Suspense fallback={"loading..."}>
        <Router>
          <Switch>
            <Route 
              path="/"
              render={props => <HomePage {...props} />}
            />
            <Route 
              path='/error'
              exact
              render={props => <ErrorPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
