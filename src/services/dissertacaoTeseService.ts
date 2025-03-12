import axios from "axios"
import type { DissertacaoTeseDto } from "../types/dissertacaoTese"
import { authService } from "./authService"

//const API_URL = "http://localhost:3000"
const API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const dissertacaoTeseService = {
  // Obtém todas as dissertações e teses do banco de dados
  getAll: async (): Promise<DissertacaoTeseDto[]> => {
    const response = await axiosInstance.get("/dissertacoes-teses")
    return response.data
  },

  // Obtém uma dissertação ou tese específica pelo ID
  getById: async (id: number): Promise<DissertacaoTeseDto> => {
    const response = await axiosInstance.get(`/dissertacoes-teses/${id}`)
    return response.data
  },

  // Cria uma nova dissertação ou tese no banco de dados
  create: async (formData: FormData): Promise<DissertacaoTeseDto> => {
    const response = await axiosInstance.post("/dissertacoes-teses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },

  // Atualiza uma dissertação ou tese existente no banco de dados
  update: async (id: number, formData: FormData): Promise<DissertacaoTeseDto> => {
    const response = await axiosInstance.patch(`/dissertacoes-teses/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    return response.data
  },

  // Remove uma dissertação ou tese do banco de dados
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/dissertacoes-teses/${id}`)
  },

  downloadArquivo: async (id: number): Promise<Blob> => {
    const response = await axiosInstance.get(`/dissertacoes-teses/${id}/download`, {
      responseType: "blob",
    })
    return response.data
  }
}

