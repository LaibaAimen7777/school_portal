"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutWrapper,
  Sidebar,
  SidebarHeader,
  NavSection,
  NavLabel,
  NavButton,
  SidebarFooter,
  UserInfo,
  UserAvatar,
  UserDetails,
  LogoutButton,
  ContentArea,
} from "@/wrappers/adminLayoutStyles";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserPlus,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBook,
  FaCog,
} from "react-icons/fa";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [userData, setUserData] = useState({
    initial: "A",
    name: "Admin User",
    email: "admin@school.com",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "admin") {
      router.replace("/dashboard");
      return;
    }

    // Get user data from somewhere
    const userEmail = localStorage.getItem("userEmail") || "admin@school.com";
    setUserData({
      initial: userEmail.charAt(0).toUpperCase(),
      name: "Admin User",
      email: userEmail,
    });

    setChecked(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  if (!checked) return null;

  return (
    <LayoutWrapper>
      <Sidebar>
        <SidebarHeader>
          <h2>ADMIN</h2>
          <p>Management Panel</p>
        </SidebarHeader>

        <NavSection>
          <NavLabel>Main</NavLabel>

          <NavButton
            onClick={() => router.push("/dashboard/admin")}
            $active={isActive("/dashboard/admin")}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavButton>

          <NavLabel>Management</NavLabel>

          <NavButton
            onClick={() => router.push("/dashboard/admin/students")}
            $active={isActive("/dashboard/admin/students")}
          >
            <FaUsers />
            <span>Students</span>
          </NavButton>

          <NavButton
            onClick={() => router.push("/dashboard/admin/create-student")}
            $active={isActive("/dashboard/admin/create-student")}
          >
            <FaUserPlus />
            <span>Add Student</span>
          </NavButton>

          <NavButton
            onClick={() => router.push("/dashboard/admin/teacher")}
            $active={isActive("/dashboard/admin/teacher")}
          >
            <FaChalkboardTeacher />
            <span>Teachers</span>
          </NavButton>

          <NavButton
            onClick={() => router.push("/dashboard/admin/create-teacher")}
            $active={isActive("/dashboard/admin/create-teacher")}
          >
            <FaUserPlus />
            <span>Add Teacher</span>
          </NavButton>

          <NavLabel>Academic</NavLabel>

          <NavButton>
            <FaBook />
            <span>Classes</span>
          </NavButton>

          <NavButton>
            <FaCog />
            <span>Settings</span>
          </NavButton>
        </NavSection>

        <SidebarFooter>
          <UserInfo>
            <UserAvatar>{userData.initial}</UserAvatar>
            <UserDetails>
              <h4>{userData.name}</h4>
              <p>{userData.email}</p>
            </UserDetails>
          </UserInfo>

          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </LogoutButton>
        </SidebarFooter>
      </Sidebar>

      <ContentArea>{children}</ContentArea>

      <ThemeToggle />
    </LayoutWrapper>
  );
}
