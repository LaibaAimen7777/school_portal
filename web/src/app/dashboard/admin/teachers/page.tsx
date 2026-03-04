"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/services/api";

interface Subject {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  teacherCode: string;
  fullName: string;
  qualification: string;
  hireDate: string;
  subjects: Subject[];
  user: {
    username: string;
  };
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await api.get("/teachers");

        setTeachers(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Teachers</h2>

      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Username</th>
            <th>Qualification</th>
            <th>Subjects</th>
            <th>Hire Date</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.teacherCode}</td>
              <td>{teacher.fullName}</td>
              <td>{teacher.user?.username}</td>
              <td>{teacher.qualification}</td>
              <td>{teacher.subjects.map((s) => s.name).join(", ")}</td>
              <td>{teacher.hireDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
