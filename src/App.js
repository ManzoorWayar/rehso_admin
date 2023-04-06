import React, { lazy } from "react";
import Layout from "../src/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import PersistLogin from "./features/auth/PersistLogin";
import NotFound from "./components/common/NotFound";
import Unauthorized from "./components/common/Unauthorized";
import Protected from "./components/common/Protected";
import Volunteer from "./pages/volunteer/Volunteer";

const Prefetch = lazy(() => import("./features/auth/PreFetch"));
const AppProvider = lazy(() => import("./components/layout/AppProvider"));

const Login = lazy(() => import("./pages/auth/Login"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));

const ContactUS = lazy(() => import("./pages/contactUs/ContactUs"));

const User = lazy(() => import("./pages/users/User"));
const Blog = lazy(() => import("./pages/blogs/Blog"));
const SingleBlog = lazy(() => import("./pages/blogs/SingelBlog"));

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppProvider />}>
        <Route index element={<Login />} />

        <Route path="auth">
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route
                path="users"
                element={
                  <Protected>
                    <User />
                  </Protected>
                }
              />

              <Route path="blogs" element={<Blog />} />
              <Route path="blogs/:id" element={<SingleBlog />} />

              <Route path="volunteer" element={<Volunteer />} />


            </Route>
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
