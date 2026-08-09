"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  Container,
  SectionCard,
  SectionHeader,
  TableWrapper,
  DaySelector,
  DayButton,
  StudentCount,
  LoadingContainer,
} from "@/wrappers/teacherDashboard";
import TeacherHeader from "@/components/ui/TeacherHeader";

export default function TeacherSchedule() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const res = await api.get("/teachers/dashboard");
        setSchedules(res.data.teacher.schedules || []);
      } catch (err) {
        console.error("Failed to fetch schedules:", err);
        setError("Failed to load schedule data");
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <p>Loading schedule...</p>
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

  const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

  const filteredSchedules = schedules.filter(
    (s: any) => !selectedDay || s.dayOfWeek === selectedDay,
  );

  return (
    <Container>
      <TeacherHeader
        title="Schedule Management"
        subtitle="Check all your scheduled classes from here."
        activeTab="schedule"
      />
      <SectionCard>
        <SectionHeader>
          <h3>Weekly Schedule</h3>
        </SectionHeader>

        <DaySelector>
          <DayButton
            $active={selectedDay === ""}
            onClick={() => setSelectedDay("")}
          >
            All Days
          </DayButton>
          {daysOfWeek.map((day) => (
            <DayButton
              key={day}
              $active={selectedDay === day}
              onClick={() => setSelectedDay(day)}
            >
              {day.charAt(0) + day.slice(1).toLowerCase()}
            </DayButton>
          ))}
        </DaySelector>

        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Subject</th>
                <th>Time</th>
                <th>Class</th>
                <th>Room</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((s: any) => (
                <tr key={s.id}>
                  <td>
                    {s.dayOfWeek?.charAt(0) +
                      s.dayOfWeek?.slice(1).toLowerCase() || "N/A"}
                  </td>
                  <td>{s.subject?.name || "Unknown Subject"}</td>
                  <td>
                    {s.startTime || "N/A"} - {s.endTime || "N/A"}
                  </td>
                  <td>
                    Grade {s.schoolClass?.grade}-{s.schoolClass?.section}
                  </td>
                  <td>{s.room?.name || "TBD"}</td>
                  <td>
                    <StudentCount>
                      <span className="badge">
                        {s.schoolClass?.currentStrength || 0}
                      </span>
                    </StudentCount>
                  </td>
                </tr>
              ))}
              {filteredSchedules.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    No classes scheduled for this day
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableWrapper>
      </SectionCard>
    </Container>
  );
}
