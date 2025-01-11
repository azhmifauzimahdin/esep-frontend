import { useSelector } from "react-redux";
import "./App.css";
import Router from "./Router";
import { RootState } from "./redux/reducers";
import { Alert } from "./components";

function App() {
  const successMessage = useSelector(
    (state: RootState) => state.successMessage.successMessage
  );
  const errorMessage = useSelector(
    (state: RootState) => state.errorMessage.errorMessage
  );
  return (
    <>
      <Alert type="success" hidden={successMessage ? false : true}>
        {successMessage}
      </Alert>
      <Alert type="danger" hidden={errorMessage.length > 0 ? false : true}>
        {errorMessage.map((data) => (data ? data + " " : ""))}
      </Alert>
      <Router />
    </>
  );
}

export default App;
