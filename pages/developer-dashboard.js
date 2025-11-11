import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import { getIdeasByDeveloper, updateIdeaStatus, addProgressUpdate, STATUS_OPTIONS, isAuthenticated, getCurrentUser, logoutUser } from '../lib/mockApi'

export default function DeveloperDashboard() {
  const [ideas, setIdeas] = useState([])
  const [developerName, setDeveloperName] = useState('')
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [progressMessage, setProgressMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    const user = getCurrentUser()
    if (user.role !== 'developer') {
      router.push('/login')
      return
    }

    setDeveloperName(user.name)
    loadIdeas(user.name)
  }, [])

  const loadIdeas = (developer) => {
    const developerIdeas = getIdeasByDeveloper(developer)
    setIdeas(developerIdeas)
  }

  const handleStatusUpdate = (ideaId, newStatus) => {
    const updatedIdea = updateIdeaStatus(ideaId, newStatus)
    if (updatedIdea) {
      setIdeas(prev => prev.map(idea =>
        idea.id === ideaId ? updatedIdea : idea
      ))
    }
  }

  const handleAddProgress = (e) => {
    e.preventDefault()
    if (!selectedIdea || !progressMessage.trim()) return

    const update = addProgressUpdate(selectedIdea.id, progressMessage)
    if (update) {
      setIdeas(prev => prev.map(idea =>
        idea.id === selectedIdea.id
          ? { ...idea, progress: [...idea.progress, update], updatedAt: update.timestamp }
          : idea
      ))
      setProgressMessage('')
      setSelectedIdea(null)
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

  const getAvailableStatuses = (currentStatus) => {
    const statusFlow = {
      assigned: ['in-progress', 'cancelled'],
      'in-progress': ['completed', 'cancelled'],
      completed: [],
      cancelled: []
    }
    return statusFlow[currentStatus] || []
  }

  const handleLogout = () => {
    logoutUser()
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Developer Dashboard — TechLEarners</title>
        <meta name="description" content="Manage your assigned projects and track progress" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Container>
        <div className="flex justify-between items-center mb-8">
          <SectionTitle subtitle="Developer Portal">
            My Tasks — {developerName}
          </SectionTitle>
          <Button onClick={handleLogout} variant="ghost" className="text-red-500 hover:text-red-600">
            Logout
          </Button>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold">Assigned Projects ({ideas.length})</h3>

          {ideas.length === 0 ? (
            <Card>
              <p className="text-[var(--text-secondary)] text-center py-8">
                No projects assigned yet. Check back later!
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
                            Customer: {idea.customerName}
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            Assigned: {new Date(idea.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {getAvailableStatuses(idea.status).map(status => (
                          <Button
                            key={status}
                            onClick={() => handleStatusUpdate(idea.id, status)}
                            variant={status === 'completed' ? 'primary' : 'ghost'}
                            className="text-sm"
                          >
                            Mark as {getStatusLabel(status)}
                          </Button>
                        ))}
                        <Button
                          onClick={() => setSelectedIdea(idea)}
                          variant="secondary"
                          className="text-sm"
                        >
                          Add Progress
                        </Button>
                      </div>
                    </div>

                    {idea.progress.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-3">Progress Updates</h5>
                        <div className="space-y-3 max-h-40 overflow-y-auto">
                          {idea.progress.map(update => (
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
              <h3 className="text-xl font-bold mb-4">Add Progress Update</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Project: {selectedIdea.title}
              </p>
              <form onSubmit={handleAddProgress}>
                <label className="block text-sm mb-4">
                  <span className="block text-[var(--text-secondary)] mb-2 font-medium">Progress Message</span>
                  <textarea
                    value={progressMessage}
                    onChange={(e) => setProgressMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-gray-700 text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all duration-200 resize-none"
                    rows={3}
                    placeholder="Describe the progress made..."
                    required
                  />
                </label>
                <div className="flex gap-4">
                  <Button type="submit" variant="primary">Add Update</Button>
                  <Button type="button" variant="ghost" onClick={() => setSelectedIdea(null)}>Cancel</Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </Container>
    </>
  )
}
