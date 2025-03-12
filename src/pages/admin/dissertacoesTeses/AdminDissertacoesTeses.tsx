"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { dissertacaoTeseService } from "../../../services/dissertacaoTeseService"
import type { DissertacaoTeseDto } from "../../../types/dissertacaoTese"
import "./AdminDissertacoesTeses.css"
import DissertacaoTeseFormModal from "../../../components/dissertacaoTese/DissertacaoTeseFormModal"
import DissertacaoTeseViewModal from "../../../components/dissertacaoTese/DissertacaoTeseViewModal"

const AdminDissertacoesTeses: React.FC = () => {
  const navigate = useNavigate()
  const [dissertacoesTeses, setDissertacoesTeses] = useState<DissertacaoTeseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedDissertacaoTese, setSelectedDissertacaoTese] = useState<DissertacaoTeseDto | null>(null)

  useEffect(() => {
    fetchDissertacoesTeses()
  }, [])

  // Função para buscar dissertações e teses do banco de dados
  const fetchDissertacoesTeses = async () => {
    try {
      const data = await dissertacaoTeseService.getAll()
      setDissertacoesTeses(data)
    } catch (error) {
      console.error("Erro ao buscar dissertações e teses:", error)
    }
  }

  // Função para excluir uma dissertação ou tese do banco de dados
  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta dissertação/tese?")) {
      try {
        await dissertacaoTeseService.delete(id)
        fetchDissertacoesTeses() // Atualiza a lista após a exclusão
      } catch (error) {
        console.error("Erro ao excluir dissertação/tese:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredDissertacoesTeses = dissertacoesTeses.filter(
    (item) =>
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nome_autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orientador.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (dissertacaoTese: DissertacaoTeseDto) => {
    setSelectedDissertacaoTese(dissertacaoTese)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedDissertacaoTese(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (dissertacaoTese: DissertacaoTeseDto) => {
    setSelectedDissertacaoTese(dissertacaoTese)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedDissertacaoTese(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-dissertacoes-teses">
      <h2>Lista de Dissertações e Teses</h2>
      <div className="admin-dissertacoes-teses-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Nova Dissertação/Tese
          </button>
        </div>
        <input
          type="text"
          placeholder="Pesquisar por título, autor ou orientador..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Orientador</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDissertacoesTeses.map((item) => (
            <tr key={item.id}>
              <td>{item.titulo}</td>
              <td>{item.nome_autor}</td>
              <td>{item.orientador}</td>
              <td>{new Date(item.data).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openViewModal(item)} className="btn-view">
                  Visualizar
                </button>
                <button disabled onClick={() => openEditModal(item)} className="btn-edit-disable">
                  Editar
                </button>
                <button onClick={() => handleDelete(item.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <DissertacaoTeseFormModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onSubmitSuccess={fetchDissertacoesTeses}
        />
      )}
      {isEditModalOpen && selectedDissertacaoTese && (
        <DissertacaoTeseFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchDissertacoesTeses}
          dissertacaoTese={selectedDissertacaoTese}
        />
      )}
      {isViewModalOpen && selectedDissertacaoTese && (
        <DissertacaoTeseViewModal
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
          dissertacaoTese={selectedDissertacaoTese}
        />
      )}
    </div>
  )
}

export default AdminDissertacoesTeses