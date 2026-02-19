"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import { LoginPayload } from "@/types/auth";
import { userAgent } from "next/server";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  padding: 40px;
  border-radius: 12px;
  background: #d87070;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 350px;
`;

export default function LoginPage() {
  const [form, setForm] = useState<LoginPayload>({
    identifier: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const data = await login(form);

      console.log("data in handle login in login:", data);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        router.push("/dashboard/admin");
      } else if (data.role === "teacher") {
        router.push("/dashboard/teacher");
      } else {
        router.push("/dashboard/student");
      }
    } catch (error) {
      alert("Invalid credentials===>login page");
    }
  };

  return (
    <Container>
      <Card>
        <h2>Login</h2>

        <input
          name="identifier"
          placeholder="Email or username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />

        <button onClick={handleLogin}>Login</button>
      </Card>
    </Container>
  );
}
