"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { noticiaService } from "../../../services/noticiaService"
import type { NoticiaDto } from "../../../types/noticia"
import "./AdminNoticia.css"
import NoticiaFormModal from "../../../components/noticia/NoticiaFormModal"
import NoticiaViewModal from "../../../components/noticia/NoticiaViewModal"

const AdminNoticias: React.FC = () => {
  const navigate = useNavigate()
  const [noticias, setNoticias] = useState<NoticiaDto[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedNoticia, setSelectedNoticia] = useState<NoticiaDto | null>(null)

  useEffect(() => {
    fetchNoticias()
  }, [])

  const fetchNoticias = async () => {
    try {
      const data = await noticiaService.getAll()
      setNoticias(data)
    } catch (error) {
      console.error("Erro ao buscar notícias:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
      try {
        await noticiaService.delete(id)
        fetchNoticias() // Refresh the list after deletion
      } catch (error) {
        console.error("Erro ao excluir notícia:", error)
      }
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredNoticias = noticias.filter(
    (noticia) =>
      noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      noticia.conteudo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  const openEditModal = (noticia: NoticiaDto) => {
    setSelectedNoticia(noticia)
    setIsEditModalOpen(true)
  }
  const closeEditModal = () => {
    setSelectedNoticia(null)
    setIsEditModalOpen(false)
  }

  const openViewModal = (noticia: NoticiaDto) => {
    setSelectedNoticia(noticia)
    setIsViewModalOpen(true)
  }
  const closeViewModal = () => {
    setSelectedNoticia(null)
    setIsViewModalOpen(false)
  }

  return (
    <div className="admin-noticias">
      <h2>Lista de Notícias</h2>
      <div className="admin-noticias-actions">
        <div className="action-buttons">
          <button onClick={() => navigate("/admin")} className="btn-back">
            Voltar
          </button>
          <button onClick={openCreateModal} className="btn-create">
            Criar Nova Notícia
          </button>
        </div>
        <input
          type="text"
          placeholder="Pesquisar por título ou conteúdo..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Tag</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredNoticias.map((noticia) => (
            <tr key={noticia.id}>
              <td>{noticia.titulo}</td>
              <td>{noticia.tag}</td>
              <td>{new Date(noticia.data_criacao).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openViewModal(noticia)} className="btn-view">
                  Visualizar
                </button>
                <button disabled onClick={() => openEditModal(noticia)} className="btn-edit-disable">
                  Editar
                </button>
                <button onClick={() => handleDelete(noticia.id)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreateModalOpen && (
        <NoticiaFormModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onSubmitSuccess={fetchNoticias} />
      )}
      {isEditModalOpen && selectedNoticia && (
        <NoticiaFormModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={fetchNoticias}
          noticia={selectedNoticia}
        />
      )}
      {isViewModalOpen && selectedNoticia && (
        <NoticiaViewModal isOpen={isViewModalOpen} onClose={closeViewModal} noticia={selectedNoticia} />
      )}
    </div>
  )
}

export default AdminNoticias

