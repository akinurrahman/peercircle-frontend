"use server";

import { asyncRequestHandler } from "@/utils/asyncRequestHandler";
import { LoginSchemaType } from "@/validations/auth.schema";
import axios from "axios";

export const handleLogin = async (data: LoginSchemaType) => {
  return await asyncRequestHandler(() => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  });
};
