"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/services/api";
import Link from "next/link";
import * as S from "@/wrappers/teacherDashboard";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [teacherData, setTeacherData] = useState<any>(null);

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
        console.log("teacher data", res.data);
        setTeacherData(res.data);
      } catch (error) {
        console.error("Failed:", error);
      }
    };
    fetchTeacherData();
  }, []);

  const isActive = (path: string) => pathname === path;

  if (!checked) return null;

  return (
    <S.DashboardContainer>
      <S.Nav>
        <S.NavContainer>
          <S.NavLogo>Teacher Portal</S.NavLogo>

          <S.NavList>
            <S.NavItem>
              <S.NavLink
                as={Link}
                href="/dashboard/teacher"
                $active={isActive("/dashboard/teacher")}
              >
                Overview
              </S.NavLink>
            </S.NavItem>

            <S.NavItem>
              <S.NavLink
                as={Link}
                href="/dashboard/teacher/schedule"
                $active={isActive("/dashboard/teacher/schedule")}
              >
                Schedule
              </S.NavLink>
            </S.NavItem>

            <S.NavItem>
              <S.NavLink
                as={Link}
                href="/dashboard/teacher/students"
                $active={isActive("/dashboard/teacher/students")}
              >
                Students
              </S.NavLink>
            </S.NavItem>

            <S.NavItem>
              <S.NavLink
                as={Link}
                href="/dashboard/teacher/attendance"
                $active={isActive("/dashboard/teacher/attendance")}
              >
                Attendance
              </S.NavLink>
            </S.NavItem>

            {/* <S.NavItem>
              <S.NavLink
                as={Link}
                href="/dashboard/teacher/analytics"
                $active={isActive("/dashboard/teacher/analytics")}
              >
                Analytics
              </S.NavLink>
            </S.NavItem> */}
          </S.NavList>
        </S.NavContainer>
      </S.Nav>

      <S.Container>
        <S.HeaderCard>
          <S.HeaderContent>
            <S.TeacherInfo>
              <S.Avatar>
                {teacherData?.teacher?.fullName?.charAt(0) || "T"}
              </S.Avatar>
              <S.TeacherDetails>
                <h2>{teacherData?.teacher?.fullName || "Teacher"}</h2>
                <S.BadgeGroup>
                  {teacherData?.teacher?.subjectGrades?.map((sg: any) => (
                    <S.Badge key={sg.id} $primary>
                      {sg.subject.name} (Grade {sg.grade})
                    </S.Badge>
                  ))}

                  {(!teacherData?.teacher?.subjectGrades ||
                    teacherData.teacher.subjectGrades.length === 0) && (
                    <S.Badge>No Subjects</S.Badge>
                  )}

                  <S.Badge>
                    ID: {teacherData?.teacher?.teacherCode || "N/A"}
                  </S.Badge>
                </S.BadgeGroup>
                <S.TeachingSince>
                  Teaching since{" "}
                  {teacherData?.teacher?.hireDate
                    ? new Date(teacherData.teacher.hireDate).getFullYear()
                    : "N/A"}
                </S.TeachingSince>
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

        {children}
      </S.Container>
    </S.DashboardContainer>
  );
}
