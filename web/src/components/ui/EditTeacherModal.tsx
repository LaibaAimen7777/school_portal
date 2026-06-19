"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";
import {
  ModalOverlay,
  ModalBox,
  ModalHeader,
  ModalInput,
  ModalSelect,
  SubjectRow,
  Actions,
  Button,
} from "@/components/ui/editTeacherModal";

interface Props {
  teacher: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (updated: any) => void;
}

export default function EditTeacherModal({
  teacher,
  isOpen,
  onClose,
  onUpdated,
}: Props) {
  const [fullName, setFullName] = useState("");
  const [qualification, setQualification] = useState("");
  const [subjectGrades, setSubjectGrades] = useState<
    { subjectId: number | null; grade: number | null }[]
  >([]);
  const [subjectsByGrade, setSubjectsByGrade] = useState<Record<number, any[]>>(
    {},
  );

  const fetchSubjectsForGrade = async (grade: number) => {
    if (!grade || subjectsByGrade[grade]) return; // cache it
    const res = await api.get(`/subject/by-grade-subject?grade=${grade}`);
    console.log("fetch subjects", res.data);
    setSubjectsByGrade((prev) => ({ ...prev, [grade]: res.data }));
  };

  // In your prefill useEffect, after setting subjectGrades:
  useEffect(() => {
    if (teacher && isOpen) {
      setFullName(teacher.fullName);
      setQualification(teacher.qualification || "");

      const sgs = (teacher.subjectGrades || []).map((sg: any) => ({
        subjectId: sg.subject.id,
        grade: sg.grade,
      }));
      setSubjectGrades(sgs);

      // Pre-fetch subjects for each grade already assigned
      const uniqueGrades = [...new Set(sgs.map((sg) => sg.grade))];
      uniqueGrades.forEach((g) => fetchSubjectsForGrade(g)); // 👈 add this
    }
  }, [teacher, isOpen]);

  if (!isOpen || !teacher) return null;

  const handleChange = (
    index: number,
    field: "subjectId" | "grade",
    value: number,
  ) => {
    const updated = [...subjectGrades];
    updated[index][field] = value;
    setSubjectGrades(updated);
  };

  const addRow = () => {
    setSubjectGrades([...subjectGrades, { subjectId: null, grade: null }]);
  };

  const removeRow = (index: number) => {
    setSubjectGrades(subjectGrades.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const cleanData = {
        fullName,
        qualification,
        subjectGrades: subjectGrades.filter((sg) => sg.subjectId && sg.grade),
      };

      const res = await api.patch(`/teachers/${teacher.id}`, cleanData);

      showSuccess("Teacher updated");
      onUpdated(res.data);
      onClose();
    } catch (err: any) {
      showError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <ModalHeader>
          <h2>Edit Teacher</h2>
          <Button onClick={onClose}>✕</Button>
        </ModalHeader>

        {/* Full Name */}
        <label>Full Name</label>
        <ModalInput
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* Qualification */}
        <label>Qualification</label>
        <ModalInput
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />

        {/* Subjects */}
        <h4>Subjects & Grades</h4>
        {subjectGrades.map((sg, index) => (
          <div key={index} style={{ display: "flex", gap: "8px" }}>
            {/* Grade input — fetch subjects when grade changes */}
            <input
              type="number"
              value={sg.grade ?? ""}
              min={1}
              max={10}
              onChange={(e) => {
                const grade = Number(e.target.value);

                const updated = [...subjectGrades];
                updated[index] = { grade, subjectId: null };
                setSubjectGrades(updated);

                fetchSubjectsForGrade(grade);
              }}
            />

            {/* Subject dropdown — filtered by grade */}
            <select
              value={sg.subjectId ?? ""}
              onChange={(e) =>
                handleChange(index, "subjectId", Number(e.target.value))
              }
            >
              <option value="">
                {sg.grade ? "Select Subject" : "Enter grade first"}
              </option>
              {(sg.grade ? subjectsByGrade[sg.grade] : [])?.map((s, i) => (
                <option key={`${s.id}-${i}`} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <button onClick={() => removeRow(index)}>❌</button>
          </div>
        ))}

        <Button onClick={addRow}>+ Add Subject</Button>

        {/* Actions */}
        <Actions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </Actions>
      </ModalBox>
    </ModalOverlay>
  );
}
