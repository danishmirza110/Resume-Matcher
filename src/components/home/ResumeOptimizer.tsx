"use client";
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Toast from '@/components/common/Toast';
import { optimizeResume } from '@/services/apiService';

interface OptimizeResumeProps {
  closeModal: () => void;
  onOptimized: (file: Blob) => void;
}

export default function OptimizeResume({ closeModal, onOptimized }: OptimizeResumeProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobDescription) {
      setToast({ message: 'Please paste a job description.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const response = await optimizeResume(file, jobDescription);

      if (response.success && response.data) {
        const buffer = response.data;
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        onOptimized(blob);
        setToast({ message: 'Resume optimized successfully!', type: 'success' });
      } else {
        const errorMessage = JSON.parse(response.error).error;
        setToast({ message: errorMessage, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <ClipLoader color="#000000" size={80} />
            <p className="text-gray-600 mt-4">Optimizing your resume, please wait...</p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center">Optimize Your Resume with AI</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Your Resume (Optional)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              {file && <p className="text-sm text-gray-500 mt-2">Selected File: {file.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Paste Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Paste the job description here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Optimize Resume
            </button>
          </form>
        </>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
