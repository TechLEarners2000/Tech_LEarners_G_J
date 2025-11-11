import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Container from '../components/Container'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import { registerUser } from '../lib/mockApi'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    secretKey: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    // Validate secret key for owner registration
    if (formData.role === 'owner' && formData.secretKey !== '3234042') {
      setError('Invalid secret key for owner registration')
      setLoading(false)
      return
    }

    const result = registerUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role
    })

    if (result.success) {
      setSuccess(result.message)
      if (formData.role === 'customer' || formData.role === 'owner') {
        setTimeout(() => router.push('/login'), 2000)
      }
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Register — TechLEarners</title>
        <link rel="icon" href="/logo.png" />
        <meta name="description" content="Register for a TechLEarners account" />
      </Head>

      <Container>
        <SectionTitle subtitle="Get Started">
          Create Your Account
        </SectionTitle>

        <div className="max-w-md mx-auto">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              <Input
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              <Input
                label="Phone Number"
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="123-456-7890"
                required
              />

              <div>
                <label className="block text-sm mb-2 font-medium text-[var(--text-secondary)]">
                  Account Type
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-gray-700 text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all duration-200"
                  required
                >
                  <option value="customer">Customer</option>
                  <option value="developer">Developer</option>
                  <option value="owner">Owner</option>
                </select>
                {formData.role === 'developer' && (
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Developer accounts require owner approval before activation.
                  </p>
                )}
                {formData.role === 'owner' && (
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Owner registration requires a secret key.
                  </p>
                )}
              </div>

              {formData.role === 'owner' && (
                <Input
                  label="Secret Key"
                  id="secretKey"
                  type="password"
                  value={formData.secretKey}
                  onChange={(e) => setFormData(prev => ({ ...prev, secretKey: e.target.value }))}
                  placeholder="Enter secret key"
                  required
                />
              )}

              <Input
                label="Password"
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              <Input
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
              />

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-500 text-sm text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  {success}
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Register'}
              </Button>
            </form>
          </Card>

          <div className="text-center mt-6">
            <p className="text-[var(--text-secondary)]">
              Already have an account?{' '}
              <Link href="/login" className="text-[var(--accent)] hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}
