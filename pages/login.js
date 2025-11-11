import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import { loginUser, isAuthenticated, getCurrentUser } from '../lib/mockApi'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated()) {
      const user = getCurrentUser()
      redirectToDashboard(user.role)
    }
  }, [])

  const redirectToDashboard = (role) => {
    switch (role) {
      case 'customer':
        router.push('/customer-dashboard')
        break
      case 'developer':
        router.push('/developer-dashboard')
        break
      case 'owner':
        router.push('/owner-dashboard')
        break
      default:
        router.push('/')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = loginUser(formData.email, formData.password)

    if (result.success) {
      redirectToDashboard(result.user.role)
    } else {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login — TechLEarners</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Login to access your TechLEarners dashboard" />
      </Head>

      <Container>
        <SectionTitle subtitle="Authentication">
          Login to Your Dashboard
        </SectionTitle>

        <div className="max-w-md mx-auto">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              <Input
                label="Password"
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Card>

          <div className="text-center mt-6">
            <p className="text-[var(--text-secondary)]">
              Don't have an account?{' '}
              <Link href="/register" className="text-[var(--accent)] hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}
