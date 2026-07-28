'use client'

import { useState } from 'react'

export function ContactForm() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    organization: '',
    role: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ first_name: '', last_name: '', email: '', organization: '', role: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#C9963A]/10 border border-[#C9963A] rounded-sm p-6 text-center">
        <p className="font-serif text-xl font-bold text-[#0A1628] mb-2">Message Received</p>
        <p className="font-sans text-sm text-[#4A5568]">
          Thank you for reaching out. Dr. Miles will respond within 1–2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block font-sans text-xs font-semibold text-[#1A202C] mb-1.5 uppercase tracking-wide">
            First Name <span className="text-[#C9963A]">*</span>
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={form.first_name}
            onChange={handleChange}
            required
            className="w-full border border-[#E2E8F0] font-sans text-sm text-[#1A202C] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#C9963A] transition-colors duration-150"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block font-sans text-xs font-semibold text-[#1A202C] mb-1.5 uppercase tracking-wide">
            Last Name <span className="text-[#C9963A]">*</span>
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={form.last_name}
            onChange={handleChange}
            required
            className="w-full border border-[#E2E8F0] font-sans text-sm text-[#1A202C] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#C9963A] transition-colors duration-150"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block font-sans text-xs font-semibold text-[#1A202C] mb-1.5 uppercase tracking-wide">
          Work Email <span className="text-[#C9963A]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-[#E2E8F0] font-sans text-sm text-[#1A202C] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#C9963A] transition-colors duration-150"
        />
      </div>

      <div>
        <label htmlFor="organization" className="block font-sans text-xs font-semibold text-[#1A202C] mb-1.5 uppercase tracking-wide">
          School District / Organization
        </label>
        <input
          id="organization"
          name="organization"
          type="text"
          value={form.organization}
          onChange={handleChange}
          className="w-full border border-[#E2E8F0] font-sans text-sm text-[#1A202C] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#C9963A] transition-colors duration-150"
        />
      </div>

      <div>
        <label htmlFor="role" className="block font-sans text-xs font-semibold text-[#1A202C] mb-1.5 uppercase tracking-wide">
          Role / Title
        </label>
        <input
          id="role"
          name="role"
          type="text"
          value={form.role}
          onChange={handleChange}
          className="w-full border border-[#E2E8F0] font-sans text-sm text-[#1A202C] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#C9963A] transition-colors duration-150"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-sans text-xs font-semibold text-[#1A202C] mb-1.5 uppercase tracking-wide">
          Message <span className="text-[#C9963A]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border border-[#E2E8F0] font-sans text-sm text-[#1A202C] px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#C9963A] transition-colors duration-150 resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-[#C9963A] text-white font-sans text-sm font-semibold px-6 py-3 rounded-sm hover:bg-[#0A1628] transition-colors duration-150 disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
