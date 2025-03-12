import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { dissertacaoTeseService } from "../../services/dissertacaoTeseService"
import type { CreateDissertacaoTeseDto, UpdateDissertacaoTeseDto } from "../../types/dissertacaoTese"
import "./DissertacaoTeseForm.css"

interface DissertacaoTeseFormProps {
  isEditing: boolean
}

const DissertacaoTeseForm: React.FC<DissertacaoTeseFormProps> = ({ isEditing }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CreateDissertacaoTeseDto | UpdateDissertacaoTeseDto>({
    nome_autor: "",
    titulo: "",
    arquivo: undefined,
    orientador: "",
    data: "",
    resumo: "",
  })

  useEffect(() => {
    if (isEditing && id) {
      fetchDissertacaoTese(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchDissertacaoTese = async (dissertacaoTeseId: number) => {
    try {
      const dissertacaoTese = await dissertacaoTeseService.getById(dissertacaoTeseId)
      setFormData(dissertacaoTese)
    } catch (error) {
      console.error("Erro ao buscar dissertação/tese:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (isEditing && id) {
        //await dissertacaoTeseService.update(Number.parseInt(id), formData as UpdateDissertacaoTeseDto)
      } else {
        //await dissertacaoTeseService.create(formData as CreateDissertacaoTeseDto)
      }
      navigate("/dissertacao-tese/list")
    } catch (error) {
      console.error("Erro ao salvar dissertação/tese:", error)
    }
  }

  return (
    <div className="dissertacao-tese-form">
      <h2>{isEditing ? "Editar Dissertação/Tese" : "Criar Dissertação/Tese"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome_autor">Nome do Autor:</label>
          <input
            type="text"
            id="nome_autor"
            name="nome_autor"
            value={formData.nome_autor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="orientador">Orientador:</label>
          <input
            type="text"
            id="orientador"
            name="orientador"
            value={formData.orientador}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="data">Data:</label>
          <input
            type="date"
            id="data"
            name="data"
            value={formData.data ? new Date(formData.data).toISOString().split("T")[0] : ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="resumo">Resumo:</label>
          <textarea id="resumo" name="resumo" value={formData.resumo} onChange={handleChange} required />
        </div>
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default DissertacaoTeseForm