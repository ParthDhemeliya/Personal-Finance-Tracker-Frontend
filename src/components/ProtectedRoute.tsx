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
      const token = getCookie("token");
      console.log("doicyment", document.cookie);
      console.log("token1", token);
      if (!token) {
        const currentPath = window.location.pathname;
        router.replace(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
        return;
      }

      if (token && !user && !hasFetchedUser) {
        try {
          await dispatch(fetchUser()).unwrap();
        } catch {
          localStorage.removeItem("token");
          const currentPath = window.location.pathname;
          router.replace(
            `/login?redirectTo=${encodeURIComponent(currentPath)}`,
          );
          return;
        }
      }

      setIsCheckingAuth(false);
    };

    checkAuthentication();
  }, [dispatch, router, user, hasFetchedUser]);

  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

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

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
