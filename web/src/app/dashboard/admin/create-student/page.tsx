"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Wrapper } from "@/wrappers/adminCreateStudent";

type Section = {
  id: number;
  section: string;
  currentStrength: number;
  maxStrength: number;
};

type Grade = {
  id: number;
  grade: number;
};

export default function CreateStudentPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [joiningYear, setJoiningYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchGrades = async () => {
      const res = await api.get("/schoolClass/grades");
      setGrades(res.data);
    };
    fetchGrades();
  }, []);

  const handleGradeChange = async (gradeId: number) => {
    setSelectedGrade(gradeId);
    const res = await api.get(`/schoolClass/sections?gradeId=${gradeId}`);
    setSections(res.data);
  };

  const handleSubmit = async () => {
    if (!selectedGrade || !selectedSection)
      return alert("Select grade and section");
    try {
      const res = await api.post("/student", {
        gradeId: selectedGrade,
        sectionId: selectedSection,
        joiningYear,
      });
      alert(
        `Student created!\nUsername: ${res.data.username}\nTemp Password: ${res.data.temporaryPassword}`,
      );
    } catch (err) {
      console.error(err);
      alert("Failed to create student");
    }
  };

  return (
    <Wrapper>
      <div className="card">
        <h1>Create Student</h1>

        <label>Grade</label>
        <select onChange={(e) => handleGradeChange(Number(e.target.value))}>
          <option value="">Select Grade</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.grade}
            </option>
          ))}
        </select>

        <label>Section</label>
        <select onChange={(e) => setSelectedSection(Number(e.target.value))}>
          <option value="">Select Section</option>
          {sections.map((s) => (
            <option
              key={s.id}
              value={s.id}
              disabled={s.currentStrength >= s.maxStrength}
            >
              {s.section} ({s.currentStrength}/{s.maxStrength})
            </option>
          ))}
        </select>

        <label>Joining Year</label>
        <input
          type="number"
          value={joiningYear}
          onChange={(e) => setJoiningYear(Number(e.target.value))}
        />

        <button onClick={handleSubmit}>Create Student</button>
      </div>
    </Wrapper>
  );
}
