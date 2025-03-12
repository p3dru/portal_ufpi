"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { documentoService } from "../../../services/documentoService"
import type { DocumentoResponseDto } from "../../../types/documento"
import "./AdminDocumentos.css"
import DocumentoFormModal from "../../../components/documento/DocumentoFormModal"
import DocumentoViewModal from "../../../components/documento/DocumentoViewModal"

const AdminDocumentos: React.FC = () => {
  const navigate = useNavigate()
  const [documentos, setDocumentos] = useState<DocumentoResponseDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedDocumento, setSelectedDocumento] = useState<DocumentoResponseDto | null>(null)

  useEffect(() => {
    fetchDocumentos()
  }, [])

  const fetchDocumentos = async () => {
    try {
      const data = await documentoService.getAll()
      setDocumentos(data)
    } catch (error) {
      console.error("Erro ao buscar documentos:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este documento?")) {
      try {
        await documentoService.delete(id)
        fetchDocumentos()
      } catch (error) {
        console.error("Erro ao excluir documento:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredDocumentos = documentos.filter(
    (documento) =>
      documento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      documento.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      documento.tag.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (documento: DocumentoResponseDto) => {
    setSelectedDocumento(documento)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedDocumento(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (documento: DocumentoResponseDto) => {
    setSelectedDocumento(documento)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedDocumento(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-documentos">
      <h2>Lista de Documentos</h2>
      <div className="admin-documentos-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Novo Documento
          </button>
        </div>
        <input
          type="text"
          placeholder="Pesquisar por nome, tipo ou tag..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Tag</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocumentos.map((documento) => (
            <tr key={documento.id}>
              <td>{documento.nome}</td>
              <td>{documento.tipo}</td>
              <td>{documento.tag}</td>
              <td>{new Date(documento.data_criacao).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openViewModal(documento)} className="btn-view">
                  Visualizar
                </button>
                <button disabled onClick={() => openEditModal(documento)} className="btn-edit-disable">
                  Editar
                </button>
                <button onClick={() => handleDelete(documento.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <DocumentoFormModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onSubmitSuccess={fetchDocumentos} />
      )}
      {isEditModalOpen && selectedDocumento && (
        <DocumentoFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchDocumentos}
          documento={selectedDocumento}
        />
      )}
      {isViewModalOpen && selectedDocumento && (
        <DocumentoViewModal isOpen={isViewModalOpen} onClose={closeViewModal} documento={selectedDocumento} />
      )}
    </div>
  )
}

export default AdminDocumentos