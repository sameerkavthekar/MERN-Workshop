import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Layout from "./pages/Layout";
import Results from "./pages/Results";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Layout} />
          <Route exact path="/results" component={Results} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
