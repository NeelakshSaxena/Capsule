import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { AgentsPage } from './pages/agents/AgentsPage'
import { AgentDetailPage } from './pages/agents/AgentDetailPage'
import { ModulesPage } from './pages/modules/ModulesPage'
import { ModuleDetailPage } from './pages/modules/ModuleDetailPage'
import { AgentProvider } from './lib/AgentContext'

function App() {
  return (
    <AgentProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/agents/:id" element={<AgentDetailPage />} />
            <Route path="/modules" element={<ModulesPage />} />
            <Route path="/modules/:id" element={<ModuleDetailPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AgentProvider>
  )
}

export default App
