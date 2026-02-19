"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

type User = {
  id: number;
  email: string;
  username: string;
  role: string;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "student",
  });

  const createUser = async () => {
    try {
      const res = await api.post("/users", newUser);
      setUsers([...users, res.data]);
    } catch (error) {
      console.error("Failed to create user");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get<User[]>("/users");
        setUsers(res.data);
      } catch (error: any) {
        console.error("Full error:", error);
        console.error("Response:", error.response);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>All Users:</h2>

      {users.map((user) => (
        <div key={user.id}>
          {user.email} — {user.role}
        </div>
      ))}

      <h2>Create User</h2>

      <input
        placeholder="Name"
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <br />
      <input
        placeholder="Email"
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <br />

      <input
        placeholder="Username"
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <br />
      <select
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <br />

      <button onClick={createUser}>Create</button>
    </div>
  );
}
