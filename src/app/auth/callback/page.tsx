"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/app/contexts/AuthContext';
import { loginViaGoogle } from '@/services/apiService';

// 1. Asli logic wala component
function GoogleCallbackContent() {
  const { login, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    const sendCodeToBackend = async () => {
      if (!code) return;

      try {
        const response = await loginViaGoogle(code);

        if(response.success === false){
          throw new Error(response.error)
        }
        const jwtToken = response.data.data.authToken

        console.log("Response came", jwtToken)
      
        localStorage.setItem('access_token', jwtToken);
        toast.success('Signed in successfully!');
        login(jwtToken);
        router.push('/'); // Login ke baad redirect karein
      } catch (error) {
        console.error(error);
        toast.error("Failed to signin")
        logout()
        router.push('/login');
      }
    };

    sendCodeToBackend();
  }, [code, router, login, logout]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

// 2. Main Page component jo Suspense use karega
export default function GoogleCallback() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p>Verifying login...</p>
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  );
}
