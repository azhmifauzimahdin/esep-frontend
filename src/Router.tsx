import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./layouts";
import {
  Dashboard,
  Esep,
  Patients,
  PatientsFinished,
  Unauthorized,
} from "./screens";
import { Authorization } from "./ProtectedRoute";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Authorization />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/finished" element={<PatientsFinished />} />
          </Route>
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/e-sep" element={<Esep />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
