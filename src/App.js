import { Provider } from "react-redux";
import Router from "./routes";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
// import logo from "./logo.svg";
import store from "./redux/store/store";
import "./App.css";
import { theme } from "./theme";

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
