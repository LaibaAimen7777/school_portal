"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function StudentDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await api.get("/student/me");
    setData(res.data);
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Profile</h2>

      <p>
        <strong>Name:</strong> {data.firstName} {data.lastName}
      </p>

      <p>
        <strong>Class:</strong> Grade {data.grade} - {data.section}
      </p>

      <p>
        <strong>Roll No:</strong> {data.rollNumber}
      </p>

      <p>
        <strong>Joining Year:</strong> {data.joiningYear}
      </p>

      <h3>Parent Info</h3>

      <p>
        <strong>Father:</strong> {data.parent?.fatherName}
      </p>

      <p>
        <strong>Mother:</strong> {data.parent?.motherName}
      </p>

      <p>
        <strong>Phone:</strong> {data.parent?.phone}
      </p>
    </div>
  );
}
