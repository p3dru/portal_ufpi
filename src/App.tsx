import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AdminHeader from "./components/admin/AdminHeader"
import Home from "./pages/Home"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminList from "./components/admin/AdminList"
import AdminForm from "./components/admin/AdminForm"
import AlunoList from "./components/aluno/AlunoList"
import AlunoForm from "./components/aluno/AlunoForm"
import NoticiaList from "./components/noticia/NoticiaList"
//import NoticiaForm from "./components/noticia/NoticiaForm"
import ProfessorList from "./components/professor/ProfessorList"
import ProfessorForm from "./components/professor/ProfessorForm"
import CursoList from "./components/curso/CursoList"
import CursoForm from "./components/curso/CursoForm"
import DocumentoList from "./components/documento/DocumentoList"
import DocumentoForm from "./components/documento/DocumentoForm"
import GradeCurricularList from "./components/gradeCurricular/GradeCurricularList"
//mport GradeCurricularForm from "./components/gradeCurricular/GradeCurricularForm"
import TurmaList from "./components/turma/TurmaList"
import TurmaForm from "./components/turma/TurmaForm"
import DissertacaoTeseList from "./components/dissertacaoTese/DissertacaoTeseList"
import DissertacaoTeseForm from "./components/dissertacaoTese/DissertacaoTeseForm"
import CalendarioList from "./components/calendario/CalendarioList"
import CalendarioForm from "./components/calendario/CalendarioForm"
import ProcessoSeletivoList from "./components/processoSeletivo/ProcessoSeletivoList"
import ProcessoSeletivoForm from "./components/processoSeletivo/ProcessoSeletivoForm"
import RegisterForm from "./components/auth/RegisterForm"
import LoginForm from "./components/auth/LoginForm"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import ApresentacaoCursos from "./pages/apresentacaoCursos/ApresentacaoCursos"
import AreaConcentracao from "./pages/areaConcentracao/AreaConcentracao"
import GradeCurricular from "./pages/gradeCurricular/GradeCurricular"
import { TagDocumento } from "./types/documento"
import ResourceManager from "./components/admin/ResourceManager"
import type { AdminResponseDto, CreateAdminDto, UpdateAdminDto } from "./types/admin"
import type { AlunoResponseDto, CreateAlunoDto, UpdateAlunoDto } from "./types/aluno"
//import type { NoticiaDto, CreateNoticiaDto, UpdateNoticiaDto } from "./types/noticia"
import type { ProfessorResponseDto, CreateProfessorDto, UpdateProfessorDto } from "./types/professor"
import type { CursoResponseDto, CreateCursoDto, UpdateCursoDto } from "./types/curso"
import type { DocumentoResponseDto, CreateDocumentoDto, UpdateDocumentoDto } from "./types/documento"
//import type { GradeCurricularDto, CreateGradeCurricularDto, UpdateGradeCurricularDto } from "./types/gradeCurricular"
import type { TurmaDto, CreateTurmaDto, UpdateTurmaDto } from "./types/turma"
import type { DissertacaoTeseDto, CreateDissertacaoTeseDto, UpdateDissertacaoTeseDto } from "./types/dissertacaoTese"
import type { CalendarioDto, CreateCalendarioDto, UpdateCalendarioDto } from "./types/calendario"
import type {
  ProcessoSeletivoDto,
  CreateProcessoSeletivoDto,
  UpdateProcessoSeletivoDto,
} from "./types/processoSeletivo"

// Import all service files here
import { adminService } from "./services/adminService"
import { alunoService } from "./services/alunoService"
//import { noticiaService } from "./services/noticiaService"
import { professorService } from "./services/professorService"
import { cursoService } from "./services/cursoService"
import { documentoService } from "./services/documentoService"
//import { gradeCurricularService } from "./services/gradeCurricularService"
import { turmaService } from "./services/turmaService"
import { dissertacaoTeseService } from "./services/dissertacaoTeseService"
import { calendarioService } from "./services/calendarioService"
import { processoSeletivoService } from "./services/processoSeletivoService"
import AdminAdministradores from "./pages/admin/administradores/AdminAdministradores"
import AdminNoticias from "./pages/admin/noticias/AdminNoticia"
import AdminProfessores from "./pages/admin/professores/AdminProfessores"
import AdminCursos from "./pages/admin/cursos/AdminCursos"
import AdminTurmas from "./pages/admin/turmas/AdminTurmas"
import AdminGradeCurricular from "./pages/admin/gradeCurricular/AdminGradeCurricular"
import AdminDocumentos from "./pages/admin/documentos/AdminDocumentos"
import AdminDissertacoesTeses from "./pages/admin/dissertacoesTeses/AdminDissertacoesTeses"
import AdminCalendario from "./pages/admin/calendario/AdminCalendario"
import AdminProcessosSeletivos from "./pages/admin/processosSeletivos/AdminProcessosSeletivos"
import AdminAluno from "./pages/alunos/AdminAlunos"

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/programas/area-concentracao" element={<AreaConcentracao />} />
                  <Route path="/programas/cursos" element={<ApresentacaoCursos />} />
                  <Route path="/programas/grade-curricular" element={<GradeCurricular />} />
                  <Route path="/ensino/alunos-ativos" element={<AlunoList />} />
                  <Route path="/ensino/corpo-docente" element={<ProfessorList />} />
                  <Route path="/ensino/cursos" element={<ApresentacaoCursos />} />
                  <Route path="/ensino/teses-dissertacoes" element={<DissertacaoTeseList />} />
                  <Route path="/ensino/turmas" element={<TurmaList />} />
                  <Route path="/aluno/list" element={<AlunoList />} />
                  <Route path="/noticia" element={<NoticiaList />} />
                  <Route path="/professor/list" element={<ProfessorList />} />
                  <Route path="/curso/list" element={<CursoList />} />
                  <Route
                    path="/documento/list"
                    element={<DocumentoList tag={TagDocumento.FORMULARIO} title="Geral" />}
                  />
                  <Route
                    path="/documentos/formularios"
                    element={<DocumentoList tag={TagDocumento.FORMULARIO} title="Formulários" />}
                  />
                  <Route
                    path="/documentos/resolucao"
                    element={<DocumentoList tag={TagDocumento.RESOLUCAO} title="Resoluções" />}
                  />
                  <Route
                    path="/documentos/regimento"
                    element={<DocumentoList tag={TagDocumento.REGIMENTO} title="Regimentos" />}
                  />
                  <Route
                    path="/documentos/material-didatico"
                    element={<DocumentoList tag={TagDocumento.MATERIAL_DIDATICO} title="Material Didático" />}
                  />
                  <Route
                    path="/documentos/outros"
                    element={<DocumentoList tag={TagDocumento.OUTROS} title="Outros Documentos" />}
                  />
                  <Route path="/grade-curricular/list" element={<GradeCurricularList />} />
                  <Route path="/turma/list" element={<TurmaList />} />
                  <Route path="/dissertacao-tese/list" element={<DissertacaoTeseList />} />
                  <Route path="/calendario" element={<CalendarioList />} />
                  <Route path="/processo-seletivo" element={<ProcessoSeletivoList />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />

        {/* Rota de login administrativo */}
        <Route path="/admin/login" element={<LoginForm />} />

        {/* Rotas administrativas protegidas */}
        <Route
          path="/admin/alunos"
          element={
            <ProtectedRoute>
              <AdminHeader />
              <AdminAluno />
            </ProtectedRoute>
          }
        />
        <Route
        path="/admin/alunos/create"
        element={
          <ProtectedRoute>
            <AdminHeader />
            <AlunoForm isEditing={false} />
          </ProtectedRoute>
        }
        />
        <Route
        path="/admin/alunos/edit/:id"
        element={
          <ProtectedRoute>
            <AdminHeader />
            <AlunoForm isEditing={true} />
          </ProtectedRoute>
        }
        />
        <Route
          path="/admin/administradores"
          element={
            <ProtectedRoute>
              <AdminHeader />
                <AdminAdministradores />
              </ProtectedRoute>
          }
        />
         <Route
          path="/admin/noticias"
            element={
              <ProtectedRoute>
                <AdminHeader />
                  <AdminNoticias />
                </ProtectedRoute>
            }
          />
          <Route
            path="/admin/professores"
            element={
              <ProtectedRoute>
                <AdminHeader />
                <AdminProfessores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cursos"
            element={
              <ProtectedRoute>
                <AdminHeader />
                <AdminCursos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/documentos"
            element={
              <ProtectedRoute>
                <AdminHeader />
                <AdminDocumentos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/grade-curricular"
            element={
              <ProtectedRoute>
                <AdminHeader />
                <AdminGradeCurricular />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/turmas"
            element={
              <ProtectedRoute>
                <AdminHeader />
                <AdminTurmas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dissertacoes-teses"
            element={
              <ProtectedRoute>
                <AdminHeader />
                <AdminDissertacoesTeses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/calendario"
            element={
              <ProtectedRoute>
                <AdminHeader />
                <AdminCalendario />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/processos-seletivos"
            element={
              <ProtectedRoute>
                <AdminHeader />
                <AdminProcessosSeletivos />
              </ProtectedRoute>
            }
          />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminHeader />
              <main>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route
                    path="/admins"
                    element={
                      <ResourceManager<AdminResponseDto, CreateAdminDto, UpdateAdminDto>
                        resourceName="Administrador"
                        fetchResources={adminService.getAll}
                        createResource={adminService.create}
                        updateResource={adminService.update}
                        deleteResource={adminService.delete}
                        resourceFields={[
                          { name: "nome", label: "Nome", type: "text" },
                          { name: "email", label: "Email", type: "email" },
                          { name: "senha", label: "Senha", type: "password" },
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/alunos"
                    element={
                      <ResourceManager<AlunoResponseDto, CreateAlunoDto, UpdateAlunoDto>
                        resourceName="Aluno"
                        fetchResources={alunoService.getAll}
                        createResource={alunoService.create}
                        updateResource={alunoService.update}
                        deleteResource={alunoService.delete}
                        resourceFields={[
                          { name: "nome", label: "Nome", type: "text" },
                          { name: "email", label: "Email", type: "email" },
                          { name: "matricula", label: "Matrícula", type: "text" },
                        ]}
                      />
                    }
                  />
                  {/*
                  <Route
                    path="/noticias"
                    element={
                      <ResourceManager<NoticiaDto, CreateNoticiaDto, UpdateNoticiaDto>
                        resourceName="Notícia"
                        fetchResources={noticiaService.getAll}
                        createResource={noticiaService.create}
                        updateResource={noticiaService.update}
                        deleteResource={noticiaService.delete}
                        resourceFields={[
                          { name: "titulo", label: "Título", type: "text" },
                          { name: "conteudo", label: "Conteúdo", type: "textarea" },
                        ]}
                      />
                    }
                  />*/}
                  <Route
                    path="/professores"
                    element={
                      <ResourceManager<ProfessorResponseDto, CreateProfessorDto, UpdateProfessorDto>
                        resourceName="Professor"
                        fetchResources={professorService.getAll}
                        createResource={professorService.create}
                        updateResource={professorService.update}
                        deleteResource={professorService.delete}
                        resourceFields={[
                          { name: "nome", label: "Nome", type: "text" },
                          { name: "email", label: "Email", type: "email" },
                          { name: "siape", label: "Siape", type: "text" },
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/cursos"
                    element={
                      <ResourceManager<CursoResponseDto, CreateCursoDto, UpdateCursoDto>
                        resourceName="Curso"
                        fetchResources={cursoService.getAll}
                        createResource={cursoService.create}
                        updateResource={cursoService.update}
                        deleteResource={cursoService.delete}
                        resourceFields={[
                          { name: "nome", label: "Nome", type: "text" },
                          { name: "sigla", label: "Sigla", type: "text" },
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/documentos"
                    element={
                      <ResourceManager<DocumentoResponseDto, CreateDocumentoDto, UpdateDocumentoDto>
                        resourceName="Documento"
                        fetchResources={documentoService.getAll}
                        createResource={documentoService.create}
                        updateResource={documentoService.update}
                        deleteResource={documentoService.delete}
                        resourceFields={[
                          { name: "titulo", label: "Título", type: "text" },
                          { name: "arquivo", label: "Arquivo", type: "file" },
                          {
                            name: "tag",
                            label: "Tag",
                            type: "select",
                            options: () => Promise.resolve(Object.values(TagDocumento)),
                          },
                        ]}
                      />
                    }
                  />
                  {/*
                  <Route
                    path="/grade-curricular"
                    element={
                      <ResourceManager<GradeCurricularDto, CreateGradeCurricularDto, UpdateGradeCurricularDto>
                        resourceName="Grade Curricular"
                        fetchResources={gradeCurricularService.getAll}
                        createResource={gradeCurricularService.create}
                        updateResource={gradeCurricularService.update}
                        deleteResource={gradeCurricularService.delete}
                        resourceFields={[
                          { name: "cursoId", label: "Curso", type: "select", options: cursoService.getAll },
                          { name: "ano", label: "Ano", type: "number" },
                        ]}
                      />
                    }
                  />*/}
                  <Route
                    path="/turmas"
                    element={
                      <ResourceManager<TurmaDto, CreateTurmaDto, UpdateTurmaDto>
                        resourceName="Turma"
                        fetchResources={turmaService.getAll}
                        createResource={turmaService.create}
                        updateResource={turmaService.update}
                        deleteResource={turmaService.delete}
                        resourceFields={[
                          { name: "nome", label: "Nome", type: "text" },
                          { name: "cursoId", label: "Curso", type: "select", options: cursoService.getAll },
                          { name: "ano", label: "Ano", type: "number" },
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/dissertacoes-teses"
                    element={
                      <ResourceManager<DissertacaoTeseDto, CreateDissertacaoTeseDto, UpdateDissertacaoTeseDto>
                        resourceName="Dissertação/Tese"
                        fetchResources={dissertacaoTeseService.getAll}
                        createResource={dissertacaoTeseService.create}
                        updateResource={dissertacaoTeseService.update}
                        deleteResource={dissertacaoTeseService.delete}
                        resourceFields={[
                          { name: "titulo", label: "Título", type: "text" },
                          { name: "autor", label: "Autor", type: "text" },
                          { name: "arquivo", label: "Arquivo", type: "file" },
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/calendarios"
                    element={
                      <ResourceManager<CalendarioDto, CreateCalendarioDto, UpdateCalendarioDto>
                        resourceName="Calendário"
                        fetchResources={calendarioService.getAll}
                        createResource={calendarioService.create}
                        updateResource={calendarioService.update}
                        deleteResource={calendarioService.delete}
                        resourceFields={[
                          { name: "titulo", label: "Título", type: "text" },
                          { name: "data", label: "Data", type: "date" },
                          { name: "descricao", label: "Descrição", type: "textarea" },
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/processos-seletivos"
                    element={
                      <ResourceManager<ProcessoSeletivoDto, CreateProcessoSeletivoDto, UpdateProcessoSeletivoDto>
                        resourceName="Processo Seletivo"
                        fetchResources={processoSeletivoService.getAll}
                        createResource={processoSeletivoService.create}
                        updateResource={processoSeletivoService.update}
                        deleteResource={processoSeletivoService.delete}
                        resourceFields={[
                          { name: "nome", label: "Nome", type: "text" },
                          { name: "dataInicio", label: "Data de Início", type: "date" },
                          { name: "dataFim", label: "Data de Fim", type: "date" },
                        ]}
                      />
                    }
                  />
                  <Route path="/list" element={<AdminList />} />
                  <Route path="/create" element={<AdminForm isEditing={false} />} />
                  <Route path="/edit/:id" element={<AdminForm isEditing={true} />} />
                  <Route path="/aluno/create" element={<AlunoForm isEditing={false} />} />
                  <Route path="/aluno/edit/:id" element={<AlunoForm isEditing={true} />} />
                  {/* <Route path="/noticia/create" element={<NoticiaForm isEditing={false} />} /> */}
                  {/* <Route path="/noticia/edit/:id" element={<NoticiaForm isEditing={true} />} /> */}
                  <Route path="/professor/create" element={<ProfessorForm isEditing={false} />} />
                  <Route path="/professor/edit/:id" element={<ProfessorForm isEditing={true} />} />
                  <Route path="/curso/create" element={<CursoForm isEditing={false} />} />
                  <Route path="/curso/edit/:id" element={<CursoForm isEditing={true} />} />
                  <Route path="/documento/create" element={<DocumentoForm isEditing={false} />} />
                  <Route path="/documento/edit/:id" element={<DocumentoForm isEditing={true} />} />
                  {/*<Route path="/grade-curricular/create" element={<GradeCurricularForm isEditing={false} />} />*/}
                  {/*<Route path="/grade-curricular/edit/:id" element={<GradeCurricularForm isEditing={true} />} />*/}
                  <Route path="/turma/create" element={<TurmaForm isEditing={false} />} />
                  <Route path="/turma/edit/:id" element={<TurmaForm isEditing={true} />} />
                  <Route path="/dissertacao-tese/create" element={<DissertacaoTeseForm isEditing={false} />} />
                  <Route path="/dissertacao-tese/edit/:id" element={<DissertacaoTeseForm isEditing={true} />} />
                  <Route path="/calendario/create" element={<CalendarioForm isEditing={false} />} />
                  <Route path="/calendario/edit/:id" element={<CalendarioForm isEditing={true} />} />
                  <Route path="/processo-seletivo/create" element={<ProcessoSeletivoForm isEditing={false} />} />
                  <Route path="/processo-seletivo/edit/:id" element={<ProcessoSeletivoForm isEditing={true} />} />
                </Routes>
              </main>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

