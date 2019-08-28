import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/auth" exact></Redirect>
        <Route path="/auth" component={AuthPage}></Route>
        <Route path="/events" component={EventsPage}></Route>
        <Route path="/bookings" component={BookingsPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
