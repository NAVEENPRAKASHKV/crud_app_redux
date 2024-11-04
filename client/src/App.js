import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./componets/Body";
import AdminLogin from "./componets/AdminLogin";
import UserLoginRegister from "./componets/UserLoginRegister.js";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
    },
    {
      path: "/adminlogin",
      element: <AdminLogin />,
    },
    {
      path: "/login",
      element: <UserLoginRegister />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
}

export default App;
