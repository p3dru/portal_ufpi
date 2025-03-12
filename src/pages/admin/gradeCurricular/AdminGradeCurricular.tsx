"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { gradeCurricularService } from "../../../services/gradeCurricularService"
import type { GradeCurricularDto } from "../../../types/gradeCurricular"
import "./AdminGradeCurricular.css"
import GradeCurricularFormModal from "../../../components/gradeCurricular/GradeCurricularFormModal"
import GradeCurricularViewModal from "../../../components/gradeCurricular/GradeCurricularViewModel"

const AdminGradeCurricular: React.FC = () => {
  const navigate = useNavigate()
  const [gradesCurriculares, setGradesCurriculares] = useState<GradeCurricularDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedGradeCurricular, setSelectedGradeCurricular] = useState<GradeCurricularDto | null>(null)

  useEffect(() => {
    fetchGradesCurriculares()
  }, [])

  const fetchGradesCurriculares = async () => {
    try {
      const data = await gradeCurricularService.getAll()
      setGradesCurriculares(data)
    } catch (error) {
      console.error("Erro ao buscar grades curriculares:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta grade curricular?")) {
      try {
        await gradeCurricularService.delete(id)
        fetchGradesCurriculares()
      } catch (error) {
        console.error("Erro ao excluir grade curricular:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredGradesCurriculares = gradesCurriculares.filter(
    (gradeCurricular) =>
      gradeCurricular.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gradeCurricular.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gradeCurricular.componente_curricular.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (gradeCurricular: GradeCurricularDto) => {
    setSelectedGradeCurricular(gradeCurricular)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedGradeCurricular(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (gradeCurricular: GradeCurricularDto) => {
    setSelectedGradeCurricular(gradeCurricular)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedGradeCurricular(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-grade-curricular">
      <h2>Lista de Grades Curriculares</h2>
      <div className="admin-grade-curricular-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Nova Grade Curricular
          </button>
        </div>
        <input
          type="text"
          placeholder="Pesquisar por título, código ou componente curricular..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Código</th>
            <th>Componente Curricular</th>
            <th>Carga Horária</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredGradesCurriculares.map((gradeCurricular) => (
            <tr key={gradeCurricular.id}>
              <td>{gradeCurricular.titulo}</td>
              <td>{gradeCurricular.codigo}</td>
              <td>{gradeCurricular.componente_curricular}</td>
              <td>{gradeCurricular.carga_horaria}</td>
              <td>{new Date(gradeCurricular.data_criacao).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openViewModal(gradeCurricular)} className="btn-view">
                  Visualizar
                </button>
                <button disabled onClick={() => openEditModal(gradeCurricular)} className="btn-edit-disable">
                  Editar
                </button>
                <button onClick={() => handleDelete(gradeCurricular.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <GradeCurricularFormModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onSubmitSuccess={fetchGradesCurriculares}
        />
      )}
      {isEditModalOpen && selectedGradeCurricular && (
        <GradeCurricularFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchGradesCurriculares}
          gradeCurricular={selectedGradeCurricular}
        />
      )}
      {isViewModalOpen && selectedGradeCurricular && (
        <GradeCurricularViewModal
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
          gradeCurricular={selectedGradeCurricular}
        />
      )}
    </div>
  )
}

export default AdminGradeCurricular