import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import { getIdeasByCustomer, submitIdea, STATUS_OPTIONS, isAuthenticated, getCurrentUser, logoutUser } from '../lib/mockApi'

export default function CustomerDashboard() {
  const [ideas, setIdeas] = useState([])
  const [customerEmail, setCustomerEmail] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customerName: ''
  })
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    const user = getCurrentUser()
    if (user.role !== 'customer') {
      router.push('/login')
      return
    }

    setCustomerEmail(user.email)
    loadIdeas(user.email)
  }, [])

  const loadIdeas = (email) => {
    const customerIdeas = getIdeasByCustomer(email)
    setIdeas(customerIdeas)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.customerName) {
      alert('Please fill in all fields')
      return
    }

    const newIdea = submitIdea({
      ...formData,
      customerEmail
    })

    setIdeas(prev => [newIdea, ...prev])
    setFormData({ title: '', description: '', customerName: '' })
    setShowForm(false)
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

  const handleLogout = () => {
    logoutUser()
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Customer Dashboard — TechLEarners</title>
        <meta name="description" content="Submit and track your project ideas with TechLEarners" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Container>
        <div className="flex justify-between items-center mb-8">
          <SectionTitle subtitle="Customer Portal">
            My Dashboard
          </SectionTitle>
          <Button onClick={handleLogout} variant="ghost" className="text-red-500 hover:text-red-600">
            Logout
          </Button>
        </div>

        <div className="mb-8">
          <Button onClick={() => setShowForm(!showForm)} variant="primary">
            {showForm ? 'Cancel' : '+ Submit New Idea'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <h3 className="text-xl font-bold mb-4">Submit New Project Idea</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name"
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                required
              />
              <Input
                label="Project Title"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
              <label className="block text-sm mb-4">
                <span className="block text-[var(--text-secondary)] mb-2 font-medium">Project Description</span>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-gray-700 text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all duration-200 resize-vertical"
                  rows={4}
                  placeholder="Describe your project idea, requirements, and goals..."
                  required
                />
              </label>
              <div className="flex gap-4">
                <Button type="submit" variant="primary">Submit Idea</Button>
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        )}

        <div className="space-y-6">
          <h3 className="text-2xl font-bold">My Submitted Ideas ({ideas.length})</h3>

          {ideas.length === 0 ? (
            <Card>
              <p className="text-[var(--text-secondary)] text-center py-8">
                No ideas submitted yet. Click "Submit New Idea" to get started!
              </p>
            </Card>
          ) : (
            ideas.map(idea => (
              <Card key={idea.id}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">{idea.title}</h4>
                    <p className="text-[var(--text-secondary)] mb-3">{idea.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className={`font-medium ${getStatusColor(idea.status)}`}>
                        Status: {getStatusLabel(idea.status)}
                      </span>
                      {idea.assignedDeveloper && (
                        <span className="text-[var(--text-secondary)]">
                          Assigned to: {idea.assignedDeveloper}
                        </span>
                      )}
                      <span className="text-[var(--text-secondary)]">
                        Submitted: {new Date(idea.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {idea.progress.length > 0 && (
                    <div className="md:min-w-[200px]">
                      <h5 className="font-semibold mb-2">Recent Updates</h5>
                      <div className="space-y-1">
                        {idea.progress.slice(-2).map(update => (
                          <div key={update.id} className="text-sm text-[var(--text-secondary)]">
                            <div className="truncate">{update.message}</div>
                            <div className="text-xs opacity-75">
                              {new Date(update.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </Container>
    </>
  )
}
