// Mock API for TechLEarners Dashboard
// Frontend-only implementation with localStorage persistence

const STORAGE_KEY = 'techlearners-dashboard-data'
const AUTH_STORAGE_KEY = 'techlearners-auth'
const PENDING_DEVELOPERS_KEY = 'techlearners-pending-developers'

// Load users from JSON files
let customers = []
let developers = []
let owners = []

// Load JSON data
async function loadUsers() {
  if (typeof window === 'undefined') return

  try {
    const customerResponse = await fetch('/lib/customer.json')
    customers = await customerResponse.json()

    const developerResponse = await fetch('/lib/developer.json')
    developers = await developerResponse.json()

    const ownerResponse = await fetch('/lib/owner.json')
    owners = await ownerResponse.json()

    // Update mockUsers after loading
    mockUsers = [...customers, ...developers, ...owners]
  } catch (error) {
    console.error('Error loading user data:', error)
  }
}

// Save users to JSON files (simulated - in real app this would be server-side)
async function saveUsersToFile(role, users) {
  // In a real application, this would make an API call to update the JSON files
  // For now, we'll just update the in-memory arrays and localStorage
  console.log(`Saving ${role} users:`, users)
}

// Initialize users
loadUsers()

// Mock users for authentication (initialize with JSON data)
let mockUsers = []

// Authentication functions
export function loginUser(email, password) {
  const user = mockUsers.find(u => u.email === email && u.password === password)
  if (user) {
    const session = { ...user, loginTime: new Date().toISOString() }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    return { success: true, user: session }
  }
  return { success: false, error: 'Invalid credentials' }
}

export function logoutUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function getCurrentUser() {
  if (typeof window === 'undefined') return null

  try {
    const session = localStorage.getItem(AUTH_STORAGE_KEY)
    if (session) {
      const user = JSON.parse(session)
      // Check if session is still valid (24 hours)
      const loginTime = new Date(user.loginTime)
      const now = new Date()
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60)

      if (hoursDiff < 24) {
        return user
      } else {
        logoutUser() // Session expired
        return null
      }
    }
  } catch (error) {
    console.error('Error getting current user:', error)
  }
  return null
}

export function isAuthenticated() {
  return getCurrentUser() !== null
}

export function hasRole(role) {
  const user = getCurrentUser()
  return user && user.role === role
}

// Registration functions
export function registerUser(userData) {
  const { email, password, name, role, phone } = userData

  // Check if email already exists
  const existingUser = mockUsers.find(u => u.email === email)
  if (existingUser) {
    return { success: false, error: 'Email already registered' }
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
    name,
    role,
    phone,
    createdAt: new Date().toISOString()
  }

  if (role === 'customer') {
    // Customers are approved immediately
    customers.push(newUser)
    mockUsers.push(newUser)
    saveUsersToFile('customer', customers)
    return { success: true, message: 'Registration successful! You can now login.' }
  } else if (role === 'developer') {
    // Developers need approval
    const pendingDevelopers = getPendingDevelopers()
    pendingDevelopers.push(newUser)
    savePendingDevelopers(pendingDevelopers)
    return { success: true, message: 'Registration submitted! Waiting for owner approval.' }
  } else if (role === 'owner') {
    // Owners are approved immediately
    owners.push(newUser)
    mockUsers.push(newUser)
    saveUsersToFile('owner', owners)
    return { success: true, message: 'Registration successful! You can now login.' }
  }

  return { success: false, error: 'Invalid role' }
}

export function getPendingDevelopers() {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(PENDING_DEVELOPERS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading pending developers:', error)
    return []
  }
}

function savePendingDevelopers(pendingDevelopers) {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(PENDING_DEVELOPERS_KEY, JSON.stringify(pendingDevelopers))
  } catch (error) {
    console.error('Error saving pending developers:', error)
  }
}

export function approveDeveloper(developerId) {
  const pendingDevelopers = getPendingDevelopers()
  const index = pendingDevelopers.findIndex(d => d.id === developerId)

  if (index !== -1) {
    const approvedDeveloper = pendingDevelopers.splice(index, 1)[0]
    developers.push(approvedDeveloper)
    mockUsers.push(approvedDeveloper)
    savePendingDevelopers(pendingDevelopers)
    saveUsersToFile('developer', developers)
    return { success: true, developer: approvedDeveloper }
  }

  return { success: false, error: 'Developer not found' }
}

export function rejectDeveloper(developerId) {
  const pendingDevelopers = getPendingDevelopers()
  const index = pendingDevelopers.findIndex(d => d.id === developerId)

  if (index !== -1) {
    pendingDevelopers.splice(index, 1)
    savePendingDevelopers(pendingDevelopers)
    return { success: true }
  }

  return { success: false, error: 'Developer not found' }
}

// Mock data structure
const initialData = {
  ideas: [
    {
      id: 1,
      title: 'Smart Irrigation System',
      description: 'Automated irrigation system for small farms using soil moisture sensors',
      customerName: 'John Farmer',
      customerEmail: 'john@farm.com',
      status: 'pending', // pending, assigned, in-progress, completed, cancelled
      assignedDeveloper: null,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      progress: []
    },
    {
      id: 2,
      title: 'Warehouse Inventory Tracker',
      description: 'IoT solution for real-time inventory tracking in warehouses',
      customerName: 'Sarah Logistics',
      customerEmail: 'sarah@logistics.com',
      status: 'assigned',
      assignedDeveloper: 'Alice Dev',
      createdAt: '2024-01-10T14:30:00Z',
      updatedAt: '2024-01-12T09:15:00Z',
      progress: [
        {
          id: 1,
          message: 'Initial requirements gathering completed',
          timestamp: '2024-01-12T09:15:00Z'
        }
      ]
    },
    {
      id: 3,
      title: 'Energy Monitoring Dashboard',
      description: 'Web dashboard for monitoring energy consumption across multiple sites',
      customerName: 'Mike Energy',
      customerEmail: 'mike@energy.com',
      status: 'in-progress',
      assignedDeveloper: 'Bob Code',
      createdAt: '2024-01-08T16:45:00Z',
      updatedAt: '2024-01-14T11:20:00Z',
      progress: [
        {
          id: 1,
          message: 'UI mockups completed',
          timestamp: '2024-01-10T13:00:00Z'
        },
        {
          id: 2,
          message: 'Backend API structure defined',
          timestamp: '2024-01-14T11:20:00Z'
        }
      ]
    }
  ],
  developers: [
    { id: 1, name: 'Alice Dev', email: 'alice@techlearners.com' },
    { id: 2, name: 'Bob Code', email: 'bob@techlearners.com' },
    { id: 3, name: 'Charlie Tech', email: 'charlie@techlearners.com' }
  ]
}

// Load data from localStorage
function loadData() {
  if (typeof window === 'undefined') return initialData

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...initialData, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
  return initialData
}

// Save data to localStorage
function saveData(data) {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving dashboard data:', error)
  }
}

// Get all ideas
export function getIdeas() {
  const data = loadData()
  return data.ideas
}

// Get ideas by customer email
export function getIdeasByCustomer(email) {
  const data = loadData()
  return data.ideas.filter(idea => idea.customerEmail === email)
}

// Get ideas assigned to developer
export function getIdeasByDeveloper(developerName) {
  const data = loadData()
  return data.ideas.filter(idea => idea.assignedDeveloper === developerName)
}

// Submit new idea
export function submitIdea(ideaData) {
  const data = loadData()
  const newIdea = {
    id: Date.now(),
    ...ideaData,
    status: 'pending',
    assignedDeveloper: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: []
  }
  data.ideas.push(newIdea)
  saveData(data)
  return newIdea
}

// Update idea status (owner/developer)
export function updateIdeaStatus(ideaId, status, developerName = null) {
  const data = loadData()
  const idea = data.ideas.find(i => i.id === ideaId)
  if (idea) {
    idea.status = status
    if (developerName) {
      idea.assignedDeveloper = developerName
    }
    idea.updatedAt = new Date().toISOString()
    saveData(data)
    return idea
  }
  return null
}

// Add progress update
export function addProgressUpdate(ideaId, message) {
  const data = loadData()
  const idea = data.ideas.find(i => i.id === ideaId)
  if (idea) {
    const update = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString()
    }
    idea.progress.push(update)
    idea.updatedAt = new Date().toISOString()
    saveData(data)
    return update
  }
  return null
}

// Get all developers
export function getDevelopers() {
  const data = loadData()
  return data.developers
}

// Assign developer to idea
export function assignDeveloper(ideaId, developerName) {
  return updateIdeaStatus(ideaId, 'assigned', developerName)
}

// Status options
export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending Review' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
]
