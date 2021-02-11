import { Provider } from "react-redux";
import Router from "./routes";
// import logo from "./logo.svg";
import store from "./redux/store/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
