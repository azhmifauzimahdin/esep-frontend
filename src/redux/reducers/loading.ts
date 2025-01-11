const initialState = {
  loading: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload: boolean }
) => {
  const { type, payload } = action;

  switch (type) {
    case "SETLOADING":
      return {
        ...state,
        loading: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
