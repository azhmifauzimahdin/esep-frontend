import { Patient } from "../../types/patient";

const initialState = {
  patients: [],
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case "SETPATIENT":
      return {
        ...state,
        patients: payload,
      };
    case "MERGEPATIENT": {
      const statefirst = state.patients.map((patient: Patient) => {
        return { ...patient, status: 1 };
      });
      const mergedArray = [...statefirst, ...payload].reduce((map, current) => {
        map.set(current.id, current);
        return map;
      }, new Map());
      const result: Patient[] = Array.from(mergedArray.values());
      result.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );

      return {
        ...state,
        patients: result,
      };
    }

    case "UPDATESTATUSPATIENT":
      return {
        ...state,
        patients: state.patients
          .map((data: Patient) =>
            data.id === payload
              ? {
                  ...data,
                  status: 1,
                  updated_at: new Date().toISOString(),
                  notes: "Selesai",
                }
              : data
          )
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          ),
      };
    case "DELPATIENT":
      return {
        ...state,
        patients: state.patients.filter(
          (patient: Patient) => patient.id !== payload
        ),
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
