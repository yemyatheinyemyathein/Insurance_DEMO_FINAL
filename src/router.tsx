import HomePage from "./App/HomePage";
import MainLayout from "./components/Layout/MainLayout";
import LoginPage from "./App/LoginPage";
import ProtectedRoute from './ProtectedRoute';
import ProductCalculation from "./components/Home/ProductCalculation";

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
        element: <ProtectedRoute element={<ProductCalculation />} />,
      },
    ],
  },
];

export default router;
