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
import TeacherHeader from "@/components/ui/TeacherHeader";

// ── Neo-Brutalist Date Selector Components ─────────────────────────────────
const DateBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
  padding: 12px;
  background-color: var(--bg-secondary, #f8fafc);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 16px;
  box-shadow: 0 3px 0 var(--border-color, #1a1a1a);
`;

const ArrowStepper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavIconButton = styled.button`
  background: var(--bg-color, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  color: var(--text-color, #1a1a1a);
  width: 36px;
  height: 36px;
  border-radius: 10px;
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 0 var(--border-color, #1a1a1a);
  transition: all 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 0 var(--border-color, #1a1a1a);
  }
`;

const WeekStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 2px;
  flex: 1;
  justify-content: center;

  /* Custom scrollbar styling for compact look */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

const DayPillCard = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 14px;
  border-radius: 12px;
  border: 2px solid var(--border-color, #1a1a1a);
  background-color: ${(props) =>
    props.$active
      ? "var(--accent-color, #f2b72b)"
      : "var(--bg-color, #ffffff)"};
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.15s ease;
  min-width: 58px;
  box-shadow: ${(props) =>
    props.$active ? "0 3px 0 var(--border-color, #1a1a1a)" : "none"};

  .day-name {
    font-size: 0.68rem;
    font-weight: 900;
    text-transform: uppercase;
    opacity: 0.8;
  }

  .day-num {
    font-size: 0.95rem;
    font-weight: 900;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 0 var(--border-color, #1a1a1a);
  }
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input[type="date"] {
    background-color: var(--bg-color, #ffffff);
    color: var(--text-color, #1a1a1a);
    border: 2px solid var(--border-color, #1a1a1a);
    border-radius: 10px;
    padding: 6px 10px;
    font-size: 0.8rem;
    font-weight: 800;
    outline: none;
    cursor: pointer;
    box-shadow: 0 2px 0 var(--border-color, #1a1a1a);
  }
`;

const QuickTodayButton = styled.button`
  background: var(--bg-color, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  color: #1a1a1a;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 2px 0 var(--border-color, #1a1a1a);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 0 var(--border-color, #1a1a1a);
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

  // ── Date Stepper Logic ───────────────────────────────────────────────────
  const shiftDateByDays = (days: number) => {
    const d = new Date(year, month - 1, day);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  // Generate 7 days centered around current selected date for the week strip
  const getWeekDays = () => {
    const daysArr = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date(year, month - 1, day + i);
      const isoStr = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = d.getDate();
      daysArr.push({ isoStr, dayName, dayNum });
    }
    return daysArr;
  };

  const openAttendance = async (schedule: any) => {
    try {
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
      <TeacherHeader
        title="Attendance Management"
        subtitle="Mark and update student attendance for scheduled classes."
        activeTab="attendance"
      />

      <SectionCard>
        <SectionHeader>
          <h3 style={{ textTransform: "uppercase", fontWeight: 900 }}>
            Classes for{" "}
            {localDateObj.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h3>
        </SectionHeader>

        {/* 🗓️ Upgraded Interactive Date Bar */}
        <DateBarContainer>
          <ArrowStepper>
            <NavIconButton
              onClick={() => shiftDateByDays(-1)}
              title="Previous Day"
            >
              ←
            </NavIconButton>
            <NavIconButton onClick={() => shiftDateByDays(1)} title="Next Day">
              →
            </NavIconButton>
          </ArrowStepper>

          {/* Quick 7-Day Clickable Strip */}
          <WeekStrip>
            {getWeekDays().map((item) => (
              <DayPillCard
                key={item.isoStr}
                $active={item.isoStr === selectedDate}
                onClick={() => setSelectedDate(item.isoStr)}
              >
                <span className="day-name">{item.dayName}</span>
                <span className="day-num">{item.dayNum}</span>
              </DayPillCard>
            ))}
          </WeekStrip>

          <RightControls>
            <QuickTodayButton onClick={handleResetToToday}>
              Today
            </QuickTodayButton>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </RightControls>
        </DateBarContainer>

        {/* 📊 Stat Cards */}
        <StatsGrid style={{ marginTop: "20px" }}>
          <StatCard>
            <div className="label">SCHEDULED CLASSES</div>
            <div className="value">{todaySchedules.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">TOTAL STUDENTS</div>
            <div className="value">{students.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">TOTAL SUBJECTS</div>
            <div className="value">
              {new Set(todaySchedules.map((s: any) => s.subject?.id)).size}
            </div>
          </StatCard>
        </StatsGrid>

        {/* 📋 Attendance Table */}
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
                      <span style={{ fontWeight: 800, color: "#1a1a1a" }}>
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
                      fontWeight: 700,
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
