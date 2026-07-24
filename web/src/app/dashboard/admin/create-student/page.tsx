"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Wrapper } from "@/wrappers/adminCreateStudent";
import {
  DashboardHeaderCard,
  UserIconWrapper,
} from "@/wrappers/adminLayoutStyles";
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
import {
  FaUserPlus,
  FaSchool,
  FaPhone,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaCheckCircle,
  FaExclamationCircle,
  FaPrint,
  FaDownload,
  FaUsers,
} from "react-icons/fa";

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

  const [joiningYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch grades
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await api.get("/school-class/grades");
        setGrades(res.data);
      } catch {
        showError("Failed to load grades.");
      }
    };
    fetchGrades();
  }, []);

  useEffect(() => {
    if (credentials) {
      setTimeout(() => {
        handleDownloadPDF();
      }, 500);
    }
  }, [credentials]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = "First name must contain only letters";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = "Last name must contain only letters";
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else if (new Date(dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Date of birth cannot be in the future";
    }

    if (!gender) {
      newErrors.gender = "Please select gender";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^03\d{9}$/.test(phone)) {
      newErrors.phone = "Phone must be 11 digits and start with 03";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!fatherName.trim()) {
      newErrors.fatherName = "Father name is required";
    }

    if (!motherName.trim()) {
      newErrors.motherName = "Mother name is required";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGradeChange = async (grade: number) => {
    setSelectedGrade(grade);
    setSelectedClass(null);
    try {
      const res = await api.get(`/school-class/sections?gradeId=${grade}`);
      setSections(res.data);
    } catch {
      showError("Failed to fetch class sections.");
    }
  };

  const handleSectionChange = (classId: number) => {
    const found = sections.find((s) => s.id === classId) || null;
    setSelectedClass(found);
  };

  const seatsAvailable =
    selectedClass && selectedClass.maxStrength - selectedClass.currentStrength;

  const isFull =
    selectedClass && selectedClass.currentStrength >= selectedClass.maxStrength;

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
          parentUsername: res.data.parentUsername,
          parentPassword: res.data.parentPassword,
        });

        showSuccess("Student admitted successfully!");
      }
    } catch {
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
      {/* PAGE HEADER */}
      <DashboardHeaderCard>
        <div className="header-left">
          <UserIconWrapper>
            <FaUserPlus />
          </UserIconWrapper>
          <h1>STUDENT ADMISSION</h1>
        </div>
      </DashboardHeaderCard>

      <div className="form-card">
        {/* STEP 1: CLASS SELECTION */}
        <section className="form-section">
          <div className="section-header">
            <span className="step-badge">1</span>
            <h3>Select Class & Section</h3>
          </div>

          <div className="input-grid">
            <div className="field-group">
              <label>
                <FaSchool className="field-icon" /> Grade
              </label>
              <select
                onChange={(e) => handleGradeChange(Number(e.target.value))}
              >
                <option value="">Select Grade</option>
                {grades.map((g) => (
                  <option key={g.id} value={g.id}>
                    Grade {g.grade}
                  </option>
                ))}
              </select>
            </div>

            {selectedGrade && (
              <div className="field-group">
                <label>
                  <FaUsers className="field-icon" /> Section
                </label>
                <select
                  onChange={(e) => handleSectionChange(Number(e.target.value))}
                >
                  <option value="">Select Section</option>
                  {sections.map((s) => (
                    <option key={s.id} value={s.id}>
                      Section {s.section} ({s.currentStrength}/{s.maxStrength})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {selectedClass && (
            <div className={`status-banner ${isFull ? "error" : "success"}`}>
              {isFull ? (
                <>
                  <FaExclamationCircle />
                  <span>
                    This section is full. Please choose another section.
                  </span>
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  <span>
                    Seats Available: <strong>{seatsAvailable}</strong>
                  </span>
                </>
              )}
            </div>
          )}
        </section>

        {/* STEP 2: PARENT INFORMATION */}
        {selectedClass && !isFull && (
          <section className="form-section">
            <div className="section-header">
              <span className="step-badge">2</span>
              <h3>Parent Information</h3>
            </div>

            <div className="field-group single-col">
              <label>
                <FaPhone className="field-icon" /> Phone Number (Auto Lookup)
              </label>
              <input
                placeholder="e.g. 03001234567"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
              />
              {errors.phone && (
                <span className="error-text">{errors.phone}</span>
              )}
            </div>

            {parentExists && (
              <div className="existing-parent-box">
                <p className="success-tag">
                  <FaCheckCircle /> Existing parent record found! Fields locked
                  automatically.
                </p>
                {existingChildren.length > 0 && (
                  <div className="children-list">
                    <strong>Enrolled Siblings:</strong>
                    <ul>
                      {existingChildren.map((c) => (
                        <li key={c.id}>
                          {c.firstName} {c.lastName}
                          {c.grade
                            ? ` — Grade ${c.grade}${c.section ? ` (${c.section})` : ""}`
                            : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="input-grid">
              <div className="field-group">
                <label>
                  <FaUser className="field-icon" /> Father Name
                </label>
                <input
                  placeholder="Father Full Name"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  disabled={parentExists}
                />
                {errors.fatherName && (
                  <span className="error-text">{errors.fatherName}</span>
                )}
              </div>

              <div className="field-group">
                <label>
                  <FaUser className="field-icon" /> Mother Name
                </label>
                <input
                  placeholder="Mother Full Name"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  disabled={parentExists}
                />
                {errors.motherName && (
                  <span className="error-text">{errors.motherName}</span>
                )}
              </div>

              <div className="field-group">
                <label>
                  <FaEnvelope className="field-icon" /> Email Address
                </label>
                <input
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={parentExists}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="field-group">
                <label>
                  <FaMapMarkerAlt className="field-icon" /> Address
                </label>
                <input
                  placeholder="Residential Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={parentExists}
                />
                {errors.address && (
                  <span className="error-text">{errors.address}</span>
                )}
              </div>
            </div>
          </section>
        )}

        {/* STEP 3: STUDENT INFORMATION */}
        {selectedClass && !isFull && (
          <section className="form-section">
            <div className="section-header">
              <span className="step-badge">3</span>
              <h3>Student Details</h3>
            </div>

            <div className="input-grid">
              <div className="field-group">
                <label>
                  <FaUser className="field-icon" /> First Name
                </label>
                <input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <span className="error-text">{errors.firstName}</span>
                )}
              </div>

              <div className="field-group">
                <label>
                  <FaUser className="field-icon" /> Last Name
                </label>
                <input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <span className="error-text">{errors.lastName}</span>
                )}
              </div>

              <div className="field-group">
                <label>
                  <FaCalendarAlt className="field-icon" /> Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                {errors.dateOfBirth && (
                  <span className="error-text">{errors.dateOfBirth}</span>
                )}
              </div>

              <div className="field-group">
                <label>
                  <FaVenusMars className="field-icon" /> Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                {errors.gender && (
                  <span className="error-text">{errors.gender}</span>
                )}
              </div>
            </div>

            <div className="form-submit-row">
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Admitting Student..." : "Admit Student"}
              </button>
            </div>
          </section>
        )}

        {/* CREDENTIALS RESULT CARD */}
        {credentials && (
          <section className="credentials-section">
            <CredentialCard id="studentCredentialCard">
              <CredentialHeader>
                <ResponseTitle>Parent Access Credentials</ResponseTitle>
                <PrintButton onClick={() => window.print()}>
                  <FaPrint /> Print Card
                </PrintButton>
              </CredentialHeader>

              {credentials.parentUsername && (
                <div className="credentials-body">
                  <ResponseItem>
                    <strong>Username:</strong> {credentials.parentUsername}
                  </ResponseItem>

                  <ResponseItem>
                    <strong>Password:</strong>
                    <PasswordValue>{credentials.parentPassword}</PasswordValue>
                  </ResponseItem>
                </div>
              )}
            </CredentialCard>

            <ButtonGroup>
              <PDFButton onClick={handleDownloadPDF}>
                <FaDownload /> Download Credential PDF
              </PDFButton>
            </ButtonGroup>
          </section>
        )}
      </div>
    </Wrapper>
  );
}
