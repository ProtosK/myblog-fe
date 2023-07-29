import { Routes, Route } from "react-router-dom";

import Home from "../components/Pages/Home";
import Login from "../components/Manage/Login";
import TableUsers from "../components/User/TableUsers";

import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* check if you are an administrator: Route -> map path -> Private class logic -> return Component */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <TableUsers />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
