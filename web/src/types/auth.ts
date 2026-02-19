export type LoginResponse = {
  access_token: string;
  role: "admin" | "teacher" | "student";
};

export type LoginPayload = {
  identifier: string;
  password: string;
};
