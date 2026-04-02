"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";

export default function AdminExamsPage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [scheduleId, setScheduleId] = useState<number | null>(null);
  const [examType, setExamType] = useState("Mid");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const res = await api.get("/schedule"); // <-- use the existing schedule controller
      setSchedules(res.data);
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
    }
  };

  const handleCreateExam = async () => {
    if (!scheduleId || !date) {
      //   alert("Please select all fields");
      showError("Please select all fields");
      return;
    }

    await api.post("/exams", {
      scheduleId,
      examType,
      date,
    });

    // alert("Exam created successfully!");
    showSuccess("Exam created successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Exam</h2>

      {/* Select Schedule */}
      <div>
        <label>Class & Subject</label>
        <select onChange={(e) => setScheduleId(Number(e.target.value))}>
          <option>Select Schedule</option>
          {schedules.map((s) => (
            <option key={s.id} value={s.id}>
              {s.subject.name} - Grade {s.schoolClass.grade}
            </option>
          ))}
        </select>
      </div>

      {/* Exam Type */}
      <div>
        <label>Exam Type</label>
        <select value={examType} onChange={(e) => setExamType(e.target.value)}>
          <option value="Mid">Mid</option>
          <option value="Final">Final</option>
          <option value="Quiz">Quiz</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label>Date</label>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
      </div>

      {/* Button */}
      <button onClick={handleCreateExam}>Create Exam</button>
    </div>
  );
}
