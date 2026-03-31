"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  Container,
  SectionCard,
  SectionHeader,
  SearchInput,
  StudentsGrid,
  StudentCard,
  StudentHeader,
  StudentInitials,
  StudentInfo,
  StudentDetails,
  ParentInfo,
  LoadingContainer,
} from "@/wrappers/teacherDashboard";

export default function TeacherStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await api.get("/teachers/dashboard");
        setStudents(res.data.students || []);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load students data");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <p>Loading students...</p>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <p>Error: {error}</p>
      </LoadingContainer>
    );
  }

  const filtered = students.filter(
    (s) =>
      `${s.firstName} ${s.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      s.rollNumber?.toString().includes(search) ||
      s.schoolClass?.grade?.toString().includes(search),
  );

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <Container>
      <SectionCard>
        <SectionHeader>
          <h3>My Students ({students.length})</h3>
        </SectionHeader>

        <SearchInput
          placeholder="Search by name, roll number, or grade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <StudentsGrid>
          {filtered.map((student) => (
            <StudentCard
              key={student.id}
              $expandable
              onClick={() =>
                setExpandedStudent(
                  expandedStudent === student.id ? null : student.id,
                )
              }
            >
              <StudentHeader>
                <StudentInitials>
                  {getInitials(student.firstName, student.lastName)}
                </StudentInitials>
                <StudentInfo>
                  <h4>
                    {student.firstName} {student.lastName}
                  </h4>
                  <p>Roll No: {student.rollNumber || "N/A"}</p>
                </StudentInfo>
              </StudentHeader>

              <StudentDetails>
                <p>
                  <strong>Class:</strong> Grade {student.schoolClass?.grade}-
                  {student.schoolClass?.section}
                </p>
                <p>
                  <strong>DOB:</strong>{" "}
                  {student.dateOfBirth
                    ? new Date(student.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Gender:</strong> {student.gender || "N/A"}
                </p>
              </StudentDetails>

              {/* Parent Information */}
              {(student.parent?.phone || student.fatherName) && (
                <ParentInfo>
                  <h5>Parent/Guardian</h5>
                  <div className="grid">
                    {student.fatherName && (
                      <p>
                        <strong>Father:</strong> {student.fatherName}
                      </p>
                    )}
                    {student.motherName && (
                      <p>
                        <strong>Mother:</strong> {student.motherName}
                      </p>
                    )}
                    {student.parent?.phone && (
                      <p>
                        <strong>Phone:</strong> {student.parent.phone}
                      </p>
                    )}
                    {student.parent?.email && (
                      <p>
                        <strong>Email:</strong> {student.parent.email}
                      </p>
                    )}
                  </div>
                </ParentInfo>
              )}
            </StudentCard>
          ))}

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                gridColumn: "1/-1",
              }}
            >
              <p>No students found matching your search.</p>
            </div>
          )}
        </StudentsGrid>
      </SectionCard>
    </Container>
  );
}
