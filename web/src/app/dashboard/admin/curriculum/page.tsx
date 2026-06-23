// src/app/dashboard/admin/curriculum/page.tsx
"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { showSuccess, showError } from "@/components/ui/toast";
import * as S from "@/wrappers/adminCurriculum";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

interface Teacher {
  id: number;
  fullName: string;
}

interface Subject {
  id: number;
  name: string;
  grades: number[];
  periodsPerWeek: number;
  teacherCount: number;
  teachers: Teacher[];
}

interface GradeGroup {
  grade: number;
  subjects: Subject[];
}

const ALL_GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Grade picker component
function GradePicker({
  selected,
  onToggle,
}: {
  selected: number[];
  onToggle: (grade: number) => void;
}) {
  return (
    <S.GradePickerContainer>
      {ALL_GRADES.map((g) => (
        <S.GradePickerButton
          key={g}
          type="button"
          $selected={selected.includes(g)}
          onClick={() => onToggle(g)}
        >
          {g}
        </S.GradePickerButton>
      ))}
    </S.GradePickerContainer>
  );
}

export default function CurriculumPage() {
  const [grouped, setGrouped] = useState<GradeGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGrade, setExpandedGrade] = useState<number | null>(null);

  // Create form
  const [newName, setNewName] = useState("");
  const [newGrades, setNewGrades] = useState<number[]>([]);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newPeriods, setNewPeriods] = useState(5);

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editGrades, setEditGrades] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [editPeriods, setEditPeriods] = useState(5);

  useEffect(() => {
    fetchCurriculum();
  }, []);

  useEffect(() => {
    if (editingId === null) setEditPeriods(5);
  }, [editingId]);

  const fetchCurriculum = async () => {
    setLoading(true);
    try {
      const res = await api.get("/subject/by-grade");
      console.log("c data", res.data);
      setGrouped(res.data);
    } catch {
      showError("Failed to load curriculum");
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newName.trim()) {
      showError("Enter a subject name");
      return;
    }
    if (!newCode.trim()) {
      showError("Enter a subject code");
      return;
    }
    if (newGrades.length === 0) {
      showError("Select at least one grade");
      return;
    }
    setCreating(true);
    try {
      await api.post("/subject", {
        name: newName.trim(),
        code: newCode.trim().toUpperCase(),
        grades: newGrades,
        periodsPerWeek: newPeriods,
      });
      showSuccess("Subject created");
      setNewName("");
      setNewCode("");
      setNewGrades([]);
      setShowCreateForm(false);
      setNewPeriods(5);
      fetchCurriculum();
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to create subject");
    }
    setCreating(false);
  };

  const startEdit = (subject: Subject) => {
    setEditingId(subject.id);
    setEditName(subject.name);
    setEditGrades([...subject.grades]);
    setEditPeriods(subject.periodsPerWeek ?? 5);
  };

  const handleSave = async (id: number) => {
    if (!editName.trim()) {
      showError("Name cannot be empty");
      return;
    }
    if (editGrades.length === 0) {
      showError("Select at least one grade");
      return;
    }
    setSaving(true);
    try {
      const deduped = [...new Set(editGrades)];
      await api.patch(`/subject/${id}`, {
        name: editName.trim(),
        grades: deduped,
        periodsPerWeek: editPeriods,
      });
      showSuccess("Subject updated");
      setEditingId(null);
      setEditPeriods(5);
      fetchCurriculum();
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to update");
    }
    setSaving(false);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Deactivate subject "${name}"?`)) return;
    try {
      await api.delete(`/subject/${id}`);
      showSuccess("Subject deactivated");
      fetchCurriculum();
    } catch (err: any) {
      showError(err.response?.data?.message || "Failed to deactivate");
    }
  };

  const toggleGrade = (
    grade: number,
    current: number[],
    set: (g: number[]) => void,
  ) => {
    set(
      current.includes(grade)
        ? current.filter((g) => g !== grade)
        : [...current, grade].sort((a, b) => a - b),
    );
  };

  if (loading) return <LoadingOverlay />;
  return (
    <S.Container>
      <S.Header>
        <S.Title>Curriculum Management</S.Title>
        <S.AddButton onClick={() => setShowCreateForm((v) => !v)}>
          {showCreateForm ? "Cancel" : "+ Add Subject"}
        </S.AddButton>
      </S.Header>

      {/* Create form */}
      {showCreateForm && (
        <S.FormCard>
          <S.FormTitle>New Subject</S.FormTitle>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <S.FormGroup>
              <S.Label>Subject Name</S.Label>
              <S.Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Mathematics"
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Subject Code</S.Label>
              <S.Input
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                placeholder="e.g. BIO101"
                maxLength={10}
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  width: "200px",
                }}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Periods Per Week</S.Label>
              <S.PeriodsWrapper>
                <S.SmallInput
                  type="number"
                  value={newPeriods}
                  onChange={(e) => setNewPeriods(Number(e.target.value))}
                  min={1}
                  max={10}
                />
                <S.PeriodsHint>periods/week</S.PeriodsHint>
              </S.PeriodsWrapper>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Applicable Grades</S.Label>
              <GradePicker
                selected={newGrades}
                onToggle={(g) => toggleGrade(g, newGrades, setNewGrades)}
              />
            </S.FormGroup>

            <S.CreateButton onClick={handleCreate} disabled={creating}>
              {creating ? "Creating..." : "Create Subject"}
            </S.CreateButton>
          </div>
        </S.FormCard>
      )}

      {/* Grouped by grade */}
      {grouped.length === 0 ? (
        <S.EmptyState>
          No subjects yet. Add your first subject above.
        </S.EmptyState>
      ) : (
        <div>
          {grouped.map(({ grade, subjects }) => (
            <S.GradeGroupCard key={grade}>
              {/* Grade header */}
              <S.GradeHeader
                $expanded={expandedGrade === grade}
                onClick={() =>
                  setExpandedGrade(expandedGrade === grade ? null : grade)
                }
              >
                <S.GradeTitle>
                  <S.GradeNumber>Grade {grade}</S.GradeNumber>
                  <S.SubjectCount>
                    {subjects.length} subject{subjects.length !== 1 ? "s" : ""}
                  </S.SubjectCount>
                </S.GradeTitle>
                <S.ExpandIcon $expanded={expandedGrade === grade}>
                  ▼
                </S.ExpandIcon>
              </S.GradeHeader>

              {/* Subject rows */}
              {expandedGrade === grade && (
                <div>
                  {subjects.map((subject) => (
                    <S.SubjectRow
                      key={subject.id}
                      $isEditing={editingId === subject.id}
                    >
                      {editingId === subject.id ? (
                        <S.EditForm key={subject.id}>
                          <S.Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            style={{ width: "280px" }}
                          />
                          <div>
                            <S.Label
                              style={{
                                fontSize: "0.75rem",
                                marginBottom: "0.5rem",
                                display: "block",
                              }}
                            >
                              Grades:
                            </S.Label>
                            <GradePicker
                              selected={editGrades}
                              onToggle={(g) =>
                                toggleGrade(g, editGrades, setEditGrades)
                              }
                            />
                          </div>
                          <div>
                            <S.Label
                              style={{
                                fontSize: "0.75rem",
                                marginBottom: "0.5rem",
                                display: "block",
                              }}
                            >
                              Periods per week:
                            </S.Label>
                            <S.SmallInput
                              type="number"
                              value={editPeriods}
                              onChange={(e) =>
                                setEditPeriods(Number(e.target.value))
                              }
                              min={1}
                              max={10}
                            />
                          </div>
                          <S.EditActions>
                            <S.SaveButton
                              onClick={() => handleSave(subject.id)}
                              disabled={saving}
                            >
                              {saving ? "Saving..." : "Save"}
                            </S.SaveButton>
                            <S.CancelButton onClick={() => setEditingId(null)}>
                              Cancel
                            </S.CancelButton>
                          </S.EditActions>
                        </S.EditForm>
                      ) : (
                        /* View mode */
                        <S.SubjectInfo>
                          <div>
                            <S.SubjectName>{subject.name}</S.SubjectName>
                            <S.SubjectMeta>
                              {subject.grades.map((g, index) => (
                                <S.GradeBadge key={`${g}-${index}`}>
                                  Gr {g}
                                </S.GradeBadge>
                              ))}
                              <S.MetaText>
                                {subject.teacherCount} teacher
                                {subject.teacherCount !== 1 ? "s" : ""} assigned
                              </S.MetaText>
                              <S.MetaText>
                                {subject.periodsPerWeek} periods/week
                              </S.MetaText>
                            </S.SubjectMeta>
                          </div>
                          <S.ButtonGroup>
                            <S.EditButton onClick={() => startEdit(subject)}>
                              Edit
                            </S.EditButton>
                            <S.DeleteButton
                              onClick={() =>
                                handleDelete(subject.id, subject.name)
                              }
                            >
                              Remove
                            </S.DeleteButton>
                          </S.ButtonGroup>
                        </S.SubjectInfo>
                      )}
                    </S.SubjectRow>
                  ))}

                  {subjects.length === 0 && (
                    <div
                      style={{
                        padding: "1rem 1.5rem",
                        fontSize: "0.8rem",
                        color: "#9ca3af",
                      }}
                    >
                      No subjects assigned to Grade {grade} yet.
                    </div>
                  )}
                </div>
              )}
            </S.GradeGroupCard>
          ))}
        </div>
      )}
    </S.Container>
  );
}
