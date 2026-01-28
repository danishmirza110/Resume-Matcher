'use client';
import { useState } from 'react';
import UploadResume from '@/components/home/UploadResume';
import OptimizeResume from '@/components/home/ResumeOptimizer';
import ResultsDisplay from '@/components/home/ResultDisplay';
import ResumePreview from '@/components/home/ResumePreview';
import {event} from '@/utils/gtag';
import { Sparkles, Wand2 } from 'lucide-react';

export default function HeroSection() {
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isOptimizeModalOpen, setIsOptimizeModalOpen] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [optimizedResume, setOptimizedResume] = useState<Blob | null>(null);

  const openMatchModal = () => {

    event({
      action: 'upload_resume',
      category: 'Resume',
      label: 'Upload Resume Button',
      value: 'Home Page',
    });

    setIsMatchModalOpen(true);

  }
  const openOptimizeModal = () => {

    event({
      action: 'optimize_resume',
      category: 'Resume',
      label: 'Optimize Resume Button',
      value: 'Home Page',
    });

    setIsOptimizeModalOpen(true)
  };

  const closeModals = () => {
    setIsMatchModalOpen(false);
    setIsOptimizeModalOpen(false);
  };

  const handleResult = (data: any) => {
    setResult(data);
    closeModals();
  };

  const handleOptimizedResume = (blob: Blob) => {
    setOptimizedResume(blob);
    closeModals();
  };

  const resetView = () => {
    setResult(null);
    setOptimizedResume(null);
    setIsMatchModalOpen(false);
    setIsOptimizeModalOpen(false);
  };

  return (
    <section className="bg-gradient-to-tr from-white via-slate-50 to-indigo-50 px-6 py-32 md:py-40 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto z-10 relative">
        {!result && !optimizedResume ? (
          <>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Land Your Dream Job with <span className="text-indigo-600">AI-Powered Resumes</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
              Use AI to match your resume with job descriptions or optimize it for Applicant Tracking Systems.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={openMatchModal}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Match Resume
              </button>
              <button
                onClick={openOptimizeModal}
                className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-medium shadow hover:bg-indigo-50 transition flex items-center gap-2"
              >
                <Wand2 className="w-5 h-5" />
                Optimize Resume
              </button>
            </div>
          </>
        ) : result ? (
          <ResultsDisplay result={result} onReset={resetView} />
        ) : optimizedResume ? (
          <ResumePreview blob={optimizedResume} onTryAgain={resetView} />
        ) : null}
      </div>

      {/* Modals */}
      {(isMatchModalOpen || isOptimizeModalOpen) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="relative bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
            <button
              onClick={closeModals}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            {isMatchModalOpen && (
              <UploadResume closeModal={closeModals} onResult={handleResult} />
            )}
            {isOptimizeModalOpen && (
              <OptimizeResume closeModal={closeModals} onOptimized={handleOptimizedResume} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
