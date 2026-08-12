"use client";

import { useEffect, useState } from "react";
import api, { setAccessToken } from "@/lib/api";

export default function AuthCheck({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .post("/users/refershToken", {}, { withCredentials: true })
      .then((res) => {
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setAccessToken(null);
      })
      .finally(() => {
        setLoading(false); // وقف حالة التحميل بعد انتهاء الطلب
      });
  }, []);

  // انتظر ولا تعرض الصفحة حتى ينتهي طلب التوكن
  if (loading) {
    return null; // أو يمكنك وضع شاشة تحميل (Spinner)
  }

  return <>{children}</>;
}