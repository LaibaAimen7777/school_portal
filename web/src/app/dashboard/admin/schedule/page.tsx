"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import {
  Container,
  Header,
  Title,
  AddButton,
  FilterSection,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  ScheduleGrid,
  ScheduleCard,
  CardHeader,
  DayBadge,
  TimeBadge,
  CardBody,
  InfoRow,
  InfoLabel,
  InfoValue,
  TeacherName,
  SubjectName,
  RoomName,
  EmptyState,
  LoadingState,
  WeekView,
  DayColumn,
  DayTitle,
  TimeSlot,
} from "@/wrappers/adminSchedule";

interface Schedule {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  teacher: {
    id: number;
    fullName: string;
  };
  subject: {
    id: number;
    name: string;
  };
  schoolClass: {
    id: number;
    grade: number;
    section: string;
  };
  room: {
    id: number;
    name: string;
  };
}

interface Teacher {
  id: number;
  fullName: string;
}

interface SchoolClass {
  id: number;
  grade: number;
  section: string;
}

const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

const formatDay = (day: string) => {
  return day.charAt(0) + day.slice(1).toLowerCase();
};

const formatTime = (time: string) => {
  return time.substring(0, 5); // Show only HH:MM
};

export default function ScheduleDisplayPage() {
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "week">("grid");

  // Filters
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [schedules, selectedDay, selectedClass, selectedTeacher]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [schedulesRes, teachersRes, classesRes] = await Promise.all([
        api.get("/schedule"),
        api.get("/teachers"),
        api.get("/school-class"),
      ]);

      console.log("Schedules:", schedulesRes.data);
      setSchedules(schedulesRes.data);
      setFilteredSchedules(schedulesRes.data);
      setTeachers(teachersRes.data);
      setClasses(classesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...schedules];

    if (selectedDay) {
      filtered = filtered.filter((s) => s.dayOfWeek === selectedDay);
    }

    if (selectedClass) {
      filtered = filtered.filter(
        (s) => s.schoolClass.id === parseInt(selectedClass),
      );
    }

    if (selectedTeacher) {
      filtered = filtered.filter(
        (s) => s.teacher.id === parseInt(selectedTeacher),
      );
    }

    // Sort by day and time
    filtered.sort((a, b) => {
      const dayOrder =
        daysOfWeek.indexOf(a.dayOfWeek) - daysOfWeek.indexOf(b.dayOfWeek);
      if (dayOrder !== 0) return dayOrder;
      return a.startTime.localeCompare(b.startTime);
    });

    setFilteredSchedules(filtered);
  };

  const clearFilters = () => {
    setSelectedDay("");
    setSelectedClass("");
    setSelectedTeacher("");
  };

  // Group schedules by day for week view
  const schedulesByDay = daysOfWeek.reduce(
    (acc, day) => {
      acc[day] = filteredSchedules
        .filter((s) => s.dayOfWeek === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
      return acc;
    },
    {} as Record<string, Schedule[]>,
  );

  if (loading) {
    return (
      <Container>
        <LoadingState>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Loading schedules...</p>
        </LoadingState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Schedule Management</Title>
        <AddButton
          onClick={() => router.push("/dashboard/admin/schedule/create")}
        >
          + Create Schedule
        </AddButton>
      </Header>

      <FilterSection>
        <FilterGroup>
          <FilterLabel>View:</FilterLabel>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <FilterSelect
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as "grid" | "week")}
              style={{ width: "120px" }}
            >
              <option value="grid">Grid View</option>
              <option value="week">Week View</option>
            </FilterSelect>
          </div>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Day:</FilterLabel>
          <FilterSelect
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">All Days</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {formatDay(day)}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Class:</FilterLabel>
          <FilterSelect
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                Grade {cls.grade}-{cls.section}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Teacher:</FilterLabel>
          <FilterSelect
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">All Teachers</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.fullName}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        {(selectedDay || selectedClass || selectedTeacher) && (
          <FilterGroup>
            <button
              onClick={clearFilters}
              style={{
                padding: "0.5rem 1rem",
                border: "var(--border-width) solid var(--border-color)",
                borderRadius: "var(--border-radius-full)",
                background: "var(--bg-color)",
                color: "var(--text-color)",
                cursor: "pointer",
              }}
            >
              Clear Filters
            </button>
          </FilterGroup>
        )}
      </FilterSection>

      {filteredSchedules.length === 0 ? (
        <EmptyState>
          <p>No schedules found</p>
          <button
            onClick={() => router.push("/dashboard/admin/schedule/create")}
          >
            Create your first schedule
          </button>
        </EmptyState>
      ) : viewMode === "grid" ? (
        <ScheduleGrid>
          {filteredSchedules.map((schedule) => (
            <ScheduleCard key={schedule.id}>
              <CardHeader>
                <DayBadge day={schedule.dayOfWeek}>
                  {formatDay(schedule.dayOfWeek)}
                </DayBadge>
                <TimeBadge>
                  {formatTime(schedule.startTime)} -{" "}
                  {formatTime(schedule.endTime)}
                </TimeBadge>
              </CardHeader>
              <CardBody>
                <InfoRow>
                  <InfoLabel>Class</InfoLabel>
                  <InfoValue>
                    Grade {schedule.schoolClass.grade}-
                    {schedule.schoolClass.section}
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Subject</InfoLabel>
                  <SubjectName>{schedule.subject.name}</SubjectName>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Teacher</InfoLabel>
                  <TeacherName>{schedule.teacher.fullName}</TeacherName>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Room</InfoLabel>
                  <RoomName>{schedule.room.name}</RoomName>
                </InfoRow>
              </CardBody>
            </ScheduleCard>
          ))}
        </ScheduleGrid>
      ) : (
        <WeekView>
          {daysOfWeek.map((day) => (
            <DayColumn key={day}>
              <DayTitle>{formatDay(day)}</DayTitle>
              {schedulesByDay[day].length > 0 ? (
                schedulesByDay[day].map((schedule) => (
                  <TimeSlot key={schedule.id}>
                    <div
                      style={{ fontWeight: "bold", marginBottom: "0.25rem" }}
                    >
                      {formatTime(schedule.startTime)} -{" "}
                      {formatTime(schedule.endTime)}
                    </div>
                    <div>
                      Grade {schedule.schoolClass.grade}-
                      {schedule.schoolClass.section}
                    </div>
                    <SubjectName>{schedule.subject.name}</SubjectName>
                    <TeacherName>{schedule.teacher.fullName}</TeacherName>
                    <RoomName>{schedule.room.name}</RoomName>
                  </TimeSlot>
                ))
              ) : (
                <div
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "var(--text-color)",
                    opacity: 0.5,
                    border: "var(--border-width) dashed var(--border-color)",
                    borderRadius: "var(--border-radius-lg)",
                  }}
                >
                  No classes
                </div>
              )}
            </DayColumn>
          ))}
        </WeekView>
      )}
    </Container>
  );
}
