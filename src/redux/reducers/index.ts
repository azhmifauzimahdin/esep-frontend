import { combineReducers } from "redux";

import patients from "./patient";
import loading from "./loading";
import successMessage from "./successMessage";
import errorMessage from "./errorMessage";
const rootReducer = combineReducers({
  patients,
  loading,
  successMessage,
  errorMessage,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
