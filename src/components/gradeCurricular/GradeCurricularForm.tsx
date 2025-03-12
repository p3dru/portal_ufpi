import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { gradeCurricularService } from "../../services/gradeCurricularService"
import type { CreateGradeCurricularDto, UpdateGradeCurricularDto } from "../../types/gradeCurricular"
import "./GradeCurricularForm.css"

interface GradeCurricularFormProps {
  isEditing: boolean
}

const GradeCurricularForm: React.FC<GradeCurricularFormProps> = ({ isEditing }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CreateGradeCurricularDto | UpdateGradeCurricularDto>({
    titulo: "",
    codigo: "",
    componente_curricular: "",
    carga_horaria: "",
    data_criacao: new Date(),
  })

  useEffect(() => {
    if (isEditing && id) {
      fetchGradeCurricular(Number.parseInt(id))
    }
  }, [isEditing, id])

  const fetchGradeCurricular = async (gradeCurricularId: number) => {
    try {
      const gradeCurricular = await gradeCurricularService.getById(gradeCurricularId)
      setFormData({
        titulo: gradeCurricular.titulo,
        codigo: gradeCurricular.codigo,
        componente_curricular: gradeCurricular.componente_curricular,
        carga_horaria: gradeCurricular.carga_horaria,
        data_criacao: new Date(gradeCurricular.data_criacao),
      })
    } catch (error) {
      console.error("Erro ao buscar grade curricular:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevState) => ({
        ...prevState,
        ementa: e.target.files![0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (isEditing && id) {
        //await gradeCurricularService.update(Number.parseInt(id), formData as UpdateGradeCurricularDto)
      } else {
        //await gradeCurricularService.create(formData as CreateGradeCurricularDto)
      }
      navigate("/grade-curricular/list")
    } catch (error) {
      console.error("Erro ao salvar grade curricular:", error)
    }
  }

  return (
    <div className="grade-curricular-form">
      <h2>{isEditing ? "Editar Grade Curricular" : "Criar Grade Curricular"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="codigo">Código:</label>
          <input type="text" id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="componente_curricular">Componente Curricular:</label>
          <input
            type="text"
            id="componente_curricular"
            name="componente_curricular"
            value={formData.componente_curricular}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ementa">Ementa:</label>
          <input type="file" id="ementa" name="ementa" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="carga_horaria">Carga Horária:</label>
          <input
            type="text"
            id="carga_horaria"
            name="carga_horaria"
            value={formData.carga_horaria}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
      </form>
    </div>
  )
}

export default GradeCurricularForm