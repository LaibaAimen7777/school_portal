"use client";

import React, { useEffect, useState, Suspense } from "react";
import { api } from "@/services/api";
import { useSearchParams, useRouter } from "next/navigation";
import * as S from "@/wrappers/adminCreateSchedule";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { showSuccess, showError } from "@/components/ui/toast";
import {
  FaPlusCircle,
  FaArrowLeft,
  FaGraduationCap,
  FaBook,
  FaUserTie,
  FaCalendarDay,
  FaClock,
  FaSearchLocation,
  FaDoorOpen,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

interface TeacherSubjectGrade {
  id: number;
  grade: number;
  subject: Subject;
}

interface Teacher {
  id: number;
  fullName: string;
  subjectGrades: TeacherSubjectGrade[];
}

interface Subject {
  id: number;
  name: string;
  grades: number[];
}

interface SchoolClass {
  id: number;
  grade: number;
  section: string;
  currentStrength: number;
}

interface Room {
  id: number;
  name: string;
}

interface SchoolConfig {
  periodDurationMinutes: number;
}

const Days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

const addMinutes = (time: string, minutes: number): string => {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(
    total % 60,
  ).padStart(2, "0")}`;
};

function CreateScheduleForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const day = searchParams.get("day");
  const time = searchParams.get("time");
  const classId = searchParams.get("classId");

  const initialForm = {
    teacherId: "",
    subjectId: "",
    classId: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    roomId: "",
  };

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [roomsFetched, setRoomsFetched] = useState(false);
  const [timeError, setTimeError] = useState<string>("");
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [initialDataLoading, setInitialDataLoading] = useState(true);
  const [periodDuration, setPeriodDuration] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<SchoolConfig>("/school-config")
      .then((res) => setPeriodDuration(res.data.periodDurationMinutes))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (classId || day || time) {
      setFormData((prev) => {
        const startTime = time || "";
        const endTime =
          startTime && periodDuration
            ? addMinutes(startTime, periodDuration)
            : "";
        return {
          ...prev,
          classId: classId || "",
          dayOfWeek: day || "",
          startTime,
          endTime,
        };
      });
    }
  }, [classId, day, time, periodDuration]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.classId && classes.length > 0 && subjects.length > 0) {
      const selectedClass = classes.find(
        (c) => c.id === Number(formData.classId),
      );
      if (selectedClass) {
        setFilteredSubjects(
          subjects.filter((s) => s.grades?.includes(selectedClass.grade)),
        );
      }
    }
  }, [formData.classId, classes, subjects]);

  const fetchData = async () => {
    setInitialDataLoading(true);
    try {
      const [teachersRes, subjectsRes, classesRes] = await Promise.all([
        api.get("/teachers"),
        api.get("/subject"),
        api.get("/school-class"),
      ]);
      setTeachers(teachersRes.data);
      setSubjects(subjectsRes.data);
      setClasses(classesRes.data);
    } catch {
      showError("Failed to fetch initial form data");
    } finally {
      setInitialDataLoading(false);
    }
  };

  const validateTimeSlot = (start: string, end: string) => {
    if (!start || !end) return true;
    if (new Date(`2000-01-01T${end}`) <= new Date(`2000-01-01T${start}`)) {
      setTimeError("End time must be after start time");
      return false;
    }
    setTimeError("");
    return true;
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = e.target.value;
    const selectedClass = classes.find((c) => c.id === Number(selectedClassId));

    setFormData((prev) => ({
      ...prev,
      classId: selectedClassId,
      subjectId: "",
      teacherId: "",
    }));
    setFilteredTeachers([]);

    if (selectedClass) {
      setFilteredSubjects(
        subjects.filter((s) => s.grades?.includes(selectedClass.grade)),
      );
    } else {
      setFilteredSubjects([]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (name === "startTime") {
        newData.endTime =
          value && periodDuration ? addMinutes(value, periodDuration) : "";
        validateTimeSlot(value, newData.endTime);
      }

      if (name === "endTime") {
        validateTimeSlot(prev.startTime, value);
      }

      if (name === "dayOfWeek" || name === "startTime" || name === "endTime") {
        newData.roomId = "";
        setAvailableRooms([]);
        setRoomsFetched(false);
      }

      return newData;
    });
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = Number(e.target.value);
    const selectedClass = classes.find(
      (c) => c.id === Number(formData.classId),
    );

    setFormData((prev) => ({
      ...prev,
      subjectId: String(subjectId),
      teacherId: "",
    }));

    if (!selectedClass) {
      setFilteredTeachers([]);
      return;
    }

    const filtered = teachers.filter((t) =>
      t.subjectGrades?.some(
        (sg) =>
          sg.subject?.id === subjectId && sg.grade === selectedClass.grade,
      ),
    );

    setFilteredTeachers(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roomId) {
      showError("Please select an available room");
      return;
    }
    if (!formData.subjectId) {
      showError("Please select a subject");
      return;
    }
    setLoading(true);
    try {
      await api.post("/schedule", {
        teacherId: Number(formData.teacherId),
        subjectId: Number(formData.subjectId),
        classId: Number(formData.classId),
        roomId: Number(formData.roomId),
        dayOfWeek: formData.dayOfWeek,
        startTime: formData.startTime,
        endTime: formData.endTime,
      });
      showSuccess("Schedule slot created successfully!");
      router.push("/dashboard/admin/schedule");
    } catch (error: any) {
      showError(
        error.response?.data?.message || "Error creating schedule slot",
      );
    } finally {
      setLoading(false);
    }
  };

  const checkRooms = async () => {
    const { dayOfWeek, startTime, endTime } = formData;
    if (!dayOfWeek || !startTime || !endTime) {
      showError("Please select day and time slot first");
      return;
    }
    if (!validateTimeSlot(startTime, endTime)) return;
    setRoomsLoading(true);
    setRoomsFetched(false);
    setFormData((prev) => ({ ...prev, roomId: "" }));
    try {
      const res = await api.get("/rooms/available", {
        params: { dayOfWeek, startTime, endTime },
      });
      setAvailableRooms(res.data);
      setRoomsFetched(true);
    } catch {
      showError("Could not fetch available rooms");
    } finally {
      setRoomsLoading(false);
    }
  };

  const selectedClass = classes.find((c) => c.id === Number(formData.classId));
  const isTimeSlotComplete =
    formData.dayOfWeek && formData.startTime && formData.endTime && !timeError;

  if (initialDataLoading) return <LoadingOverlay />;

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <FaPlusCircle /> Create Schedule Slot
        </S.Title>
        <S.BackButton onClick={() => router.back()}>
          <FaArrowLeft /> Back to Schedule
        </S.BackButton>
      </S.Header>

      <S.FormCard>
        <S.Form onSubmit={handleSubmit}>
          <S.FormGrid>
            {/* CLASS */}
            <S.FormGroup>
              <S.Label>
                <FaGraduationCap /> Class
              </S.Label>
              <S.Select
                name="classId"
                value={formData.classId}
                onChange={handleClassChange}
                required
              >
                <option value="">Select Class</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    Grade {c.grade}-{c.section} (Strength: {c.currentStrength})
                  </option>
                ))}
              </S.Select>
            </S.FormGroup>

            {/* SUBJECT */}
            <S.FormGroup>
              <S.Label>
                <FaBook /> Subject
              </S.Label>
              <S.Select
                name="subjectId"
                value={formData.subjectId}
                onChange={handleSubjectChange}
                required
                disabled={!formData.classId}
              >
                <option value="">
                  {formData.classId ? "Select Subject" : "Select a class first"}
                </option>
                {filteredSubjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </S.Select>
              {formData.classId && filteredSubjects.length === 0 && (
                <S.Message type="error">
                  <FaExclamationCircle /> No subjects assigned to Grade{" "}
                  {selectedClass?.grade}.
                </S.Message>
              )}
            </S.FormGroup>

            {/* TEACHER */}
            <S.FormGroup>
              <S.Label>
                <FaUserTie /> Teacher
              </S.Label>
              <S.Select
                name="teacherId"
                value={formData.teacherId}
                onChange={handleChange}
                required
                disabled={!formData.subjectId}
              >
                <option value="">
                  {formData.subjectId
                    ? "Select Teacher"
                    : "Select a subject first"}
                </option>
                {filteredTeachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.fullName}
                  </option>
                ))}
              </S.Select>
              {formData.subjectId && filteredTeachers.length === 0 && (
                <S.Message type="error">
                  <FaExclamationCircle /> No teachers assigned to this subject.
                </S.Message>
              )}
            </S.FormGroup>

            {/* DAY */}
            <S.FormGroup>
              <S.Label>
                <FaCalendarDay /> Day
              </S.Label>
              <S.Select
                name="dayOfWeek"
                value={formData.dayOfWeek}
                onChange={handleChange}
                required
              >
                <option value="">Select Day</option>
                {Days.map((d) => (
                  <option key={d} value={d}>
                    {d[0] + d.slice(1).toLowerCase()}
                  </option>
                ))}
              </S.Select>
            </S.FormGroup>
          </S.FormGrid>

          {/* TIME SLOT */}
          <S.FormGroup>
            <S.Label>
              <FaClock /> Time Slot
              {periodDuration && (
                <span
                  style={{ opacity: 0.6, fontWeight: 400, fontSize: "0.75rem" }}
                >
                  (end time auto-calculated by {periodDuration} min period
                  config)
                </span>
              )}
            </S.Label>
            <S.TimeSlotGroup>
              <S.Input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
              <S.Input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </S.TimeSlotGroup>
            {timeError && (
              <S.Message type="error">
                <FaExclamationCircle /> {timeError}
              </S.Message>
            )}
          </S.FormGroup>

          {/* CHECK ROOMS */}
          <S.CheckRoomsButton
            type="button"
            onClick={checkRooms}
            disabled={!isTimeSlotComplete || roomsLoading}
          >
            <FaSearchLocation />{" "}
            {roomsLoading
              ? "Checking Availability..."
              : "Check Available Rooms"}
          </S.CheckRoomsButton>

          {roomsFetched && availableRooms.length > 0 && (
            <S.FormGroup>
              <S.Label>
                <FaDoorOpen /> Select Available Room
              </S.Label>
              <S.RoomsGrid>
                {availableRooms.map((room) => (
                  <S.RoomButton
                    key={room.id}
                    type="button"
                    selected={formData.roomId === String(room.id)}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        roomId: String(room.id),
                      }))
                    }
                  >
                    <FaDoorOpen /> {room.name}
                  </S.RoomButton>
                ))}
              </S.RoomsGrid>
            </S.FormGroup>
          )}

          {roomsFetched &&
            availableRooms.length === 0 &&
            isTimeSlotComplete && (
              <S.Message type="error">
                <FaExclamationCircle /> No rooms available for this time slot.
              </S.Message>
            )}

          {!roomsFetched && !roomsLoading && isTimeSlotComplete && (
            <S.Message type="info">
              <FaInfoCircle /> Click "Check Available Rooms" to view room
              options.
            </S.Message>
          )}

          <S.SubmitButton type="submit" disabled={loading || !formData.roomId}>
            {loading ? "Creating Schedule..." : "Save Schedule Slot"}
          </S.SubmitButton>
        </S.Form>
      </S.FormCard>
    </S.Container>
  );
}

export default function CreateSchedulePage() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <CreateScheduleForm />
    </Suspense>
  );
}
