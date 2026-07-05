"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Wrapper } from "@/wrappers/adminCreateStudent";
import { showSuccess, showError } from "@/components/ui/toast";
import {
  CredentialCard,
  CredentialHeader,
  ResponseTitle,
  ResponseItem,
  PasswordValue,
  PrintButton,
  ButtonGroup,
  PDFButton,
} from "@/wrappers/adminCreateTeacher";

type SchoolClass = {
  id: number;
  grade: number;
  section: string;
  currentStrength: number;
  maxStrength: number;
};
type Grade = {
  id: number;
  grade: number;
};
type ExistingChild = {
  id: number;
  firstName: string;
  lastName: string;
  grade?: number;
  section?: string;
};

export default function CreateStudentPage() {
  // Class State
  const [grades, setGrades] = useState<Grade[]>([]);
  const [sections, setSections] = useState<SchoolClass[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
  const [credentials, setCredentials] = useState<{
    parentUsername?: string;
    parentPassword?: string;
  } | null>(null);

  // Student State
  const [firstName, setFirstName] = useState("Alice");
  const [lastName, setLastName] = useState("Wood");
  const [dateOfBirth, setDateOfBirth] = useState("2010-01-01");
  const [gender, setGender] = useState("FEMALE");

  // Parent State
  const [phone, setPhone] = useState("03001234567");
  const [fatherName, setFatherName] = useState("John Doe");
  const [motherName, setMotherName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane@gmail.com");
  const [address, setAddress] = useState("123 Test Street");
  const [parentExists, setParentExists] = useState(false);
  const [existingChildren, setExistingChildren] = useState<ExistingChild[]>([]);

  const [joiningYear, setJoiningYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch grades
  useEffect(() => {
    const fetchGrades = async () => {
      const res = await api.get("/school-class/grades");
      setGrades(res.data);
    };
    fetchGrades();
  }, []);

  useEffect(() => {
    if (credentials) {
      // wait a bit so UI renders fully
      setTimeout(() => {
        handleDownloadPDF();
      }, 500);
    }
  }, [credentials]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // First Name
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = "First name must contain only letters";
    }

    // Last Name
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = "Last name must contain only letters";
    }

    // Date of Birth
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else if (new Date(dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Date of birth cannot be in the future";
    }

    // Gender
    if (!gender) {
      newErrors.gender = "Please select gender";
    }

    // Phone
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^03\d{9}$/.test(phone)) {
      newErrors.phone = "Phone must be 11 digits and start with 03";
    }

    // Email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Father Name
    if (!fatherName.trim()) {
      newErrors.fatherName = "Father name is required";
    }

    // Mother Name
    if (!motherName.trim()) {
      newErrors.motherName = "Mother name is required";
    }

    // Address
    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // When grade selected → fetch sections
  const handleGradeChange = async (grade: number) => {
    setSelectedGrade(grade);
    setSelectedClass(null);
    const res = await api.get(`/school-class/sections?gradeId=${grade}`);
    setSections(res.data);
  };

  const handleSectionChange = (classId: number) => {
    const found = sections.find((s) => s.id === classId) || null;
    setSelectedClass(found);
  };

  const seatsAvailable =
    selectedClass && selectedClass.maxStrength - selectedClass.currentStrength;

  const isFull =
    selectedClass && selectedClass.currentStrength >= selectedClass.maxStrength;

  // Look up parent by phone — runs as soon as 11 digits are entered
  const handlePhoneLookup = async (value: string) => {
    if (!value) return;

    try {
      const res = await api.get(`/parent/by-phone?phone=${value}`);

      if (res.data) {
        setFatherName(res.data.fatherName);
        setMotherName(res.data.motherName);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setExistingChildren(res.data.children || []);
        setParentExists(true);
      } else {
        setParentExists(false);
        setExistingChildren([]);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setParentExists(false);
    setExistingChildren([]);

    if (value.length === 11) {
      handlePhoneLookup(value);
    }
  };

  const handleSubmit = async () => {
    if (!selectedClass) return showError("Please select class first");
    if (isFull) return showError("Selected section is full");
    if (!validateForm()) return;
    try {
      setLoading(true);

      const res = await api.post("/student", {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        fatherName,
        motherName,
        phone,
        email,
        address,
        classId: selectedClass.id,
        joiningYear,
      });

      if (res.data) {
        setCredentials({
          // studentUsername: res.data.username,
          // studentPassword: res.data.temporaryPassword,
          parentUsername: res.data.parentUsername,
          parentPassword: res.data.parentPassword,
        });

        showSuccess("Student admitted successfully!");
      } else {
        showSuccess("Student admitted successfully!");
      }
    } catch (err) {
      showError("Failed to create student");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("studentCredentialCard");
    if (!element) return;

    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    pdf.save(`Parent-${credentials?.parentUsername}-Credentials.pdf`);
  };

  return (
    <Wrapper>
      <div className="card">
        <h1>Student Admission</h1>

        {/* ================= STEP 1: CLASS SELECTION ================= */}
        <h3>Step 1: Select Class</h3>

        <label>Grade</label>
        <select onChange={(e) => handleGradeChange(Number(e.target.value))}>
          <option value="">Select Grade</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              Grade {g.grade}
            </option>
          ))}
        </select>

        {selectedGrade && (
          <>
            <label>Section</label>
            <select
              onChange={(e) => handleSectionChange(Number(e.target.value))}
            >
              <option value="">Select Section</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.section} ({s.currentStrength}/{s.maxStrength})
                </option>
              ))}
            </select>
          </>
        )}

        {selectedClass && <p>Seats Available: {seatsAvailable}</p>}

        {isFull && (
          <p style={{ color: "red" }}>
            This section is full. Please select another.
          </p>
        )}

        {/* ================= STEP 2: PARENT LOOKUP ================= */}
        {selectedClass && !isFull && (
          <>
            <h3>Step 2: Parent Information</h3>
            <input
              placeholder="Phone"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
            {errors.phone && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.phone}</p>
            )}

            {parentExists && (
              <>
                <p style={{ color: "green" }}>
                  Existing parent found. Student will be attached.
                </p>
                {existingChildren.length > 0 && (
                  <div
                    style={{
                      background: "#f5f5f5",
                      padding: "8px",
                      borderRadius: "6px",
                      marginBottom: "10px",
                    }}
                  >
                    <strong>Already enrolled:</strong>
                    <ul style={{ margin: "4px 0 0 18px" }}>
                      {existingChildren.map((c) => (
                        <li key={c.id}>
                          {c.firstName} {c.lastName}
                          {c.grade
                            ? ` — Grade ${c.grade}${c.section ? ` ${c.section}` : ""}`
                            : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            <input
              placeholder="Father Name"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              disabled={parentExists}
            />
            {errors.fatherName && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.fatherName}
              </p>
            )}
            <input
              placeholder="Mother Name"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              disabled={parentExists}
            />
            {errors.motherName && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.motherName}
              </p>
            )}
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={parentExists}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>
            )}
            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={parentExists}
            />
            {errors.address && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.address}</p>
            )}

            {/* ================= STEP 3: STUDENT INFO ================= */}
            <h3>Step 3: Student Information</h3>
            <input
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.firstName}
              </p>
            )}
            <input
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.lastName}
              </p>
            )}
            <input
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.dateOfBirth}
              </p>
            )}
            <select onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors.gender}</p>
            )}

            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Admitting..." : "Admit Student"}
            </button>
          </>
        )}

        {credentials && (
          <>
            <CredentialCard id="studentCredentialCard">
              <CredentialHeader>
                <ResponseTitle>Login Credentials</ResponseTitle>
                <PrintButton onClick={() => window.print()}>
                  🖨️ Print
                </PrintButton>
              </CredentialHeader>

              {/* 👨‍👩‍👧 Parent Section (only if exists) */}
              {credentials.parentUsername && (
                <>
                  <hr style={{ margin: "15px 0" }} />

                  <ResponseTitle>Parent Credentials</ResponseTitle>

                  <ResponseItem>
                    <strong>Username:</strong> {credentials.parentUsername}
                  </ResponseItem>

                  <ResponseItem>
                    <strong>Password:</strong>
                    <PasswordValue>{credentials.parentPassword}</PasswordValue>
                  </ResponseItem>
                </>
              )}
            </CredentialCard>

            {/* Buttons */}
            <ButtonGroup>
              <PDFButton onClick={handleDownloadPDF}>📥 Download PDF</PDFButton>
            </ButtonGroup>
          </>
        )}
      </div>
    </Wrapper>
  );
}
