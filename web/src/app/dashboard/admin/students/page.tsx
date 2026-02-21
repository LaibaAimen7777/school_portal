"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Wrapper } from "@/wrappers/adminStudents";
import { useRouter } from "next/navigation";

type Student = {
  id: number;
  username: string;
  rollNumber: number;
  joiningYear: number;
  schoolClass: {
    grade: number;
    section: string;
  };
};

export default function AdminStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.get("/student");
      console.log("res in student page in admin:", res.data);
      setStudents(res.data);
    };
    fetchStudents();
  }, []);

  const resetPassword = async (id: number) => {
    const res = await api.patch(`/student/${id}/reset-password`);
    alert(`New Password: ${res.data.temporaryPassword}`);
  };

  const changeClass = async (id: number) => {
    const newClassId = prompt("Enter new class ID");
    if (!newClassId) return;
    await api.patch(`/student/${id}/change-class`, {
      classId: Number(newClassId),
    });
    alert("Class updated");
  };

  return (
    <Wrapper>
      <div className="header">
        <h1>Student Management</h1>
        <button onClick={() => router.push("/dashboard/admin/create-student")}>
          + Create Student
        </button>
      </div>

      <div className="grid">
        {students.map((student) => (
          <div className="card" key={student.id}>
            <h3>{student.username}</h3>
            <p>
              <strong>Roll:</strong> {student.rollNumber}
            </p>
            <p>
              <strong>Grade:</strong> {student.schoolClass.grade}
            </p>
            <p>
              <strong>Section:</strong> {student.schoolClass.section}
            </p>
            <p>
              <strong>Year:</strong> {student.joiningYear}
            </p>

            <div className="actions">
              <button
                className="reset"
                onClick={() => resetPassword(student.id)}
              >
                Reset
              </button>
              <button
                className="change"
                onClick={() => changeClass(student.id)}
              >
                Change
              </button>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
