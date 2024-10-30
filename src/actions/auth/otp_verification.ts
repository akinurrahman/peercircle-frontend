"use server";

import { asyncRequestHandler } from "@/utils/asyncRequestHandler";
import axios from "axios";

interface OTPInterface {
  status: string;
  message: string;
  token: string;
  user_name: string;
}

export const handleOTPverification = async (
  user_email: string,
  otp: string
) => {
  return await asyncRequestHandler(() => {
    return axios.post<OTPInterface>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/verify_otp`,
      {
        user_email,
        otp,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  });
};
