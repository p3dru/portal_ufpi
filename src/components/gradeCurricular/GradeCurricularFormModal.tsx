"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { gradeCurricularService } from "../../services/gradeCurricularService"
import {
  type GradeCurricularDto,
  type CreateGradeCurricularDto,
  type UpdateGradeCurricularDto,
  tipoEnum,
} from "../../types/gradeCurricular"
import "./GradeCurricularFormModal.css"

interface GradeCurricularFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitSuccess: () => void
  gradeCurricular?: GradeCurricularDto
}

const GradeCurricularFormModal: React.FC<GradeCurricularFormModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  gradeCurricular,
}) => {
  const [formData, setFormData] = useState<CreateGradeCurricularDto | UpdateGradeCurricularDto>({
    titulo: "",
    codigo: "",
    tipo_pos: tipoEnum.Mestrado,
    componente_curricular: "",
    carga_horaria: "",
    ementa: undefined,
    data_criacao: new Date(),
  })

  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gradeCurricular) {
      setFormData({
        titulo: gradeCurricular.titulo,
        codigo: gradeCurricular.codigo,
        tipo_pos: gradeCurricular.tipo_pos,
        componente_curricular: gradeCurricular.componente_curricular,
        carga_horaria: gradeCurricular.carga_horaria,
        data_criacao: new Date(gradeCurricular.data_criacao),
        ementa: undefined,
      })
    } else {
      setFormData({
        titulo: "",
        codigo: "",
        tipo_pos: tipoEnum.Mestrado,
        componente_curricular: "",
        carga_horaria: "",
        ementa: undefined,
        data_criacao: new Date(),
      })
    }
  }, [gradeCurricular])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === "data_criacao") {
      setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, ementa: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === "ementa" && value instanceof File) {
            formDataToSend.append(key, value);
          } else if (key === "data_criacao" && value instanceof Date) {
            formDataToSend.append(key, value.toISOString());
          } else {
            formDataToSend.append(key, String(value));
          }
        }
      });

      if (gradeCurricular) {
        await gradeCurricularService.update(gradeCurricular.id, formDataToSend);
      } else {
        await gradeCurricularService.create(formDataToSend);
      }
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar grade curricular:", error);
      setError("Ocorreu um erro ao salvar a grade curricular. Por favor, tente novamente.");
    }
  };
  
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{gradeCurricular ? "Editar Grade Curricular" : "Criar Nova Grade Curricular"}</h2>
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
          <div>
            <label htmlFor="tipo_pos">Tipo de Pós-Graduação:</label>
            <select id="tipo_pos" name="tipo_pos" value={formData.tipo_pos} onChange={handleChange} required>
              <option value={tipoEnum.Mestrado}>Mestrado</option>
              <option value={tipoEnum.Doutorado}>Doutorado</option>
            </select>
          </div>
          <div>
            <label htmlFor="ementa">Ementa:</label>
            <input type="file" id="ementa" name="ementa" onChange={handleFileChange} />
          </div>
          <div>
            <label htmlFor="data_criacao">Data de Criação:</label>
            <input
              type="datatime-local"
              id="data_criacao"
              name="data_criacao"
              value={
                formData.data_criacao instanceof Date 
                ? formData.data_criacao.toISOString().slice(0, 16)
                : formData.data_criacao
              }
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">{gradeCurricular ? "Atualizar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GradeCurricularFormModal

