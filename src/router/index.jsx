import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home";
import { PostPage } from "@/pages/products";
import AuthLayout from "@/layouts/auth-layout";
import { ProtectedRoutes } from "@/components/auth/protectedRoutes";
import MainLayout from "@/layouts/main-layout";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/notfound";
import RegisterPage from "@/pages/register";
import ThreePage from "@/pages/three";
import FourPage from "@/pages/four";
import FivePage from "@/pages/five";
import SevenPage from "@/pages/seven";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/post",
            element: <PostPage />,
          },
          {
            path: "/73",
            element: <ThreePage />,
          },
          {
            path: "/74",
            element: <FourPage />,
          },
          {
            path: "/75",
            element: <FivePage />,
          },
          {
            path: "/97",
            element: <SevenPage />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
