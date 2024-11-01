"use server";

import { asyncRequestHandler } from "@/utils/asyncRequestHandler";
import { ForgotPasswordFormData } from "@/validations/auth.schema";
import axios from "axios";

export const handleForgotPassword = async (data: ForgotPasswordFormData) => {
  return await asyncRequestHandler(() => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/forgot_password`,
      {
        user_email: data.email,
      }
    );
  });
};
