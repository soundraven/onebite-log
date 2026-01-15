import App from "@/App";
import GlobalLayout from "@/components/layout/global-layout";
import GuestOnlyLayout from "@/components/layout/guest-only-layout";
import MemberOnlyLayout from "@/components/layout/member-only-layout";
import ForgetPasswordPage from "@/pages/forget-password-page";
import IndexPage from "@/pages/index-page";
import PostDetailPage from "@/pages/post-detail-page";
import ProfileDetailPage from "@/pages/profile-detail-page";
import ResetPasswordPage from "@/pages/reset-password-page";
import SignInPage from "@/pages/sign-in-page";
import SignUpPage from "@/pages/sign-up-page";
import { createBrowserRouter, Navigate } from "react-router";

const router = createBrowserRouter([
  {
    path: "",
    element: <GlobalLayout></GlobalLayout>,
    children: [
      {
        element: <GuestOnlyLayout></GuestOnlyLayout>,
        children: [
          {
            path: "sign-in",
            element: <SignInPage />,
          },
          {
            path: "sign-up",
            element: <SignUpPage />,
          },
          {
            path: "forget-password",
            element: <ForgetPasswordPage />,
          },
        ],
      },

      {
        element: <MemberOnlyLayout></MemberOnlyLayout>,
        children: [
          {
            index: true,
            element: <IndexPage />,
          },
          {
            path: "posts/:id",
            element: <PostDetailPage />,
          },
          {
            path: "profile/:id",
            element: <ProfileDetailPage />,
          },
          {
            path: "reset-password",
            element: <ResetPasswordPage />,
          },
        ],
      },

      // 잘못된 경로 처리
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
