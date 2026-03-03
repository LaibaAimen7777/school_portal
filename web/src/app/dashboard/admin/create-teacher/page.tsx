"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "@/services/api";

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
    const fetchSubjectss = async () => {
      const res = await api.get("/subject");
      setSubjectList(res.data);
    };
    fetchSubjectss();
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
        { ...formData, subjectIds: selectedSubjects },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setResponseData(res.data);
      alert("Teacher created successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating teacher");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Create Teacher</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization (optional)"
          value={formData.specialization}
          onChange={handleChange}
        />

        <select
          multiple
          value={selectedSubjects}
          onChange={(e) =>
            setSelectedSubjects(
              Array.from(e.target.selectedOptions, (option) => option.value),
            )
          }
        >
          {subjectList.map((subject) => (
            <option key={subject.id} value={subject.id.toString()}>
              {subject.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="hireDate"
          value={formData.hireDate}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Teacher"}
        </button>
      </form>

      {responseData && (
        <div
          style={{ marginTop: "20px", background: "#f4f4f4", padding: "15px" }}
        >
          <h4>Login Credentials</h4>
          <p>
            <strong>Username:</strong> {responseData.username}
          </p>
          <p>
            <strong>Temporary Password:</strong>{" "}
            {responseData.temporaryPassword}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateTeacherPage;
