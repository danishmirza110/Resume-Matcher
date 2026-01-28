'use client';

import { useState, useEffect } from 'react';
import { getProfileData, updateProfileData } from '@/services/apiService';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '@/app/contexts/AuthContext';
import { profile } from 'console';

export default function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState({
    email: '',
    name: '',
    resumeUrl: '',
    pictureUrl: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null> (null);
//   const {token} = useAuth()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileData();
        if (response.success) {
          setUser(response.data.data);
        } else {
          toast.error('Failed to fetch profile');
        }
      } catch (error) {
        toast.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'resume' | 'profilePicture'
  ) => {
    const file = e.target.files?.[0];

    if(!file) return;

    if(type==='resume'){
        setResumeFile(file);
    }
  };

  const handleSave = async () => {
    try {
        setLoading(true);
        const formData = new FormData();
        formData.append('name',user.name);

        if(resumeFile){
            formData.append('resume',resumeFile)
        }

        const response = await updateProfileData(formData);
        if (response.success) {
          toast.success("Profile Updated Successfully")
        } else {
          toast.error('Failed to fetch profile');
        }
      } catch (error) {
        toast.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <ClipLoader color="#7c3aed" size={70} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {/* Header with Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 mt-2">{user.email}</p>
          </div>

          {/* Profile Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="bg-white rounded-xl shadow-sm p-6 sm:p-8"
          >
            <div className="space-y-8">
              {/* Personal Info Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <input
                        value={user.email}
                        readOnly
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Resume</h2>
                <div className="space-y-4">
                  {user.resumeUrl && (
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-md bg-purple-100 text-purple-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Current Resume</p>
                          <a
                            href={user.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-purple-600 hover:underline"
                          >
                            View resume
                          </a>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                      </div>
                      <input 
                        id="dropzone-file" 
                        type="file" 
                        accept="application/pdf" 
                        onChange={(e) => handleFileUpload(e, 'resume')}
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 transition"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}