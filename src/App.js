import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useEffect, useDispatch, useSelector } from "./lib/imported";
import LeaguesList from "./components/Leagues/List";
import Details from "./components/Leagues/Details";
import TeamsList from "./components/Teams/List";
import TeamDetails from "./components/Teams/Details";
import SelectorList from "./components/VideoGames/SelectorList";
import { getGames } from "./js/GamesSlice";

function App() {
  const { games, loading } = useSelector((state) => state.games);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/leagues" className="nav-link">
                  List Leagues
                </Link>
              </li>
              <li>
                <Link to="/teams" className="nav-link">
                  List Teams
                </Link>
              </li>
              <li>
                <SelectorList games={games} />
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/">
              <Redirect to="/leagues" />
            </Route>
            <Route exact path="/Leagues" component={LeaguesList} />
            <Route path="/Leagues/:leagueId" component={Details} />
            <Route exact path="/Teams" component={TeamsList} />
            <Route path="/Teams/:teamId" component={TeamDetails} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
