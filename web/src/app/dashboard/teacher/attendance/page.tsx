"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import AttendanceModal from "./components/AttendanceModal";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import {
  Container,
  SectionCard,
  SectionHeader,
  StatsGrid,
  StatCard,
  TableWrapper,
  LoadingContainer,
  DayButton,
  Badge,
} from "@/wrappers/teacherDashboard";

// ── Modern Date Selector Styled Components ─────────────────────────────────
const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const DatePickerWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;

  input[type="date"] {
    background-color: var(--bg-color, #ffffff);
    color: var(--text-color, #0f172a);
    border: 1px solid var(--border-color, #cbd5e1);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 0.85rem;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

    &:hover {
      border-color: #94a3b8;
    }

    &:focus {
      border-color: #0f172a;
      box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
    }
  }
`;

const QuickTodayButton = styled.button`
  background: var(--bg-secondary, #f1f5f9);
  border: 1px solid var(--border-color, #e2e8f0);
  color: var(--text-color, #334155);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;

// Status badge helper styling
const StatusBadge = styled(Badge)<{ $marked?: boolean }>`
  background-color: ${(props) => (props.$marked ? "#dcfce7" : "#fee2e2")};
  color: ${(props) => (props.$marked ? "#15803d" : "#b91c1c")};
  border-color: ${(props) => (props.$marked ? "#bbf7d0" : "#fecaca")};
`;

export default function AttendancePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [existingAttendance, setExistingAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attendanceStatus, setAttendanceStatus] = useState<
    Record<number, boolean>
  >({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/teachers/dashboard");

      const schedulesData = res.data.teacher.schedules || [];
      setSchedules(schedulesData);
      setStudents(res.data.students || []);

      const statusMap: Record<number, boolean> = {};

      await Promise.all(
        schedulesData.map(async (schedule: any) => {
          try {
            const res = await api.get(
              `/attendance?scheduleId=${schedule.id}&date=${selectedDate}`,
            );
            statusMap[schedule.id] = res.data.length > 0;
          } catch {
            statusMap[schedule.id] = false;
          }
        }),
      );

      setAttendanceStatus(statusMap);
    } catch (err) {
      console.error(err);
      setError("Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };

  // Convert "YYYY-MM-DD" string to Localized Day format reliably
  const [year, month, day] = selectedDate.split("-").map(Number);
  const localDateObj = new Date(year, month - 1, day);

  const selectedDay = localDateObj
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  const todaySchedules = schedules.filter((s) => s.dayOfWeek === selectedDay);

  const openAttendance = async (schedule: any) => {
    try {
      // ✅ FIX: Fetch attendance based on selectedDate rather than hardcoded current date
      const res = await api.get(
        `/attendance?scheduleId=${schedule.id}&date=${selectedDate}`,
      );

      const mapped: any = {};
      res.data.forEach((item: any) => {
        mapped[item.student.id] = item.status;
      });

      setExistingAttendance(mapped);
      setSelectedSchedule(schedule);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch attendance details:", err);
      showError("Could not load attendance details");
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      await api.post("/attendance/mark", { ...data, date: selectedDate });
      showSuccess("Attendance Saved");
      setShowModal(false);
      fetchData();
    } catch (err) {
      console.error(err);
      showError("Error saving attendance");
    }
  };

  const handleResetToToday = () => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <LoadingContainer>
        <p>Error: {error}</p>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <SectionCard>
        <SectionHeader>
          <h3>
            Classes for{" "}
            {localDateObj.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h3>

          {/* Clean Integrated Header Controls */}
          <HeaderActions>
            <DatePickerWrapper>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </DatePickerWrapper>
            <QuickTodayButton onClick={handleResetToToday}>
              Today
            </QuickTodayButton>
          </HeaderActions>
        </SectionHeader>

        <StatsGrid style={{ marginTop: "16px" }}>
          <StatCard>
            <div className="label">Scheduled Classes</div>
            <div className="value">{todaySchedules.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">Total Students</div>
            <div className="value">{students.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">Total Subjects</div>
            <div className="value">
              {new Set(todaySchedules.map((s: any) => s.subject?.id)).size}
            </div>
          </StatCard>
        </StatsGrid>

        <TableWrapper style={{ marginTop: "24px" }}>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Class</th>
                <th>Time</th>
                <th>Students</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {todaySchedules.map((schedule) => {
                const classStudents = students.filter(
                  (s) => s.schoolClass?.id === schedule.schoolClass?.id,
                );

                return (
                  <tr key={schedule.id}>
                    <td>
                      <Badge $primary>
                        {schedule.subject?.name || "Unknown"}
                      </Badge>
                    </td>
                    <td>
                      Grade {schedule.schoolClass?.grade}-
                      {schedule.schoolClass?.section}
                    </td>
                    <td>
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: "#0f172a" }}>
                        {classStudents.length}
                      </span>{" "}
                      students
                    </td>
                    <td>
                      <DayButton
                        $active={false}
                        onClick={() => openAttendance(schedule)}
                        style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}
                      >
                        {attendanceStatus[schedule.id]
                          ? "Update"
                          : "Take Attendance"}
                      </DayButton>
                    </td>
                    <td>
                      <StatusBadge $marked={attendanceStatus[schedule.id]}>
                        {attendanceStatus[schedule.id]
                          ? "Marked"
                          : "Not Marked"}
                      </StatusBadge>
                    </td>
                  </tr>
                );
              })}
              {todaySchedules.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      padding: "3rem 1rem",
                      color: "#64748b",
                    }}
                  >
                    No classes scheduled for {selectedDay.toLowerCase()}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableWrapper>
      </SectionCard>

      {/* Modal */}
      {showModal && selectedSchedule && (
        <AttendanceModal
          students={students.filter(
            (s) => s.schoolClass?.id === selectedSchedule.schoolClass?.id,
          )}
          scheduleId={selectedSchedule.id}
          schedule={selectedSchedule}
          existingAttendance={existingAttendance}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          selectedDate={selectedDate}
        />
      )}
    </Container>
  );
}
