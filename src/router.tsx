import HomePage from "./App/HomePage";
import MainLayout from "./components/Layout/MainLayout";
import LoginPage from "./App/LoginPage";
import ProtectedRoute from './ProtectedRoute';
import STE from "./components/Home/STE";

const router = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<HomePage />} />,
      },
      {
        path: "/doubleFlexi",
        element: <ProtectedRoute element={<STE />} />,
      },
      {
        path: "/flexiHealth",
        element: <ProtectedRoute element={<STE />} />,
      },
      {
        path: "/ste",
        element: <ProtectedRoute element={<STE />} />,
      },
      {
        path: "/studentLife",
        element: <ProtectedRoute element={<STE />} />,
      },
    ],
  },
];

export default router;
