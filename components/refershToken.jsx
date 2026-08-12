"use client";

import { useEffect, useState, useRef } from "react";
import api, { setAccessToken } from "@/lib/api";

export default function AuthCheck({ children }) {
  const [loading, setLoading] = useState(true);
  const called = useRef(false); // لمنع تكرار الطلب مرتين في React 18+

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    api.post("/users/refreshToken")
      .then((res) => {
        console.log("Refresh success:", res.data);
        setAccessToken(res.data.accessToken);
      })
      .catch((err) => {
        console.error("Refresh failed:", err.response?.data || err.message);
        setAccessToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white text-2xl">
        Loading Auth Status...
      </div>
    );
  }

  return <>{children}</>;
}