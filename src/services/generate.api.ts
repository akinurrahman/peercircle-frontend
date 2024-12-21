import http from "@/services/http";

// Dynamic API generator for /institute routes
const generateApis = (baseUrl: string) => ({
  getOne: async (id?: string) => {
    const route = id ? `${baseUrl}/${id}` : baseUrl;
    const response = await http.get(route);
    return response.data.data;
  },
  getAll: async (query = "") => {
    const response = await http.get(`${baseUrl}${query}`);
    return response.data.data;
  },
  create: async (data: object) => {
    const response = await http.post(`${baseUrl}`, data);
    return response.data.data;
  },
  updateOne: async (id: string, data: object) => {
    const response = await http.patch(`${baseUrl}/${id}`, data);
    return response.data.data;
  },
  deleteOne: async (id: string) => {
    const response = await http.delete(`${baseUrl}/${id}`);
    return response.data.data;
  },
});

export default generateApis;
