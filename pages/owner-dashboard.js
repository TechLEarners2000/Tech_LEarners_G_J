import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import { getIdeas, getDevelopers, assignDeveloper, updateIdeaStatus, STATUS_OPTIONS, isAuthenticated, getCurrentUser, getPendingDevelopers, approveDeveloper, rejectDeveloper, logoutUser } from '../lib/mockApi'

export default function OwnerDashboard() {
  const [ideas, setIdeas] = useState([])
  const [developers] = useState(getDevelopers())
  const [pendingDevelopers, setPendingDevelopers] = useState([])
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [selectedDeveloper, setSelectedDeveloper] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    const user = getCurrentUser()
    if (user.role !== 'owner') {
      router.push('/login')
      return
    }

    loadIdeas()
    loadPendingDevelopers()
  }, [])

  const loadIdeas = () => {
    const allIdeas = getIdeas()
    setIdeas(allIdeas)
  }

  const loadPendingDevelopers = () => {
    const pending = getPendingDevelopers()
    setPendingDevelopers(pending)
  }

  const handleApproveDeveloper = (developerId) => {
    const result = approveDeveloper(developerId)
    if (result.success) {
      setPendingDevelopers(prev => prev.filter(dev => dev.id !== developerId))
    }
  }

  const handleRejectDeveloper = (developerId) => {
    const result = rejectDeveloper(developerId)
    if (result.success) {
      setPendingDevelopers(prev => prev.filter(dev => dev.id !== developerId))
    }
  }

  const handleAssignDeveloper = (ideaId) => {
    if (!selectedDeveloper) return

    const updatedIdea = assignDeveloper(ideaId, selectedDeveloper)
    if (updatedIdea) {
      setIdeas(prev => prev.map(idea =>
        idea.id === ideaId ? updatedIdea : idea
      ))
      setSelectedIdea(null)
      setSelectedDeveloper('')
    }
  }

  const handleStatusUpdate = (ideaId, newStatus) => {
    const updatedIdea = updateIdeaStatus(ideaId, newStatus)
    if (updatedIdea) {
      setIdeas(prev => prev.map(idea =>
        idea.id === ideaId ? updatedIdea : idea
      ))
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-500',
      assigned: 'text-blue-500',
      'in-progress': 'text-orange-500',
      completed: 'text-green-500',
      cancelled: 'text-red-500'
    }
    return colors[status] || 'text-gray-500'
  }

  const getStatusLabel = (status) => {
    return STATUS_OPTIONS.find(option => option.value === status)?.label || status
  }

  const getStats = () => {
    const stats = {
      total: ideas.length,
      pending: ideas.filter(i => i.status === 'pending').length,
      assigned: ideas.filter(i => i.status === 'assigned').length,
      inProgress: ideas.filter(i => i.status === 'in-progress').length,
      completed: ideas.filter(i => i.status === 'completed').length
    }
    return stats
  }

  const stats = getStats()

  const handleLogout = () => {
    logoutUser()
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Owner Dashboard — TechLEarners</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Manage all projects, assign developers, and oversee operations" />
      </Head>

      <Container>
        <div className="flex justify-between items-center mb-8">
          <SectionTitle subtitle="Owner Portal">
            Project Management Dashboard
          </SectionTitle>
          <Button onClick={handleLogout} variant="ghost" className="text-red-500 hover:text-red-600">
            Logout
          </Button>
        </div>

        {/* Developer Approvals */}
        <Card className="mb-8">
          <h3 className="text-xl font-bold mb-4">Pending Developer Approvals</h3>
          {pendingDevelopers.length === 0 ? (
            <p className="text-[var(--text-secondary)]">No pending developer approvals.</p>
          ) : (
            <div className="space-y-4">
              {pendingDevelopers.map(developer => (
                <div key={developer.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-[var(--bg)] rounded-lg">
                  <div>
                    <h4 className="font-semibold">{developer.name}</h4>
                    <p className="text-sm text-[var(--text-secondary)]">{developer.email}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{developer.phone}</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Applied: {new Date(developer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApproveDeveloper(developer.id)}
                      variant="primary"
                      className="text-sm"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleRejectDeveloper(developer.id)}
                      variant="ghost"
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-2xl font-bold text-[var(--accent)]">{stats.total}</div>
            <div className="text-sm text-[var(--text-secondary)]">Total Ideas</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
            <div className="text-sm text-[var(--text-secondary)]">Pending</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.assigned}</div>
            <div className="text-sm text-[var(--text-secondary)]">Assigned</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-orange-500">{stats.inProgress}</div>
            <div className="text-sm text-[var(--text-secondary)]">In Progress</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
            <div className="text-sm text-[var(--text-secondary)]">Completed</div>
          </Card>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold">All Project Ideas ({ideas.length})</h3>

          {ideas.length === 0 ? (
            <Card>
              <p className="text-[var(--text-secondary)] text-center py-8">
                No project ideas yet.
              </p>
            </Card>
          ) : (
            ideas.map(idea => (
              <Card key={idea.id}>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-xl font-bold mb-2">{idea.title}</h4>
                        <p className="text-[var(--text-secondary)] mb-3">{idea.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className={`font-medium ${getStatusColor(idea.status)}`}>
                            Status: {getStatusLabel(idea.status)}
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            Customer: {idea.customerName} ({idea.customerEmail})
                          </span>
                          {idea.assignedDeveloper && (
                            <span className="text-[var(--text-secondary)]">
                              Developer: {idea.assignedDeveloper}
                            </span>
                          )}
                          <span className="text-[var(--text-secondary)]">
                            Submitted: {new Date(idea.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {idea.status === 'pending' && (
                          <Button
                            onClick={() => setSelectedIdea(idea)}
                            variant="primary"
                            className="text-sm"
                          >
                            Assign Developer
                          </Button>
                        )}
                        {idea.status === 'assigned' && (
                          <Button
                            onClick={() => handleStatusUpdate(idea.id, 'cancelled')}
                            variant="ghost"
                            className="text-sm text-red-500 hover:text-red-600"
                          >
                            Cancel Project
                          </Button>
                        )}
                        {idea.status === 'in-progress' && (
                          <Button
                            onClick={() => handleStatusUpdate(idea.id, 'completed')}
                            variant="secondary"
                            className="text-sm"
                          >
                            Mark Completed
                          </Button>
                        )}
                      </div>
                    </div>

                    {idea.progress.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-3">Progress Updates ({idea.progress.length})</h5>
                        <div className="space-y-3 max-h-32 overflow-y-auto">
                          {idea.progress.slice(-3).map(update => (
                            <div key={update.id} className="bg-[var(--bg)] p-3 rounded-lg">
                              <p className="text-sm">{update.message}</p>
                              <p className="text-xs text-[var(--text-secondary)] mt-1">
                                {new Date(update.timestamp).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {selectedIdea && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Assign Developer</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Project: {selectedIdea.title}
              </p>
              <div className="mb-4">
                <label className="block text-sm mb-2 font-medium text-[var(--text-secondary)]">
                  Select Developer
                </label>
                <select
                  value={selectedDeveloper}
                  onChange={(e) => setSelectedDeveloper(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-gray-700 text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all duration-200"
                  required
                >
                  <option value="">Choose a developer...</option>
                  {developers.map(dev => (
                    <option key={dev.id} value={dev.name}>{dev.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleAssignDeveloper(selectedIdea.id)}
                  variant="primary"
                  disabled={!selectedDeveloper}
                >
                  Assign
                </Button>
                <Button type="button" variant="ghost" onClick={() => { setSelectedIdea(null); setSelectedDeveloper(''); }}>
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Container>
    </>
  )
}
