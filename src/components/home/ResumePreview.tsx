'use client';
import { useEffect, useState } from 'react';

interface ResumePreviewProps {
  blob: Blob;
  onTryAgain: () => void;
}

export default function ResumePreview({ blob, onTryAgain }: ResumePreviewProps) {
  const [fileUrl, setFileUrl] = useState<string>('');

  useEffect(() => {
    const url = URL.createObjectURL(blob);
    setFileUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [blob]);

  return (
    <div className="max-w-2xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">🎉 Resume Optimized!</h2>
      <p className="text-gray-600 mb-6">
        Your resume has been optimized with AI. You can download the .docx file and make further edits in Word or Google Docs.
      </p>

      {/* Fancy Card Summary instead of full content */}
      <div className="bg-gradient-to-br from-indigo-100 to-white p-6 rounded-xl shadow-lg mb-6">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">What's Inside:</h3>
        <ul className="text-left text-gray-700 list-disc list-inside space-y-1">
          <li>✔️ Optimized format for ATS</li>
          <li>✔️ Tailored keywords from job description</li>
          <li>✔️ Clear skill highlights</li>
          <li>✔️ Professional wording & structure</li>
          <li>✔️ Ready to edit & apply</li>
        </ul>
      </div>

      {/* Download / Retry Buttons */}
      <div className="flex justify-center gap-4">
        <a
          href={fileUrl}
          download="Optimized_Resume.docx"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Download Resume
        </a>
        <button
          onClick={onTryAgain}
          className="border border-gray-400 text-gray-700 px-5 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
        >
          🔁 Try Again
        </button>
      </div>
    </div>
  );
}
