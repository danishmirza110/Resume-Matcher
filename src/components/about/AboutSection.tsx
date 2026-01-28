import { Briefcase, Rocket, Target } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="max-w-6xl mx-auto text-gray-800 px-4 sm:px-8 pb-24">
      {/* Hero */}
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 leading-tight">
          Empower Your Career with AI
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At <strong>Match My Resume</strong>, we help job seekers craft AI-optimized resumes to improve visibility, beat ATS systems, and get more interviews.
        </p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl transition-transform hover:scale-105">
          <div className="flex items-center gap-4 mb-4">
            <Briefcase className="w-8 h-8" />
            <h3 className="text-xl font-semibold">Why We Started</h3>
          </div>
          <p className="text-sm leading-relaxed">
            Many resumes never reach hiring managers due to poor optimization. We built this tool to change that—using AI to make every resume count.
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white p-6 rounded-2xl shadow-xl transition-transform hover:scale-105">
          <div className="flex items-center gap-4 mb-4">
            <Rocket className="w-8 h-8" />
            <h3 className="text-xl font-semibold">What We Offer</h3>
          </div>
          <p className="text-sm leading-relaxed">
            Match job descriptions with your resume, optimize for keywords, and generate a downloadable, ATS-friendly resume—all in one click.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-6 rounded-2xl shadow-xl transition-transform hover:scale-105">
          <div className="flex items-center gap-4 mb-4">
            <Target className="w-8 h-8" />
            <h3 className="text-xl font-semibold">Our Vision</h3>
          </div>
          <p className="text-sm leading-relaxed">
            To bridge the gap between job seekers and recruiters through intelligent tools that make applying for jobs easier, smarter, and more effective.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-2">Ready to land your dream job?</h2>
        <p className="text-gray-600 mb-6">Start optimizing your resume with the power of AI now.</p>
        <a
          href="/"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-indigo-700 transition"
        >
          Try Match My Resume
        </a>
      </div>
    </section>
  );
};
