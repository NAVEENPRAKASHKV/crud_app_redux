import { createBrowserRouter, Navigate } from "react-router-dom";
import Body from "./user/Body.js";
import UserLoginRegister from "./UserLoginRegister.js";
import ProfileChange from "./user/ProfileChange.js";
import Home from "./user/Home.js";
import { useSelector } from "react-redux";
import AdminPanel from "./admin/AdminPanel.js";

const ProtectedRoutes = ({ element, allowedRoles }) => {
  const userStore = useSelector((store) => store?.user);
  const isAuthenticated = userStore?.isAuthenticated;
  const role = userStore?.role;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;
  return element;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes element={<Body />} allowedRoles={["admin", "user"]} />
    ),
    children: [
      {
        path: "/profilechange",
        element: (
          <ProtectedRoutes
            element={<ProfileChange />}
            allowedRoles={["admin", "user"]}
          />
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoutes
            element={<Home />}
            allowedRoles={["admin", "user"]}
          />
        ),
      },
      {
        path: "/admin/admindashboard",
        element: (
          <ProtectedRoutes element={<AdminPanel />} allowedRoles={["admin"]} />
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <UserLoginRegister />,
  },
]);

export default appRouter;
