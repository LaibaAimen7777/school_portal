"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "teacher") {
      router.replace("/dashboard");
      return;
    }

    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return <>{children}</>;
}
