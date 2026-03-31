"use client";

import { useState } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  StudentRow,
  StatusButton,
  CancelButton,
  SubmitButton,
} from "@/wrappers/teacherDashboard";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
}

type Status = "PRESENT" | "ABSENT";

interface Props {
  students: Student[];
  scheduleId: number;
  schedule?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
  existingAttendance?: Record<number, Status>;
}

export default function AttendanceModal({
  students,
  scheduleId,
  schedule,
  onClose,
  onSubmit,
  existingAttendance = {},
}: Props) {
  const [attendance, setAttendance] = useState<Record<number, Status>>(() => {
    const initial: Record<number, Status> = {};
    students.forEach((s) => {
      initial[s.id] = existingAttendance[s.id] || "PRESENT";
    });
    return initial;
  });

  const handleChange = (studentId: number, status: Status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = () => {
    const records = Object.entries(attendance).map(([studentId, status]) => ({
      studentId: Number(studentId),
      status,
    }));

    onSubmit({
      scheduleId,
      date: new Date().toISOString().split("T")[0],
      records,
    });
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const present = Object.values(attendance).filter(
      (s) => s === "PRESENT",
    ).length;
    const absent = total - present;
    return { total, present, absent };
  };

  const stats = getAttendanceStats();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Take Attendance</h2>
          {schedule && (
            <div style={{ marginTop: "0.5rem" }}>
              <p>
                <strong>{schedule.subject?.name}</strong> - Grade{" "}
                {schedule.schoolClass?.grade}
                {schedule.schoolClass?.section}
              </p>
              <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                {schedule.startTime} - {schedule.endTime}
              </p>
            </div>
          )}
        </ModalHeader>

        <ModalBody>
          <div
            style={{
              background: "var(--bg-color)",
              padding: "1rem",
              borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
              marginBottom: "1rem",
              border: "2px solid var(--border-color)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div>
                <strong>Total Students:</strong> {stats.total}
              </div>
              <div style={{ color: "var(--pop-color)" }}>
                <strong>Present:</strong> {stats.present}
              </div>
              <div style={{ color: "var(--text-color)" }}>
                <strong>Absent:</strong> {stats.absent}
              </div>
            </div>
          </div>

          {students.map((student) => (
            <StudentRow key={student.id}>
              <span>
                {student.firstName} {student.lastName}
              </span>
              <div>
                {["PRESENT", "ABSENT"].map((status) => (
                  <StatusButton
                    key={status}
                    $active={attendance[student.id] === status}
                    $status={status as Status}
                    onClick={() => handleChange(student.id, status as Status)}
                  >
                    {status}
                  </StatusButton>
                ))}
              </div>
            </StudentRow>
          ))}
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SubmitButton onClick={handleSubmit}>Save Attendance</SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
}
