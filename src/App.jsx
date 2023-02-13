import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./config/theme";
import Home from "./pages/Home";
import AuthProvider from "./lib/AuthProvider";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider >
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;
