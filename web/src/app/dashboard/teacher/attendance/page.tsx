"use client";

import { useEffect, useState } from "react";
import AttendanceModal from "./components/AttendanceModal";
import { api } from "@/services/api";
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

      // ✅ NEW: check attendance for each schedule
      const date = selectedDate;

      const statusMap: Record<number, boolean> = {};

      await Promise.all(
        schedulesData.map(async (schedule: any) => {
          try {
            const res = await api.get(
              `/attendance?scheduleId=${schedule.id}&date=${selectedDate}`,
            );

            statusMap[schedule.id] = res.data.length > 0; // true if exists
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

  const selectedDay = new Date(selectedDate)
    .toLocaleDateString("en-US", {
      weekday: "long",
    })
    .toUpperCase();

  const todaySchedules = schedules.filter((s) => s.dayOfWeek === selectedDay);

  const openAttendance = async (schedule: any) => {
    try {
      const date = new Date().toISOString().split("T")[0];

      const res = await api.get(
        `/attendance?scheduleId=${schedule.id}&date=${date}`,
      );

      const mapped: any = {};
      res.data.forEach((item: any) => {
        mapped[item.student.id] = item.status;
      });

      setExistingAttendance(mapped);
      setSelectedSchedule(schedule);
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const date = new Date().toISOString().split("T")[0];
      await api.post("/attendance/mark", { ...data, date: selectedDate });
      alert("Attendance saved!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error saving attendance");
    }
  };

  if (loading) {
    return (
      <LoadingContainer>
        <p>Loading attendance data...</p>
      </LoadingContainer>
    );
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
            Today's Classes -{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
        </SectionHeader>

        <StatsGrid>
          <StatCard>
            <div className="label">Today's Classes</div>
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
        <div style={{ marginBottom: "1rem" }}>
          <label>Select Date: </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <TableWrapper>
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
                      <span style={{ fontWeight: "bold" }}>
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
                      {attendanceStatus[schedule.id] ? (
                        <Badge style={{ background: "green", color: "white" }}>
                          Marked
                        </Badge>
                      ) : (
                        <Badge style={{ background: "red", color: "white" }}>
                          Not Marked
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
              {todaySchedules.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    No classes scheduled for today
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
