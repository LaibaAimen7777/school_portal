"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";
import {
  ModalOverlay,
  ModalBox,
  ModalHeader,
  CloseIconButton,
  FormGroup,
  ModalInput,
  ModalSelect,
  SectionTitle,
  SubjectRow,
  RemoveRowButton,
  AddSubjectButton,
  ModalActions,
  CancelButton,
  SaveButton,
} from "@/components/ui/editTeacherModal";
import { FaTimes, FaPlus, FaTrash } from "react-icons/fa";

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
    if (!grade || subjectsByGrade[grade]) return;
    try {
      const res = await api.get(`/subject/by-grade-subject?grade=${grade}`);
      setSubjectsByGrade((prev) => ({ ...prev, [grade]: res.data }));
    } catch (err) {
      console.error("Failed to fetch subjects for grade:", err);
    }
  };

  useEffect(() => {
    if (teacher && isOpen) {
      setFullName(teacher.fullName || "");
      setQualification(teacher.qualification || "");

      const sgs = (teacher.subjectGrades || []).map((sg: any) => ({
        subjectId: sg.subject?.id ?? null,
        grade: sg.grade ?? null,
      }));
      setSubjectGrades(sgs);

      const uniqueGrades = [
        ...new Set(sgs.map((sg) => sg.grade).filter(Boolean)),
      ] as number[];
      uniqueGrades.forEach((g) => fetchSubjectsForGrade(g));
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
        <ModalHeader>
          <h3>Edit Teacher</h3>
          <CloseIconButton onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </CloseIconButton>
        </ModalHeader>

        <FormGroup>
          <label>Full Name</label>
          <ModalInput
            placeholder="e.g. Sarah Jenkins"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label>Qualification</label>
          <ModalInput
            placeholder="e.g. M.Sc. Mathematics"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </FormGroup>

        <SectionTitle>
          <h4>Subjects &amp; Assigned Grades</h4>
        </SectionTitle>

        {subjectGrades.map((sg, index) => (
          <SubjectRow key={index}>
            <ModalInput
              type="number"
              className="grade-input"
              placeholder="Grade"
              value={sg.grade ?? ""}
              min={1}
              max={12}
              onChange={(e) => {
                const grade = Number(e.target.value);
                const updated = [...subjectGrades];
                updated[index] = { grade, subjectId: null };
                setSubjectGrades(updated);

                if (grade) fetchSubjectsForGrade(grade);
              }}
            />

            <ModalSelect
              className="subject-select"
              value={sg.subjectId ?? ""}
              onChange={(e) =>
                handleChange(index, "subjectId", Number(e.target.value))
              }
            >
              <option value="">
                {sg.grade ? "Select Subject" : "Set grade first..."}
              </option>
              {(sg.grade ? subjectsByGrade[sg.grade] : [])?.map((s, i) => (
                <option key={`${s.id}-${i}`} value={s.id}>
                  {s.name}
                </option>
              ))}
            </ModalSelect>

            <RemoveRowButton
              type="button"
              onClick={() => removeRow(index)}
              title="Remove row"
            >
              <FaTrash />
            </RemoveRowButton>
          </SubjectRow>
        ))}

        <AddSubjectButton type="button" onClick={addRow}>
          <FaPlus /> Add Subject Assignment
        </AddSubjectButton>

        <ModalActions>
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <SaveButton type="button" onClick={handleSubmit}>
            Save Changes
          </SaveButton>
        </ModalActions>
      </ModalBox>
    </ModalOverlay>
  );
}
