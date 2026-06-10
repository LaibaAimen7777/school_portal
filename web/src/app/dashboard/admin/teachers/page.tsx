"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";
import {
  TeachersContainer,
  TeachersHeader,
  TeachersTitle,
  AddButton,
  LoadingMessage,
  TableWrapper,
  StyledTable,
  SubjectBadge,
  DeleteButton,
  EmptyState,
} from "@/wrappers/adminTeacher";
import { FaChalkboardTeacher, FaPlus, FaTrash } from "react-icons/fa";

interface SubjectGrade {
  id: number;
  grade: number;
  subject: {
    id: number;
    name: string;
  };
}

interface Teacher {
  id: number;
  teacherCode: string;
  fullName: string;
  qualification: string;
  hireDate: string;
  subjectGrades: SubjectGrade[];
  user: {
    username: string;
  };
}

export default function TeachersPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/teachers")
      .then((res) => setTeachers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
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
          <FaChalkboardTeacher />
          All Teachers
        </TeachersTitle>
        <AddButton
          onClick={() => router.push("/dashboard/admin/create-teacher")}
        >
          <FaPlus />
          Add Teacher
        </AddButton>
      </TeachersHeader>

      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Username</th>
              <th>Qualification</th>
              <th>Subjects &amp; Grades</th>
              <th>Hire Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <EmptyState>
                    <FaChalkboardTeacher />
                    <p>No teachers found</p>
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
                      {(teacher.subjectGrades ?? []).length === 0 ? (
                        <span>—</span>
                      ) : (
                        (teacher.subjectGrades ?? []).map((tsg) => (
                          <SubjectBadge key={tsg.id}>
                            {tsg.subject?.name} — G{tsg.grade}
                          </SubjectBadge>
                        ))
                      )}
                    </div>
                  </td>
                  <td>
                    {teacher.hireDate
                      ? new Date(teacher.hireDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <DeleteButton
                      onClick={() => handleDelete(teacher.id, teacher.fullName)}
                    >
                      <FaTrash />
                      Delete
                    </DeleteButton>
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
