'use client';

import { Sparkles, FileText, Eye, Download, Wand2, Search } from "lucide-react";

const features = [
  {
    icon: <Wand2 className="w-6 h-6 text-purple-600" />,
    title: "AI-Powered Resume Optimization",
    description:
      "Let cutting-edge AI tailor your resume to job descriptions in seconds.",
  },
  {
    icon: <Search className="w-6 h-6 text-blue-500" />,
    title: "Job Description Analyzer",
    description:
      "Paste any job description and get smart insights to refine your resume.",
  },
  {
    icon: <FileText className="w-6 h-6 text-green-600" />,
    title: "ATS-Friendly Formatting",
    description:
      "Your resume is crafted to be fully readable by Applicant Tracking Systems.",
  },
  {
    icon: <Eye className="w-6 h-6 text-orange-500" />,
    title: "Live Resume Preview",
    description:
      "See exactly how your resume will look before downloading it.",
  },
  {
    icon: <Download className="w-6 h-6 text-red-500" />,
    title: "One-Click Word Download",
    description:
      "Easily export your optimized resume as a professional .docx file.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-pink-500" />,
    title: "Clean & Modern UI",
    description:
      "Enjoy a seamless and intuitive experience across all devices.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-6 lg:px-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">What we offer</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to make your resume stand out, optimized for humans and machines.
        </p>
      </div>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 border border-gray-100"
          >
            <div className="mb-4 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
