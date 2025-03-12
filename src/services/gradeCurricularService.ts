import axios from "axios"
import type { GradeCurricularDto, CreateGradeCurricularDto, UpdateGradeCurricularDto } from "../types/gradeCurricular"
import { authService } from "./authService"

//const API_URL = "http://localhost:3000" // Adjust to your backend URL
const API_URL = import.meta.env.VITE_API_URL + "/grade-curricular"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken()
    //console.log("Token:", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const gradeCurricularService = {
  getAll: async (): Promise<GradeCurricularDto[]> => {
    const response = await axiosInstance.get("")
    return response.data
  },

  getById: async (id: number): Promise<GradeCurricularDto> => {
    const response = await axiosInstance.get(`/${id}`)
    return response.data
  },

  create: async (gradeCurricular: FormData): Promise<GradeCurricularDto | CreateGradeCurricularDto> => {
    const response = await axiosInstance.post("", gradeCurricular)
    return response.data
  },

  /*
  create: async (gradeCurricular: CreateGradeCurricularDto): Promise<GradeCurricularDto> => {
    const formData = new FormData()
    Object.entries(gradeCurricular).forEach(([key, value]) => {
      if (key === "ementa" && value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    })

    const response = await axios.post(`${API_URL}/grade-curricular`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },
  */

  update: async (id: number, gradeCurricular: FormData): Promise<UpdateGradeCurricularDto> => {
    const response = await axiosInstance.patch(`${id}`, gradeCurricular);
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/${id}`)
  },
}