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
    { subjectId: number; grade: number }[]
  >([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  // Load subjects
  useEffect(() => {
    api.get("/subject").then((res) => {
      console.log("Subjects API:", res.data); // 👈 add this
      setSubjects(res.data);
    });
  }, []);

  // Prefill data
  useEffect(() => {
    if (teacher && isOpen) {
      setFullName(teacher.fullName);
      setQualification(teacher.qualification || "");
      setSubjectGrades(
        (teacher.subjectGrades || []).map((sg: any) => ({
          subjectId: sg.subject.id,
          grade: sg.grade,
        })),
      );
    }
  }, [teacher, isOpen]); // 👈 add isOpen

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
    setSubjectGrades([...subjectGrades, { subjectId: 0, grade: 0 }]);
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
          <SubjectRow key={index}>
            <ModalSelect
              value={sg.subjectId}
              onChange={(e) =>
                handleChange(index, "subjectId", Number(e.target.value))
              }
            >
              <option value={0}>Select Subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </ModalSelect>

            <ModalInput
              type="number"
              placeholder="Grade"
              value={sg.grade}
              onChange={(e) =>
                handleChange(index, "grade", Number(e.target.value))
              }
            />

            <Button onClick={() => removeRow(index)}>❌</Button>
          </SubjectRow>
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
