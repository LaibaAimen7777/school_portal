"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  AdminContainer,
  Sidebar,
  SidebarHeader,
  NavSection,
  NavButton,
  MainContent,
  ContentHeader,
  StatsGrid,
  StatCard,
  TableContainer,
  Table,
  StatusBadge,
  FormContainer,
  FormGroup,
  FormRow,
  Button,
  ButtonGroup,
  SearchBar,
  ActionIcon,
  EmptyState,
  ThemeButton,
} from "@/wrappers/adminStyles";

type User = {
  id: number;
  email: string;
  username: string;
  role: string;
  status?: string;
  createdAt?: string;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "student",
  });

  const [currentTheme, setCurrentTheme] = useState<"isomania" | "piship">(
    "isomania",
  );

  const toggleTheme = () => {
    const newTheme = currentTheme === "isomania" ? "piship" : "isomania";
    setCurrentTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "isomania" | "piship") || "isomania";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get<User[]>("/users");
      // Add mock status for demo
      const usersWithStatus = res.data.map((user) => ({
        ...user,
        status: ["active", "pending", "inactive"][
          Math.floor(Math.random() * 3)
        ],
        createdAt: new Date(Date.now() - Math.random() * 10000000000)
          .toISOString()
          .split("T")[0],
      }));
      setUsers(usersWithStatus);
    } catch (error: any) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    try {
      await api.post("/users", newUser);
      fetchUsers();
      setShowCreateForm(false);
      setNewUser({
        name: "",
        email: "",
        username: "",
        password: "",
        role: "student",
      });
    } catch (error) {
      console.error("Failed to create user");
    }
  };

  // Replace the filteredUsers section (around line 112) with this safer version:

  const filteredUsers = users.filter((user) => {
    // Safely check each property with optional chaining and nullish coalescing
    const email = user.email?.toLowerCase() || "";
    const username = user.username?.toLowerCase() || "";
    const role = user.role?.toLowerCase() || "";
    const searchLower = searchTerm.toLowerCase();

    return (
      email.includes(searchLower) ||
      username.includes(searchLower) ||
      role.includes(searchLower)
    );
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    teachers: users.filter((u) => u.role === "teacher").length,
    students: users.filter((u) => u.role === "student").length,
  };

  return (
    <AdminContainer>
      <Sidebar>
        <SidebarHeader>
          <div className="logo">
            {currentTheme === "isomania" ? "ISOMANIA" : "PISHIP"}
          </div>
          <div className="role-badge">ADMIN PANEL</div>
        </SidebarHeader>

        <NavSection>
          <div className="section-title">MAIN</div>
          <NavButton $active>
            <span className="icon">📊</span>
            Dashboard
          </NavButton>
          <NavButton>
            <span className="icon">👥</span>
            Users
          </NavButton>
          <NavButton>
            <span className="icon">📚</span>
            Students
          </NavButton>
          <NavButton>
            <span className="icon">👨‍🏫</span>
            Teachers
          </NavButton>
        </NavSection>

        <NavSection>
          <div className="section-title">MANAGEMENT</div>
          <NavButton>
            <span className="icon">➕</span>
            Create Student
          </NavButton>
          <NavButton>
            <span className="icon">➕</span>
            Create Teacher
          </NavButton>
          <NavButton>
            <span className="icon">⚙️</span>
            Settings
          </NavButton>
        </NavSection>
      </Sidebar>

      <MainContent>
        <ContentHeader>
          <div>
            <span className="page-title">
              <span>WELCOME BACK</span>
              Admin Dashboard
            </span>
          </div>
          <div className="date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </ContentHeader>

        <StatsGrid>
          <StatCard>
            <div className="stat-header">
              <span className="stat-title">Total Users</span>
              <span className="stat-icon">👥</span>
            </div>
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-change">↑ 12% this month</div>
          </StatCard>
          <StatCard>
            <div className="stat-header">
              <span className="stat-title">Active Users</span>
              <span className="stat-icon">✅</span>
            </div>
            <div className="stat-value">{stats.activeUsers}</div>
            <div className="stat-change">↑ 8% this week</div>
          </StatCard>
          <StatCard>
            <div className="stat-header">
              <span className="stat-title">Teachers</span>
              <span className="stat-icon">👨‍🏫</span>
            </div>
            <div className="stat-value">{stats.teachers}</div>
            <div className="stat-change">→ No change</div>
          </StatCard>
          <StatCard>
            <div className="stat-header">
              <span className="stat-title">Students</span>
              <span className="stat-icon">📚</span>
            </div>
            <div className="stat-value">{stats.students}</div>
            <div className="stat-change">↑ 5% this week</div>
          </StatCard>
        </StatsGrid>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.5rem" }}>User Management</h2>
          <Button $primary onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? "Cancel" : "+ Create New User"}
          </Button>
        </div>

        {showCreateForm && (
          <FormContainer style={{ marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>
              Create New User
            </h3>
            <FormRow>
              <FormGroup>
                <label>Full Name</label>
                <input
                  placeholder="John Doe"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label>Username</label>
                <input
                  placeholder="johndoe"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label>Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label>Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </FormGroup>
            </FormRow>

            <ButtonGroup>
              <Button $primary onClick={createUser}>
                Create User
              </Button>
              <Button onClick={() => setShowCreateForm(false)}>Cancel</Button>
            </ButtonGroup>
          </FormContainer>
        )}

        <SearchBar>
          <input
            placeholder="Search users by email, username, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <TableContainer>
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              Loading...
            </div>
          ) : filteredUsers.length === 0 ? (
            <EmptyState>
              <div className="icon">👥</div>
              <h3>No users found</h3>
              <p>Try adjusting your search or create a new user.</p>
            </EmptyState>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>
                      <StatusBadge $status={user.role}>{user.role}</StatusBadge>
                    </td>
                    <td>
                      <StatusBadge $status={user.status}>
                        {user.status}
                      </StatusBadge>
                    </td>
                    <td>{user.createdAt}</td>
                    <td>
                      <ActionIcon>✏️</ActionIcon>
                      <ActionIcon>🗑️</ActionIcon>
                      <ActionIcon>👁️</ActionIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </TableContainer>
      </MainContent>

      <ThemeButton onClick={toggleTheme}>
        {currentTheme === "isomania"
          ? "SWITCH TO PISHIP →"
          : "← SWITCH TO ISOMANIA"}
      </ThemeButton>
    </AdminContainer>
  );
}
