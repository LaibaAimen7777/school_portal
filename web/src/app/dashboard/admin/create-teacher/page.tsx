"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "@/services/api";
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  SubjectsSection,
  SubjectsTitle,
  SelectedCount,
  Button,
  ResponseTitle,
  ResponseItem,
  CredentialCard,
  CredentialHeader,
  PrintButton,
  PDFButton,
  ButtonGroup,
  PasswordValue,
  PrintStyles,
} from "@/wrappers/adminCreateTeacher";

interface TeacherResponse {
  teacherId: number;
  username: string;
  temporaryPassword: string;
}

interface Subject {
  id: number;
  name: string;
  grades: number[];
}

interface SubjectGradeRow {
  subjectId: string;
  grade: string;
}

const GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const CreateTeacherPage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    fullName: "",
    qualification: "",
    hireDate: today,
  });

  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  // Each row is one subject+grade combo
  const [rows, setRows] = useState<SubjectGradeRow[]>([
    { subjectId: "", grade: "" },
  ]);
  const [responseData, setResponseData] = useState<TeacherResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [rowError, setRowError] = useState("");

  useEffect(() => {
    api
      .get("/subject")
      .then((res) => setSubjectList(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // When subject changes in a row, reset the grade for that row
  const handleRowSubjectChange = (index: number, subjectId: string) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { subjectId, grade: "" };
      return next;
    });
    setRowError("");
  };

  const handleRowGradeChange = (index: number, grade: string) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], grade };
      return next;
    });
    setRowError("");
  };

  const addRow = () => {
    setRows((prev) => [...prev, { subjectId: "", grade: "" }]);
  };

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  // Grades available for a subject (from subject.grades, or all if not set)
  const gradesForSubject = (subjectId: string): number[] => {
    if (!subjectId) return GRADES;
    const subject = subjectList.find((s) => s.id === Number(subjectId));
    return subject?.grades?.length ? subject.grades : GRADES;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate — every row must have both subject and grade filled
    const filledRows = rows.filter((r) => r.subjectId && r.grade);
    if (filledRows.length === 0) {
      setRowError("Add at least one subject and grade assignment.");
      return;
    }
    const incomplete = rows.some(
      (r) => (r.subjectId && !r.grade) || (!r.subjectId && r.grade),
    );
    if (incomplete) {
      setRowError("Each row must have both a subject and a grade selected.");
      return;
    }

    // Check for duplicate subject+grade combos
    const keys = filledRows.map((r) => `${r.subjectId}-${r.grade}`);
    if (new Set(keys).size !== keys.length) {
      setRowError(
        "Duplicate subject+grade combinations found. Remove duplicates.",
      );
      return;
    }

    setRowError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/teachers",
        {
          ...formData,
          subjectGrades: filledRows.map((r) => ({
            subjectId: Number(r.subjectId),
            grade: Number(r.grade),
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setResponseData(res.data);
      alert("Teacher created successfully!");
      setFormData({ fullName: "", qualification: "", hireDate: today });
      setRows([{ subjectId: "", grade: "" }]);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating teacher");
    }

    setLoading(false);
  };

  const downloadPDF = async (username: string) => {
    const element = document.getElementById("credentialCard");
    if (!element) return;
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`Teacher-${username}-Credentials.pdf`);
  };

  useEffect(() => {
    if (responseData) {
      setTimeout(() => downloadPDF(responseData.username), 300);
    }
  }, [responseData]);

  return (
    <>
      <PrintStyles />
      <Container>
        <Title>Create Teacher</Title>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter teacher's full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="qualification">Qualification</Label>
            <Input
              type="text"
              id="qualification"
              name="qualification"
              placeholder="e.g., M.Sc, B.Ed"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="hireDate">Hire Date</Label>
            <Input
              type="date"
              id="hireDate"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleChange}
            />
          </FormGroup>

          {/* ── Subject + Grade assignments ── */}
          <SubjectsSection>
            <SubjectsTitle>
              <span>Subject &amp; Grade Assignments</span>
              <SelectedCount>
                {rows.filter((r) => r.subjectId && r.grade).length}
              </SelectedCount>
            </SubjectsTitle>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {rows.map((row, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr auto",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  {/* Subject dropdown */}
                  <select
                    value={row.subjectId}
                    onChange={(e) =>
                      handleRowSubjectChange(index, e.target.value)
                    }
                    style={{
                      padding: "8px 10px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">Select subject</option>
                    {subjectList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>

                  {/* Grade dropdown — shows only grades valid for selected subject */}
                  <select
                    value={row.grade}
                    onChange={(e) =>
                      handleRowGradeChange(index, e.target.value)
                    }
                    disabled={!row.subjectId}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "6px",
                      border: "1px solid #d1d5db",
                      fontSize: "14px",
                      background: !row.subjectId ? "#f9fafb" : "white",
                    }}
                  >
                    <option value="">
                      {row.subjectId ? "Select grade" : "Select subject first"}
                    </option>
                    {gradesForSubject(row.subjectId).map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>

                  {/* Remove row button */}
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    disabled={rows.length === 1}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid #fca5a5",
                      background: rows.length === 1 ? "#f9fafb" : "#fef2f2",
                      color: rows.length === 1 ? "#d1d5db" : "#dc2626",
                      cursor: rows.length === 1 ? "not-allowed" : "pointer",
                      fontSize: "16px",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {rowError && (
              <p
                style={{ color: "#dc2626", fontSize: "13px", marginTop: "8px" }}
              >
                {rowError}
              </p>
            )}

            <button
              type="button"
              onClick={addRow}
              style={{
                marginTop: "10px",
                padding: "7px 16px",
                borderRadius: "6px",
                border: "1px dashed #d1d5db",
                background: "white",
                cursor: "pointer",
                fontSize: "13px",
                color: "#6b7280",
              }}
            >
              + Add another subject/grade
            </button>
          </SubjectsSection>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Teacher"}
          </Button>
        </Form>

        {responseData && (
          <>
            <CredentialCard id="credentialCard">
              <CredentialHeader>
                <ResponseTitle>Login Credentials</ResponseTitle>
                <PrintButton onClick={() => window.print()}>
                  🖨️ Print
                </PrintButton>
              </CredentialHeader>
              <ResponseItem>
                <strong>Username:</strong> {responseData.username}
              </ResponseItem>
              <ResponseItem>
                <strong>Temporary Password:</strong>{" "}
                <PasswordValue>{responseData.temporaryPassword}</PasswordValue>
              </ResponseItem>
            </CredentialCard>
            <ButtonGroup>
              <PDFButton onClick={() => downloadPDF(responseData.username)}>
                📥 Download PDF
              </PDFButton>
            </ButtonGroup>
          </>
        )}
      </Container>
    </>
  );
};

export default CreateTeacherPage;
