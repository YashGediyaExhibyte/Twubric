import { Provider } from "react-redux";
import { TwubricPage } from "./pages/TwubricPage";
import "./App.css";
import store from "./redux/Store";

function App() {
  return (
    <Provider store={store}>
      <TwubricPage />
    </Provider>
  );
}

export default App;
