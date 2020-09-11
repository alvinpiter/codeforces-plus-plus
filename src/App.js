import React from 'react'
import ProblemsPage from './pages/ProblemsPage'
import ComparePage from './pages/ComparePage'
import StandingsPage from './pages/StandingsPage'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/problems">
          <ProblemsPage />
        </Route>

        <Route path="/compare">
          <ComparePage />
        </Route>

        <Route path="/standings">
          <StandingsPage />
        </Route>

        <Route path="/">
          <ProblemsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
