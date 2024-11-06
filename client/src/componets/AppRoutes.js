import { createBrowserRouter, Navigate } from "react-router-dom";
import Body from "./user/Body.js";
import AdminLogin from "./admin/AdminLogin.js";
import UserLoginRegister from "./UserLoginRegister.js";
import ProfileChange from "./user/ProfileChange.js";
import Home from "./user/Home.js";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ element }) => {
  const isAuthenticated = useSelector((store) => store?.user?.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes element={<Body />} />,
    children: [
      {
        path: "/profilechange",
        element: <ProfileChange />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
  {
    path: "adminlogin",
    element: <AdminLogin />,
  },
  {
    path: "/login",
    element: <UserLoginRegister />,
  },
]);

export default appRouter;
