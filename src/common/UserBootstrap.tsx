"use client";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useTypedDispatch";
import { fetchUser } from "../redux/auth/authThunk";

export default function UserBootstrap() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return null;
}
