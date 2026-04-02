"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

export default function MarksPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [marks, setMarks] = useState<Record<number, number>>({});

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const res = await api.get("/exams");
    setExams(res.data);
  };

  const handleSelectExam = async (exam: any) => {
    setSelectedExam(exam);

    // 1. Fetch students
    const studentsRes = await api.get(
      `/teacher/students?scheduleId=${exam.schedule.id}`,
    );
    setStudents(studentsRes.data);

    // 2. Fetch existing marks
    const marksRes = await api.get(`/teacher/marks?examId=${exam.id}`);

    const existingMarks: Record<number, number> = {};

    marksRes.data.forEach((m: any) => {
      existingMarks[m.studentId] = m.score;
    });

    setMarks(existingMarks);
  };

  const handleChange = (studentId: number, value: number) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSubmit = async () => {
    await api.post("/teacher/marks", {
      examId: selectedExam.id,
      records: Object.entries(marks).map(([studentId, score]) => ({
        studentId: Number(studentId),
        marks: score,
      })),
    });

    alert("Marks saved successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Marks Management</h2>

      {/* Select Exam */}
      <select
        onChange={(e) => {
          const exam = exams.find((ex) => ex.id === Number(e.target.value));
          handleSelectExam(exam);
        }}
      >
        <option>Select Exam</option>
        {exams.map((exam) => (
          <option key={exam.id} value={exam.id}>
            {exam.schedule.subject.name} - Grade{" "}
            {exam.schedule.schoolClass.grade} - {exam.examType} ({exam.date})
          </option>
        ))}
      </select>

      {/* Students Table */}
      {students.length > 0 && (
        <table border={1} cellPadding={10}>
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
                    value={marks[student.id] || ""}
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

      {/* Submit */}
      {students.length > 0 && (
        <button onClick={handleSubmit}>Save Marks</button>
      )}
    </div>
  );
}
