import { RouterProvider } from "react-router-dom";
import appRouter from "./componets/AppRoutes";

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
