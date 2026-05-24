"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface Exam {
  id: number;
  date: string;
  examType: string;
  startTime: string;
  endTime: string;
  subject: { id: number; name: string };
  schoolClass: { id: number; grade: number; section: string };
  teacher: { id: number; fullName: string };
  room: { id: number; name: string };
  examPeriod: { id: number; name: string };
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  schoolClass: { id: number };
}

export default function MarksPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<Record<number, number>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // getDashboard gives us the teacher's students across all their classes
      const [dashboardRes, examsRes] = await Promise.all([
        api.get("/teachers/dashboard"),
        api.get("/exams"),
      ]);

      const dashboard = dashboardRes.data;
      setAllStudents(dashboard.students);

      // Filter exams to only those belonging to the logged-in teacher
      const teacherId = dashboard.teacher.id;
      const teacherExams = (examsRes.data as Exam[]).filter(
        (e) => e.teacher?.id === teacherId,
      );
      setExams(teacherExams);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSelectExam = async (exam: Exam) => {
    setSelectedExam(exam);
    setMarks({});

    // Filter students from dashboard data by the exam's class — no extra API call
    const classStudents = allStudents.filter(
      (s) => s.schoolClass?.id === exam.schoolClass.id,
    );
    setStudents(classStudents);

    // Fetch any existing marks for this exam
    const marksRes = await api.get<{ studentId: number; score: number }[]>(
      `/marks?examId=${exam.id}`,
    );
    const existingMarks: Record<number, number> = {};
    marksRes.data.forEach((m) => {
      existingMarks[m.studentId] = m.score;
    });
    setMarks(existingMarks);
  };

  const handleChange = (studentId: number, value: number) => {
    setMarks((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedExam) return;
    setSaving(true);
    try {
      await api.post("/marks", {
        examId: selectedExam.id,
        records: Object.entries(marks).map(([studentId, score]) => ({
          studentId: Number(studentId),
          marks: score,
        })),
      });
      alert("Marks saved successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to save marks");
    }
    setSaving(false);
  };

  if (loading) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Marks Management</h2>

      <select
        onChange={(e) => {
          const exam = exams.find((ex) => ex.id === Number(e.target.value));
          if (exam) handleSelectExam(exam);
        }}
        defaultValue=""
      >
        <option value="" disabled>
          Select Exam
        </option>
        {exams.map((exam) => (
          <option key={exam.id} value={exam.id}>
            {exam.subject.name} — Grade {exam.schoolClass.grade}-
            {exam.schoolClass.section} — {exam.examType} ({exam.date})
          </option>
        ))}
      </select>

      {selectedExam && students.length === 0 && (
        <p style={{ color: "#6b7280", marginTop: "12px", fontSize: "14px" }}>
          No students found in Grade {selectedExam.schoolClass.grade}-
          {selectedExam.schoolClass.section}.
        </p>
      )}

      {students.length > 0 && (
        <table border={1} cellPadding={10} style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  {student.firstName} {student.lastName}
                </td>
                <td>
                  <input
                    type="number"
                    value={marks[student.id] ?? ""}
                    onChange={(e) =>
                      handleChange(student.id, Number(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {students.length > 0 && (
        <button
          onClick={handleSubmit}
          disabled={saving}
          style={{ marginTop: "12px" }}
        >
          {saving ? "Saving..." : "Save Marks"}
        </button>
      )}
    </div>
  );
}
