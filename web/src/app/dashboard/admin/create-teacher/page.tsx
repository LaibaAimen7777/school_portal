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
  SubjectsGrid,
  SubjectItem,
  CheckboxLabel,
  Checkbox,
  SelectedCount,
  SelectedInfo,
  SelectedSubjectsList,
  SelectedSubjectTag,
  RemoveTagButton,
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
}

const CreateTeacherPage = () => {
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    fullName: "",
    qualification: "",
    specialization: "",
    hireDate: today,
  });

  const [responseData, setResponseData] = useState<TeacherResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get("/subject");
        setSubjectList(res.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/teachers",
        { ...formData, subjectIds: selectedSubjects.map(Number) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setResponseData(res.data);
      alert("Teacher created successfully!");

      // Reset form
      setFormData({
        fullName: "",
        qualification: "",
        specialization: "",
        hireDate: today,
      });
      setSelectedSubjects([]);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating teacher");
    }

    setLoading(false);
  };

  const handleSubjectToggle = (subjectId: string) => {
    const isChecked = selectedSubjects.includes(subjectId);

    if (isChecked) {
      setSelectedSubjects((prev) => prev.filter((id) => id !== subjectId));
    } else {
      if (selectedSubjects.length >= 3) {
        alert("A teacher can select maximum 3 subjects");
        return;
      }
      setSelectedSubjects((prev) => [...prev, subjectId]);
    }
  };

  const handleRemoveSubject = (subjectId: string) => {
    setSelectedSubjects((prev) => prev.filter((id) => id !== subjectId));
  };

  const getSubjectName = (id: string) => {
    return subjectList.find((s) => s.id.toString() === id)?.name || id;
  };

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

          <SubjectsSection>
            <SubjectsTitle>
              <span>Select Subjects</span>
              <SelectedCount>{selectedSubjects.length}</SelectedCount>
            </SubjectsTitle>

            <SubjectsGrid>
              {subjectList.map((subject) => {
                const isChecked = selectedSubjects.includes(
                  subject.id.toString(),
                );

                return (
                  <SubjectItem key={subject.id}>
                    <CheckboxLabel>
                      <Checkbox
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          handleSubjectToggle(subject.id.toString())
                        }
                      />
                      {subject.name}
                    </CheckboxLabel>
                  </SubjectItem>
                );
              })}
            </SubjectsGrid>

            <SelectedInfo>
              <span>Selected: {selectedSubjects.length} / 3 subjects</span>
              {selectedSubjects.length > 0 && (
                <SelectedSubjectsList>
                  {selectedSubjects.map((id) => (
                    <SelectedSubjectTag key={id}>
                      {getSubjectName(id)}
                      <RemoveTagButton
                        type="button"
                        onClick={() => handleRemoveSubject(id)}
                        aria-label="Remove subject"
                      >
                        ×
                      </RemoveTagButton>
                    </SelectedSubjectTag>
                  ))}
                </SelectedSubjectsList>
              )}
            </SelectedInfo>
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
              <PDFButton
                onClick={async () => {
                  const element = document.getElementById("credentialCard");
                  if (!element) return;

                  // Dynamically import libraries to avoid SSR issues
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
                  pdf.save(`Teacher-${responseData.username}-Credentials.pdf`);
                }}
              >
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
