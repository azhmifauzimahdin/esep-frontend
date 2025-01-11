const initialState = {
  errorMessage: [],
};

const reducer = (
  state = initialState,
  action: { type: string; payload: string[] }
) => {
  const { type, payload } = action;

  switch (type) {
    case "SETERRORMESSAGE":
      return {
        ...state,
        errorMessage: payload,
      };
    case "ADDERRORMESSAGE":
      return {
        ...state,
        errorMessage: [...state.errorMessage, payload],
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
