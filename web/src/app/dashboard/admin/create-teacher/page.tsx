"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";
import {
  DashboardHeaderCard,
  UserIconWrapper,
} from "@/wrappers/adminLayoutStyles";
import {
  Container,
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
import {
  FaChalkboardTeacher,
  FaUser,
  FaGraduationCap,
  FaCalendarAlt,
  FaBookOpen,
  FaPlus,
  FaTrashAlt,
  FaPrint,
  FaDownload,
  FaExclamationCircle,
} from "react-icons/fa";

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
      .catch((err) => {
        console.error(err);
        showError("Failed to load subjects");
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const gradesForSubject = (subjectId: string): number[] => {
    if (!subjectId) return GRADES;
    const subject = subjectList.find((s) => s.id === Number(subjectId));
    return subject?.grades?.length ? subject.grades : GRADES;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      showSuccess("Teacher created successfully!");
      setFormData({ fullName: "", qualification: "", hireDate: today });
      setRows([{ subjectId: "", grade: "" }]);
    } catch (err: any) {
      showError(err.response?.data?.message || "Error creating teacher");
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
        {/* UNIFIED PAGE HEADER */}
        <DashboardHeaderCard>
          <div className="header-left">
            <UserIconWrapper>
              <FaChalkboardTeacher />
            </UserIconWrapper>
            <h1>CREATE TEACHER</h1>
          </div>
        </DashboardHeaderCard>

        {/* FORM CONTAINER */}
        <div className="form-card">
          <Form onSubmit={handleSubmit}>
            {/* TEACHER DETAILS SECTION */}
            <div className="form-section">
              <div className="section-header">
                <span className="step-badge">1</span>
                <h3>Teacher Information</h3>
              </div>

              <div className="input-grid">
                <FormGroup>
                  <Label htmlFor="fullName">
                    <FaUser className="field-icon" /> Full Name
                  </Label>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Dr. Sarah Connor"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="qualification">
                    <FaGraduationCap className="field-icon" /> Qualification
                  </Label>
                  <Input
                    type="text"
                    id="qualification"
                    name="qualification"
                    placeholder="e.g., M.Sc Mathematics, B.Ed"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="hireDate">
                    <FaCalendarAlt className="field-icon" /> Hire Date
                  </Label>
                  <Input
                    type="date"
                    id="hireDate"
                    name="hireDate"
                    value={formData.hireDate}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            {/* SUBJECT & GRADE ASSIGNMENTS SECTION */}
            <div className="form-section">
              <SubjectsSection>
                <SubjectsTitle>
                  <div className="section-header">
                    <span className="step-badge">2</span>
                    <h3>Subject &amp; Grade Assignments</h3>
                  </div>
                  <SelectedCount>
                    {rows.filter((r) => r.subjectId && r.grade).length} Assigned
                  </SelectedCount>
                </SubjectsTitle>

                <div className="assignment-rows">
                  {rows.map((row, index) => (
                    <div key={index} className="assignment-row">
                      <div className="select-wrapper">
                        <Label>
                          <FaBookOpen className="field-icon" /> Subject
                        </Label>
                        <select
                          value={row.subjectId}
                          onChange={(e) =>
                            handleRowSubjectChange(index, e.target.value)
                          }
                        >
                          <option value="">Select subject</option>
                          {subjectList.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="select-wrapper">
                        <Label>Grade Level</Label>
                        <select
                          value={row.grade}
                          onChange={(e) =>
                            handleRowGradeChange(index, e.target.value)
                          }
                          disabled={!row.subjectId}
                        >
                          <option value="">
                            {row.subjectId
                              ? "Select grade"
                              : "Select subject first"}
                          </option>
                          {gradesForSubject(row.subjectId).map((g) => (
                            <option key={g} value={g}>
                              Grade {g}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        className="remove-row-btn"
                        onClick={() => removeRow(index)}
                        disabled={rows.length === 1}
                        title="Remove Assignment"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  ))}
                </div>

                {rowError && (
                  <div className="status-banner error">
                    <FaExclamationCircle />
                    <span>{rowError}</span>
                  </div>
                )}

                <button type="button" className="add-row-btn" onClick={addRow}>
                  <FaPlus /> Add Subject / Grade Pair
                </button>
              </SubjectsSection>

              <div className="form-submit-row">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Teacher"}
                </Button>
              </div>
            </div>
          </Form>

          {/* GENERATED CREDENTIALS CARD */}
          {responseData && (
            <div className="credentials-section">
              <CredentialCard id="credentialCard">
                <CredentialHeader>
                  <ResponseTitle>Teacher Access Credentials</ResponseTitle>
                  <PrintButton onClick={() => window.print()}>
                    <FaPrint /> Print Card
                  </PrintButton>
                </CredentialHeader>
                <ResponseItem>
                  <strong>Username:</strong> {responseData.username}
                </ResponseItem>
                <ResponseItem>
                  <strong>Temporary Password:</strong>{" "}
                  <PasswordValue>
                    {responseData.temporaryPassword}
                  </PasswordValue>
                </ResponseItem>
              </CredentialCard>

              <ButtonGroup>
                <PDFButton onClick={() => downloadPDF(responseData.username)}>
                  <FaDownload /> Download Credential PDF
                </PDFButton>
              </ButtonGroup>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default CreateTeacherPage;
