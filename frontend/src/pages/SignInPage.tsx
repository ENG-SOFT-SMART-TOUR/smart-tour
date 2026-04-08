import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CompassIcon from '../components/CompassIcon'
import { loginRequest } from '../api/auth'
import { useAuth } from '../context/AuthContext'

export default function SignInPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await loginRequest(form.email, form.password)
      login(data.token, data.user)
      navigate('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <motion.div
        className="w-full max-w-sm flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 text-primary mb-8">
          <CompassIcon size={26} />
          <span className="font-serif text-lg font-medium">Signature Trips</span>
        </div>

        <h1 className="font-serif text-foreground text-3xl mb-2 text-center">Welcome back</h1>
        <p className="font-sans text-muted text-sm text-center mb-9">
          Continue your travel journey
        </p>

        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          {[
            { id: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
            { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
          ].map((field) => (
            <div key={field.id} className="flex flex-col gap-1.5">
              <label htmlFor={field.id} className="font-sans text-sm font-medium text-foreground">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.id as keyof typeof form]}
                onChange={handleChange}
                required
                className="
                  bg-transparent border-b border-muted/40 pb-2
                  font-sans text-sm text-foreground placeholder:text-muted/50
                  outline-none focus:border-accent transition-colors duration-200
                "
              />
            </div>
          ))}

          {error && (
            <p className="font-sans text-sm text-red-500 text-center -mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-2 w-full py-4 rounded-full
              bg-accent text-white font-sans font-medium text-sm
              hover:opacity-90 active:scale-95 transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="font-sans text-muted text-sm mt-6 text-center">
          Don't have an account?{' '}
          <button
            className="text-primary font-medium hover:underline"
            onClick={() => navigate('/signup')}
          >
            Create one
          </button>
        </p>
      </motion.div>
    </div>
  )
}
