import { Upload, SearchCheck, BarChart3, Sparkles, FileDown } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-br from-white via-slate-50 to-indigo-50 py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">How It Works</h2>
        <p className="text-lg text-gray-600 mb-16">
          Whether you're matching your resume to a job or optimizing it with AI, we've got you covered.
        </p>

        {/* Match Resume Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-indigo-600">📊 Match My Resume</h3>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                icon: <Upload className="w-10 h-10 text-indigo-600" />,
                title: 'Upload Resume & Job Description',
                description: 'Provide your resume and the job description you want to match.',
              },
              {
                icon: <SearchCheck className="w-10 h-10 text-indigo-600" />,
                title: 'AI Scans & Analyzes',
                description: 'Our AI detects strengths, gaps, and compares them with the job role.',
              },
              {
                icon: <BarChart3 className="w-10 h-10 text-indigo-600" />,
                title: 'Get Match Score & Insights',
                description: 'Receive a match percentage and improvement suggestions instantly.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-8 transition-transform hover:scale-105"
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Optimize Resume Section */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-pink-600">✨ Optimize My Resume</h3>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                icon: <Upload className="w-10 h-10 text-pink-600" />,
                title: 'Provide Resume & Job Description',
                description: 'Start with your resume and the job you’re targeting.',
              },
              {
                icon: <Sparkles className="w-10 h-10 text-pink-600" />,
                title: 'AI Optimizes Your Resume',
                description: 'Our AI rewrites and enhances your resume to improve visibility.',
              },
              {
                icon: <FileDown className="w-10 h-10 text-pink-600" />,
                title: 'Download Optimized Version',
                description: 'Get a polished, ATS-friendly resume ready to send.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-8 transition-transform hover:scale-105"
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
