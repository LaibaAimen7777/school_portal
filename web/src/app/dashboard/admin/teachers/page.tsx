// app/teachers/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";
import {
  TeachersContainer,
  TeachersHeader,
  TeachersTitle,
  LoadingMessage,
  TableWrapper,
  StyledTable,
  SubjectBadge,
  EmptyState,
} from "@/wrappers/adminTeacher";

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

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete teacher "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/teachers/${id}`);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      showSuccess("Teacher deleted");
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to delete teacher");
    }
  };

  if (loading) return <LoadingMessage>Loading teachers...</LoadingMessage>;

  return (
    <TeachersContainer>
      <TeachersHeader>
        <TeachersTitle>
          All Teachers
          <span className="star">✦</span>
        </TeachersTitle>
        <div className="decorative-line"></div>
      </TeachersHeader>

      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Username</th>
              <th>Qualification</th>
              <th>Subjects</th>
              <th>Hire Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState>
                    <span className="icon">✧</span>
                    <p>No teachers found</p>
                    <span className="icon">✧</span>
                  </EmptyState>
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>
                    <span className="code-badge">{teacher.teacherCode}</span>
                  </td>
                  <td>
                    <strong>{teacher.fullName}</strong>
                  </td>
                  <td>
                    <span className="username">@{teacher.user?.username}</span>
                  </td>
                  <td>{teacher.qualification || "—"}</td>
                  <td>
                    <div className="subjects-list">
                      {teacher.subjects.map((subject) => (
                        <SubjectBadge key={subject.id}>
                          {subject.name}
                        </SubjectBadge>
                      ))}
                      {teacher.subjects.length === 0 && "—"}
                    </div>
                  </td>
                  <td>{new Date(teacher.hireDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(teacher.id, teacher.fullName)}
                      style={{
                        padding: "4px 0px",
                        borderRadius: "6px",
                        border: "1px solid #fecaca",
                        background: "#fef2f2",
                        color: "#b91c1c",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </TeachersContainer>
  );
}
