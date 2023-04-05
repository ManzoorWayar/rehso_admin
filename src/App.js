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

const Prefetch = lazy(() => import("./features/auth/PreFetch"));
const AppProvider = lazy(() => import("./components/layout/AppProvider"));

const Login = lazy(() => import("./pages/auth/Login"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));

const Faq = lazy(() => import("./pages/FAQ/Faq"));
const SingleFaq = lazy(() => import("./pages/FAQ/SingleFaq"));
const ContactUS = lazy(() => import("./pages/contactUs/ContactUs"));
const PackageService = lazy(() =>
  import("./pages/packageService/PackageService")
);
const Job = lazy(() => import("./pages/job/Job"));
const Packages = lazy(() => import("./pages/packages/Packages"));
const User = lazy(() => import("./pages/users/User"));
const Blog = lazy(() => import("./pages/blogs/Blog"));
const SingleBlog = lazy(() => import("./pages/blogs/SingelBlog"));
const CreatePackage = lazy(() => import("./pages/packages/CreatePackage"));
const EditPackage = lazy(() => import("./pages/packages/EditPackage"));
const Chat = lazy(() => import("./pages/chat/Chat"));

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
              <Route
                path="faq"
                element={
                  <Protected role="media">
                    <Faq />
                  </Protected>
                }
              />
              <Route
                path="faq/:id"
                element={
                  <Protected role="media">
                    <SingleFaq />
                  </Protected>
                }
              />
              <Route
                path="contact-us"
                element={
                  <Protected>
                    <ContactUS />
                  </Protected>
                }
              />
              <Route
                path="package-services"
                element={
                  <Protected role="sales">
                    <PackageService />
                  </Protected>
                }
              />

              <Route
                path="jobs"
                element={
                  <Protected>
                    <Job />
                  </Protected>
                }
              />

              <Route path="packages">
                <Route index element={<Packages />} />
                <Route path="create" element={<CreatePackage />} />
                <Route path="edit/:id" element={<EditPackage />} />
              </Route>

              <Route path="blogs" element={<Blog />} />
              <Route path="blogs/:id" element={<SingleBlog />} />

              <Route path="chat" element={<Chat />} />
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
