import { useState } from 'react'
import Input from './Input'
import Button from './Button'

export default function ContactForm(){
  const [values, setValues] = useState({name:'', email:'', subject:'', message:''})
  const [status, setStatus] = useState(null)

  function handleChange(e){
    setValues(prev=> ({...prev, [e.target.name]: e.target.value}))
  }

  function handleSubmit(e){
    e.preventDefault()
    // Create mailto link with form data
    const subject = encodeURIComponent(values.subject || 'Contact Form Submission')
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`)
    const mailtoLink = `mailto:techl.earners.offl@gmail.com?subject=${subject}&body=${body}`

    // Open email client
    window.location.href = mailtoLink

    // Reset form and show success message
    setValues({name:'', email:'', subject:'', message:''})
    setStatus('sent')
    alert('Opening your email client with the message...')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <Input label="Name" id="name" name="name" value={values.name} onChange={handleChange} required />
      <Input label="Email" id="email" name="email" type="email" value={values.email} onChange={handleChange} required />
      <Input label="Subject" id="subject" name="subject" value={values.subject} onChange={handleChange} />
      <label className="block text-sm mb-4">
        <span className="block text-[var(--text-secondary)] mb-2 font-medium">Message</span>
        <textarea name="message" id="message" value={values.message} onChange={handleChange} rows={6} className="w-full px-4 py-3 rounded-lg bg-[var(--card)] border-2 border-gray-700 text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all duration-200 resize-none" />
      </label>
      <div className="flex items-center gap-3">
        <Button type="submit">Send message</Button>
        {status === 'sending' && <span className="text-sm text-[var(--text-secondary)]">Sending…</span>}
        {status === 'sent' && <span className="text-sm text-[var(--cyan)]">Message queued (demo)</span>}
      </div>
    </form>
  )
}
