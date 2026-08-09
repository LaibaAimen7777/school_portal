"use client";

import Link from "next/link";
import styled from "styled-components";

const HeaderCard = styled.div`
  background-color: var(--bg-container, #ffffff);
  border: 2px solid var(--border-color, #1a1a1a);
  border-radius: 20px;
  padding: 24px 28px;
  margin-bottom: 24px;
  box-shadow: 0 4px 0 var(--border-color, #1a1a1a);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderText = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    color: var(--text-color, #1a1a1a);
    margin: 0 0 4px 0;
  }

  p {
    font-size: 0.85rem;
    font-weight: 700;
    color: #64748b;
    margin: 0;
  }
`;

const NavButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ActionPillButton = styled.button<{ $active?: boolean }>`
  background-color: ${(props) =>
    props.$active
      ? "var(--accent-color, #f2b72b)"
      : "var(--bg-color, #ffffff)"};
  color: var(--button-text, #1a1a1a);
  border: 2px solid var(--border-color, #1a1a1a);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 0.6rem 1.2rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 3px 0 var(--border-color, #1a1a1a);
  text-transform: uppercase;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 0 var(--border-color, #1a1a1a);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 0 var(--border-color, #1a1a1a);
  }
`;

interface TeacherHeaderProps {
  title?: string;
  subtitle?: string;
  activeTab?: "overview" | "attendance" | "students" | "schedule";
}

export default function TeacherHeader({
  title = "Welcome Back",
  subtitle,
  activeTab = "overview",
}: TeacherHeaderProps) {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <HeaderCard>
      <HeaderText>
        <h1>{title}</h1>
        <p>{subtitle || `${formattedDate} — Management Console`}</p>
      </HeaderText>

      <NavButtonGroup>
        <Link href="/dashboard/teacher">
          <ActionPillButton $active={activeTab === "overview"}>
            Overview
          </ActionPillButton>
        </Link>
        <Link href="/dashboard/teacher/attendance">
          <ActionPillButton $active={activeTab === "attendance"}>
            Attendance
          </ActionPillButton>
        </Link>
        <Link href="/dashboard/teacher/students">
          <ActionPillButton $active={activeTab === "students"}>
            Students
          </ActionPillButton>
        </Link>
        <Link href="/dashboard/teacher/schedule">
          <ActionPillButton $active={activeTab === "schedule"}>
            Schedule
          </ActionPillButton>
        </Link>
      </NavButtonGroup>
    </HeaderCard>
  );
}
