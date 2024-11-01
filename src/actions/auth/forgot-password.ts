"use server";

import { asyncRequestHandler } from "@/utils/asyncRequestHandler";
import { ForgotPasswordFormData } from "@/validations/auth.schema";
import axios from "axios";

interface ResetTypes {
  new_password: string;
  confirm_password: string;
  reset_token: string;
}

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

export const handleForgotPasswordOTPverification = async (
  user_email: string,
  otp: string
) => {
  return await asyncRequestHandler(() => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/forgot_otp_verify`,
      {
        user_email,
        otp,
      }
    );
  });
};
export const handleResetPassword = async (data: ResetTypes) => {
  return await asyncRequestHandler(() => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/set_password`,
      data
    );
  });
};
