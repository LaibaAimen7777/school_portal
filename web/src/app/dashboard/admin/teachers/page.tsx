// app/teachers/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
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
                </tr>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
    </TeachersContainer>
  );
}
