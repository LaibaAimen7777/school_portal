"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";

interface Teacher {
  id: number;
  fullName: string;
  subjects: Subject[];
}

interface Subject {
  id: number;
  name: string;
}

interface SchoolClass {
  id: number;
  grade: number;
  section: string;
  currentStrength: number;
}

const CreateSchedulePage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);

  const [formData, setFormData] = useState({
    teacherId: "",
    subjectId: "",
    classId: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const teachersRes = await api.get("/teachers");
    const subjectsRes = await api.get("/subject");
    const classesRes = await api.get("/school-class");

    console.log(classesRes.data);

    setTeachers(teachersRes.data);
    setSubjects(subjectsRes.data);
    setClasses(classesRes.data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/schedule", {
        teacherId: Number(formData.teacherId),
        subjectId: Number(formData.subjectId),
        classId: Number(formData.classId),
        dayOfWeek: formData.dayOfWeek,
        startTime: formData.startTime,
        endTime: formData.endTime,
      });

      alert("Schedule created successfully");

      setFormData({
        teacherId: "",
        subjectId: "",
        classId: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
      });
    } catch (error: any) {
      alert(error.response?.data?.message || "Error creating schedule");
    }

    setLoading(false);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = e.target.value;

    setFormData({
      ...formData,
      subjectId,
      teacherId: "",
    });

    const filtered = teachers.filter((teacher) =>
      teacher.subjects?.some((s) => s.id === Number(subjectId)),
    );

    setFilteredTeachers(filtered);
  };
  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Create Schedule</h2>

      <form onSubmit={handleSubmit}>
        {/* CLASS */}
        <select
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          required
        >
          <option value="">Select Class</option>

          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.grade}-{c.section}-----{c.currentStrength}
            </option>
          ))}
        </select>

        {/* SUBJECT */}
        <select
          name="subjectId"
          value={formData.subjectId}
          onChange={handleSubjectChange}
          required
        >
          <option value="">Select Subject</option>

          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* TEACHER */}
        <select
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          required
          disabled={!formData.subjectId}
        >
          <option value="">Select Teacher</option>

          {filteredTeachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.fullName}
            </option>
          ))}
        </select>

        {/* DAY */}
        <select
          name="dayOfWeek"
          value={formData.dayOfWeek}
          onChange={handleChange}
          required
        >
          <option value="">Select Day</option>
          <option value="MONDAY">Monday</option>
          <option value="TUESDAY">Tuesday</option>
          <option value="WEDNESDAY">Wednesday</option>
          <option value="THURSDAY">Thursday</option>
          <option value="FRIDAY">Friday</option>
        </select>

        {/* START TIME */}
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        {/* END TIME */}
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Schedule"}
        </button>
      </form>
    </div>
  );
};

export default CreateSchedulePage;
