"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { dissertacaoTeseService } from "../../services/dissertacaoTeseService"
import type { DissertacaoTeseDto } from "../../types/dissertacaoTese"
import DissertacaoTeseViewModal from "./DissertacaoTeseViewModal"
import { PageContainer } from "../common/PageContainer"
import "./DissertacaoTeseList.css"
import { useTranslation } from "react-i18next"

const DissertacaoTeseList: React.FC = () => {
  const [dissertacoesTeses, setDissertacoesTeses] = useState<DissertacaoTeseDto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItem, setSelectedItem] = useState<DissertacaoTeseDto | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const { t } = useTranslation()


  useEffect(() => {
    fetchDissertacoesTeses()
  }, [])

  const fetchDissertacoesTeses = async () => {
    try {
      const data = await dissertacaoTeseService.getAll()
      setDissertacoesTeses(data)
    } catch (error) {
      console.error("Erro ao buscar dissertações e teses:", error)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredDissertacoesTeses = dissertacoesTeses.filter(
    (item) =>
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nome_autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orientador.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openViewModal = (item: DissertacaoTeseDto) => {
    setSelectedItem(item)
    setIsViewModalOpen(true)
  }

  const closeViewModal = () => {
    setSelectedItem(null)
    setIsViewModalOpen(false)
  }

  return (
    <PageContainer title= {t("theses.title")} description={t("theses.description")}>
      <div className="dissertacao-tese-list">
        <div className="filter-container">
          <input
            type="text"
            placeholder={t("theses.searchPlaceholder")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>{t("theses.author")}</th>
              <th>{t("theses.thesesTitle")}</th>
              <th>{t("theses.advisor")}</th>
              <th>{t("theses.date")}</th>
              <th>{t("theses.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredDissertacoesTeses.map((item) => (
              <tr key={item.id}>
                <td>{item.nome_autor}</td>
                <td>{item.titulo}</td>
                <td>{item.orientador}</td>
                <td>{new Date(item.data).toLocaleDateString()}</td>
                <td>
                  {item.arquivo && (
                    <a href={`${import.meta.env.VITE_API_URL}/dissertacoes-teses/${item.id}/download`} download>
                      Baixar
                    </a>
                  )}
                </td>
                <td>
                  <button onClick={() => openViewModal(item)} className="btn-view">
                  {t("theses.seeMore")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isViewModalOpen && selectedItem && (
          <DissertacaoTeseViewModal isOpen={isViewModalOpen} onClose={closeViewModal} dissertacaoTese={selectedItem} />
        )}
      </div>
    </PageContainer>
  )
}

export default DissertacaoTeseList

