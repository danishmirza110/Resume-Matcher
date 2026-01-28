'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/common/Toast';
import { submitContactForm } from '@/services/apiService';
import { ValidateContactForm } from '@/utils/validate-form';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValidationResult = ValidateContactForm(form);
    if (!formValidationResult.success) {
      setToast({ message: formValidationResult.message, type: 'error' });
      return;
    }

    setLoading(true);

    try {

      const response = await submitContactForm(form);

      if (response.success) {
        setToast({ message: 'Message sent successfully!', type: 'success' });
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => router.push('/'), 1500); // redirect with delay
      } else {
        const errorMessage = JSON.parse(response.error).error || 'Failed to send message';
        setToast({ message: errorMessage, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white py-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-600 mb-12">
          Have questions, feedback, or feature requests? We’d love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 text-left">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-black focus:border-black resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)}/>}
    </section>
  );
}
