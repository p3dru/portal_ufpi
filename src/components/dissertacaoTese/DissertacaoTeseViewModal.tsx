import type React from "react"
import type { DissertacaoTeseDto } from "../../types/dissertacaoTese"
import "./DissertacaoTeseViewModal.css"
import { useTranslation } from "react-i18next"

interface DissertacaoTeseViewModalProps {
  isOpen: boolean
  onClose: () => void
  dissertacaoTese: DissertacaoTeseDto
}

const DissertacaoTeseViewModal: React.FC<DissertacaoTeseViewModalProps> = ({ isOpen, onClose, dissertacaoTese }) => {
  const { t } = useTranslation()
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{t("theses.details")}</h2>
        <div className="dissertacao-tese-details">
          <p>
            <strong>{t("theses.author")}:</strong> {dissertacaoTese.nome_autor}
          </p>
          <p>
            <strong>{t("theses.thesesTitle")}:</strong> {dissertacaoTese.titulo}
          </p>
          <p>
            <strong>{t("theses.advisor")}:</strong> {dissertacaoTese.orientador}
          </p>
          <p>
            <strong>{t("theses.date")}:</strong> {new Date(dissertacaoTese.data).toLocaleDateString()}
          </p>
          <p>
            <strong>{t("theses.summarize")}:</strong> {dissertacaoTese.resumo}
          </p>
          {dissertacaoTese.arquivo && (
            <div>
              <button>
              <a href={`${import.meta.env.VITE_API_URL}/dissertacoes-teses/${dissertacaoTese.id}/download`} download>
                Baixar Arquivo
              </a>
              </button>
            </div>
          )}
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>{t("theses.close")}</button>
        </div>
      </div>
    </div>
  )
}

export default DissertacaoTeseViewModal