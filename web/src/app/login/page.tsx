"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import { LoginPayload } from "@/types/auth";
import {
  Container,
  Card,
  Title,
  InputGroup,
  IconWrapper,
  Input,
  LoginButton,
  ForgotPassword,
  ErrorMessage,
  BackToHome,
} from "@/wrappers/loginStyles";
import { FaUser, FaLock } from "react-icons/fa";
// import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function LoginPage() {
  const [form, setForm] = useState<LoginPayload>({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    // Check if theme is applied
    const theme = document.documentElement.getAttribute("data-theme");
    if (!theme) {
      document.documentElement.setAttribute("data-theme", "isomania");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleLogin = async () => {
    // Basic validation
    if (!form.identifier || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

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
      setError("Invalid email/username or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container>
      <Card>
        <Title>Welcome Back</Title>

        <InputGroup>
          <IconWrapper>
            <FaUser />
          </IconWrapper>
          <Input
            name="identifier"
            placeholder="Email or Username"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={form.identifier}
            autoComplete="username"
          />
        </InputGroup>

        <InputGroup>
          <IconWrapper>
            <FaLock />
          </IconWrapper>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={form.password}
            autoComplete="current-password"
          />
        </InputGroup>

        <ForgotPassword>Forgot Password?</ForgotPassword>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LoginButton onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "LOGGING IN..." : "LOGIN"}
        </LoginButton>

        <BackToHome onClick={() => router.push("/dashboard")}>
          ← Back to Home
        </BackToHome>
      </Card>
      <ThemeToggle />
    </Container>
  );
}
