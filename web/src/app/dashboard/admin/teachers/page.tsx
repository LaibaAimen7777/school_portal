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
  TableWrapper,
  StyledTable,
  SubjectBadge,
  DeleteButton,
  EmptyState,
  ActionGroup,
  EditButton,
} from "@/wrappers/adminTeacher";
import { FaChalkboardTeacher, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import EditTeacherModal from "@/components/ui/EditTeacherModal";

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
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTeachers = teachers.filter((teacher) => {
    const searchLower = search.toLowerCase();

    const matchesName = teacher.fullName?.toLowerCase().includes(searchLower);

    const matchesSubject = (teacher.subjectGrades ?? []).some((tsg) =>
      tsg.subject?.name?.toLowerCase().includes(searchLower),
    );

    return matchesName || matchesSubject;
  });

  useEffect(() => {
    api
      .get("/teachers")
      .then((res) => setTeachers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    api
      .get("/subject/by-grade")
      .then((res) => console.log("subject by grade", res.data))
      .catch(console.error);
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

  if (loading) return <LoadingOverlay></LoadingOverlay>;

  return (
    <TeachersContainer>
      <TeachersHeader>
        <div style={{ margin: "12px 0" }}>
          <input
            type="text"
            placeholder="Search by teacher name or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
        </div>
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
              filteredTeachers.map((teacher) => (
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
                    <ActionGroup>
                      <EditButton
                        onClick={() => {
                          setEditingTeacher(teacher);
                          setIsEditOpen(true);
                        }}
                      >
                        <FaEdit />
                        Edit
                      </EditButton>

                      <DeleteButton
                        onClick={() =>
                          handleDelete(teacher.id, teacher.fullName)
                        }
                      >
                        <FaTrash />
                        Delete
                      </DeleteButton>
                    </ActionGroup>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </StyledTable>
      </TableWrapper>
      <EditTeacherModal
        teacher={editingTeacher}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdated={() => {
          api.get("/teachers").then((res) => setTeachers(res.data));
        }}
      />
    </TeachersContainer>
  );
}
