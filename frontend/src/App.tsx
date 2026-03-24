import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { AgentsPage } from './pages/agents/AgentsPage'
import { AgentDetailPage } from './pages/agents/AgentDetailPage'
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
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AgentProvider>
  )
}

export default App
