import React from 'react'
import ProblemsPage from './components/ProblemsPage'
import ComparePage from './components/ComparePage'
import StandingsPage from './components/StandingsPage'
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
