"use server";

interface SignupResponse {
  status: number;
  message: string;
}

import { asyncRequestHandler } from "@/utils/asyncRequestHandler";
import { SignUpSchemaType } from "@/validations/auth.schema";
import axios from "axios";

export const handleSignUp = async (data: SignUpSchemaType) => {
  return await asyncRequestHandler(() => {
    return axios.post<SignupResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register`,
      {
        full_name: data.fullName,
        user_email: data.email,
        password: data.password,
        confirm_password: data.confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  });
};
