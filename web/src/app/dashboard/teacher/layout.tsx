"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import Link from "next/link";
import * as S from "@/wrappers/teacherDashboard";

interface TeacherData {
  teacher: {
    id: number;
    fullName: string;
    teacherCode: string;
    qualification: string;
    hireDate: string;
    schedules: Array<{
      id: number;
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      schoolClass: {
        id: number;
        grade: number;
        section: string;
        maxStrength: number;
        currentStrength: number;
      };
      subject: {
        id: number;
        name: string;
        code: string;
      };
      room: {
        id: number;
        name: string;
      };
    }>;
    subjects: Array<{
      id: number;
      name: string;
      code: string;
    }>;
  };
  students: any[];
}

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("MONDAY");
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);
  const [selectedView, setSelectedView] = useState<
    "schedule" | "students" | "overview"
  >("overview");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "teacher") {
      router.replace("/landing");
      return;
    }

    setChecked(true);
  }, [router]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const res = await api.get("/teachers/dashboard");
        setTeacherData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch teacher data:", error);
      }
    };
    fetchTeacherData();
  }, []);

  // Group schedules by day
  const schedulesByDay = teacherData?.teacher?.schedules?.reduce(
    (acc, schedule) => {
      const day = schedule.dayOfWeek;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(schedule);
      return acc;
    },
    {} as Record<string, typeof teacherData.teacher.schedules>,
  );

  // Sort schedules by time
  if (schedulesByDay) {
    Object.keys(schedulesByDay).forEach((day) => {
      schedulesByDay[day].sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      );
    });
  }

  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getDaySchedule = (day: string) => {
    return schedulesByDay?.[day] || [];
  };

  const getTodaySchedule = () => {
    const today = new Date().getDay();
    const dayMap = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return getDaySchedule(dayMap[today]);
  };

  const filteredStudents = teacherData?.students.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.rollNumber?.toString().includes(searchTerm),
  );

  const getTeachingSince = () => {
    if (!teacherData?.teacher.hireDate) return "N/A";
    const hireDate = new Date(teacherData.teacher.hireDate);
    const now = new Date();
    const years = now.getFullYear() - hireDate.getFullYear();
    return `${years} ${years === 1 ? "year" : "years"}`;
  };

  if (!checked) return null;

  return (
    <S.DashboardContainer>
      <S.Nav>
        <S.NavContainer>
          <S.NavLogo>Teacher Dashboard</S.NavLogo>
          <S.NavList>
            <S.NavItem>
              <S.NavLink
                as={Link}
                href="/dashboard/teacher"
                onClick={() => setSelectedView("overview")}
                $active={selectedView === "overview"}
              >
                Overview
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink
                as={Link}
                href="/dashboard/teacher/schedule"
                onClick={() => setSelectedView("schedule")}
                $active={selectedView === "schedule"}
              >
                Schedule
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink
                as={Link}
                href="/dashboard/teacher/students"
                onClick={() => setSelectedView("students")}
                $active={selectedView === "students"}
              >
                Students
              </S.NavLink>
            </S.NavItem>
            {/* <S.NavItem>
              <S.NavLink as={Link} href="/dashboard/teacher/analytics">
                Analytics
              </S.NavLink>
            </S.NavItem> */}
          </S.NavList>
        </S.NavContainer>
      </S.Nav>
      <S.Container>
        {/* Header with teacher info */}
        <S.HeaderCard>
          <S.HeaderContent>
            <S.TeacherInfo>
              <S.Avatar>
                {teacherData?.teacher?.fullName?.charAt(0) || "T"}
              </S.Avatar>
              <S.TeacherDetails>
                <h2>{teacherData?.teacher?.fullName || "Teacher"}</h2>
                <S.BadgeGroup>
                  <S.Badge $primary>
                    {teacherData?.teacher?.qualification || "Educator"}
                  </S.Badge>
                  <S.Badge>
                    ID: {teacherData?.teacher?.teacherCode || "N/A"}
                  </S.Badge>
                </S.BadgeGroup>
                {teacherData?.teacher?.hireDate && (
                  <S.TeachingSince>
                    Teaching since: {getTeachingSince()}
                  </S.TeachingSince>
                )}
              </S.TeacherDetails>
            </S.TeacherInfo>

            <S.DateDisplay>
              <p>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </S.DateDisplay>
          </S.HeaderContent>
        </S.HeaderCard>

        {/* Loading state */}
        {!teacherData && (
          <S.LoadingContainer>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>Loading your dashboard...</p>
          </S.LoadingContainer>
        )}

        {/* Overview Stats */}
        {teacherData && selectedView === "overview" && (
          <>
            <S.StatsGrid>
              <S.StatCard>
                <p className="stat-label">Total Students</p>
                <p className="stat-value">
                  {teacherData?.students?.length || 0}
                </p>
              </S.StatCard>

              <S.StatCard>
                <p className="stat-label">Weekly Classes</p>
                <p className="stat-value">
                  {teacherData?.teacher?.schedules?.length || 0}
                </p>
              </S.StatCard>

              <S.StatCard>
                <p className="stat-label">Classes Today</p>
                <p className="stat-value">{getTodaySchedule().length}</p>
              </S.StatCard>

              <S.StatCard>
                <p className="stat-label">Teaching Days</p>
                <p className="stat-value">
                  {Object.keys(schedulesByDay || {}).length}
                </p>
              </S.StatCard>
            </S.StatsGrid>

            {/* Today's Schedule Preview */}
            {getTodaySchedule().length > 0 && (
              <S.SectionCard>
                <S.SectionHeader $withAction>
                  <h3>Today's Schedule</h3>
                  <S.ViewButton onClick={() => setSelectedView("schedule")}>
                    View Full Schedule →
                  </S.ViewButton>
                </S.SectionHeader>

                <S.TableWrapper>
                  <table>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Class</th>
                        <th>Room</th>
                        <th>Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTodaySchedule()
                        .slice(0, 3)
                        .map((schedule) => (
                          <tr key={schedule.id}>
                            <td>
                              {formatTime(schedule.startTime)} -{" "}
                              {formatTime(schedule.endTime)}
                            </td>
                            <td>
                              <strong>{schedule.subject.name}</strong>
                              <br />
                              <span
                                style={{ opacity: 0.7, fontSize: "0.85rem" }}
                              >
                                {schedule.subject.code}
                              </span>
                            </td>
                            <td>
                              Grade {schedule.schoolClass.grade}-
                              {schedule.schoolClass.section}
                            </td>
                            <td>{schedule.room.name}</td>
                            <td>
                              <S.StudentCount>
                                <span className="badge">
                                  {schedule.schoolClass.currentStrength}
                                </span>
                                <span>
                                  / {schedule.schoolClass.maxStrength}
                                </span>
                              </S.StudentCount>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </S.TableWrapper>
              </S.SectionCard>
            )}

            {/* Recent Students Preview */}
            {teacherData.students && teacherData.students.length > 0 && (
              <S.SectionCard>
                <S.SectionHeader $withAction>
                  <h3>Recent Students</h3>
                  <S.ViewButton onClick={() => setSelectedView("students")}>
                    View All Students →
                  </S.ViewButton>
                </S.SectionHeader>

                <S.PreviewGrid>
                  {teacherData.students.slice(0, 4).map((student) => (
                    <S.PreviewCard key={student.id}>
                      <S.PreviewContent>
                        <S.StudentInitials
                          style={{ width: "40px", height: "40px" }}
                        >
                          {student.firstName?.charAt(0)}
                          {student.lastName?.charAt(0)}
                        </S.StudentInitials>
                        <div>
                          <strong>
                            {student.firstName} {student.lastName}
                          </strong>
                          <br />
                          <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>
                            Grade {student.schoolClass?.grade}-
                            {student.schoolClass?.section} • Roll #
                            {student.rollNumber}
                          </span>
                        </div>
                      </S.PreviewContent>
                    </S.PreviewCard>
                  ))}
                </S.PreviewGrid>
              </S.SectionCard>
            )}
          </>
        )}

        {/* Full Schedule View */}
        {teacherData && selectedView === "schedule" && (
          <S.SectionCard>
            <S.SectionHeader>
              <h3>Weekly Schedule</h3>
            </S.SectionHeader>

            <S.DaySelector>
              {days.map((day) => (
                <S.DayButton
                  key={day}
                  $active={selectedDay === day}
                  onClick={() => setSelectedDay(day)}
                >
                  {day.charAt(0) + day.slice(1).toLowerCase()}
                </S.DayButton>
              ))}
            </S.DaySelector>

            <S.TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Class</th>
                    <th>Room</th>
                    <th>Students</th>
                  </tr>
                </thead>
                <tbody>
                  {getDaySchedule(selectedDay).map((schedule) => (
                    <tr key={schedule.id}>
                      <td>
                        {formatTime(schedule.startTime)} -{" "}
                        {formatTime(schedule.endTime)}
                      </td>
                      <td>
                        <strong>{schedule.subject.name}</strong>
                        <br />
                        <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>
                          {schedule.subject.code}
                        </span>
                      </td>
                      <td>
                        Grade {schedule.schoolClass.grade}-
                        {schedule.schoolClass.section}
                      </td>
                      <td>{schedule.room.name}</td>
                      <td>
                        <S.StudentCount>
                          <span className="badge">
                            {schedule.schoolClass.currentStrength}
                          </span>
                          <span>/ {schedule.schoolClass.maxStrength}</span>
                        </S.StudentCount>
                      </td>
                    </tr>
                  ))}
                  {getDaySchedule(selectedDay).length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          textAlign: "center",
                          padding: "2rem",
                          opacity: 0.7,
                        }}
                      >
                        No classes scheduled for {selectedDay.toLowerCase()}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </S.TableWrapper>
          </S.SectionCard>
        )}

        {/* Students View */}
        {teacherData && selectedView === "students" && teacherData.students && (
          <S.SectionCard>
            <S.SectionHeader>
              <h3>My Students ({teacherData.students.length})</h3>
            </S.SectionHeader>

            <S.SearchInput
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />

            <S.StudentsGrid>
              {filteredStudents?.map((student) => (
                <S.StudentCard
                  key={student.id}
                  $expandable
                  onClick={() =>
                    setExpandedStudent(
                      expandedStudent === student.id ? null : student.id,
                    )
                  }
                >
                  <S.StudentHeader>
                    <S.StudentInitials>
                      {student.firstName?.charAt(0)}
                      {student.lastName?.charAt(0)}
                    </S.StudentInitials>
                    <S.StudentInfo>
                      <h4>
                        {student.firstName} {student.lastName}
                      </h4>
                      <S.Badge>Roll #{student.rollNumber}</S.Badge>
                    </S.StudentInfo>
                  </S.StudentHeader>

                  <S.StudentDetails>
                    <p>
                      <strong>Class:</strong> Grade {student.schoolClass?.grade}
                      -{student.schoolClass?.section}
                    </p>
                    <p>
                      <strong>Gender:</strong> {student.gender}
                    </p>
                    <p>
                      <strong>Joined:</strong> {student.joiningYear}
                    </p>
                  </S.StudentDetails>

                  {/* Expandable parent details */}
                  {expandedStudent === student.id && student.parent && (
                    <S.ParentInfo>
                      <h5>Parent/Guardian Information</h5>
                      <div className="grid">
                        <p>
                          <strong>Father:</strong> {student.parent.fatherName}
                        </p>
                        <p>
                          <strong>Mother:</strong> {student.parent.motherName}
                        </p>
                        <p>
                          <strong>Phone:</strong> {student.parent.phone}
                        </p>
                        <p>
                          <strong>Email:</strong> {student.parent.email}
                        </p>
                      </div>
                    </S.ParentInfo>
                  )}
                </S.StudentCard>
              ))}
            </S.StudentsGrid>
          </S.SectionCard>
        )}
      </S.Container>
    </S.DashboardContainer>
  );
}
