const initialState = {
  successMessage: "",
};

const reducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  const { type, payload } = action;

  switch (type) {
    case "SETSUCCESSMESSAGE":
      return {
        ...state,
        successMessage: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
