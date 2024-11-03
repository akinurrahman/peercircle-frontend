import { LoginSchemaType } from "@/validations/auth.schema";
import http from "../http";

const baseUrl = "/api/user";

export const loginApi = async (data: LoginSchemaType) => {
  const response = await http.post(`${baseUrl}/login`, data);
  console.log(response, "response");
  console.log(response.data, "response data");
  return response.data;
};
