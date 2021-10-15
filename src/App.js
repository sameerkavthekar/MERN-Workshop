import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import Layout from "./pages/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Layout} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
