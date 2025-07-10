"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useTypedSelector";
import { useAppDispatch } from "@/hooks/useTypedDispatch";
import { fetchUser } from "@/redux/auth/authThunk";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading, hasFetchedUser } = useAppSelector(
    (state) => state.auth,
  );
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        // No token, redirect to login with current path
        const currentPath = window.location.pathname;
        router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
        return;
      }

      // If we have a token but no user data and haven't fetched yet
      if (token && !user && !hasFetchedUser) {
        try {
          await dispatch(fetchUser()).unwrap();
        } catch (error) {
          // Token is invalid, remove it and redirect to login with current path
          localStorage.removeItem("token");
          const currentPath = window.location.pathname;
          router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
          return;
        }
      }

      setIsCheckingAuth(false);
    };

    checkAuthentication();
  }, [dispatch, router, user, hasFetchedUser]);

  // Show loading while checking authentication
  if (isCheckingAuth || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user after authentication check, don't render anything
  if (!user) {
    return null;
  }

  return <>{children}</>;
}
