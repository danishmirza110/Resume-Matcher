"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import Toast from '@/components/common/Toast';
import toast from 'react-hot-toast';
import { useAuth } from '@/app/contexts/AuthContext';
import { loginViaGoogle } from '@/services/apiService';

export default function GoogleCallback() {
  const { token, login, logout } = useAuth();
  // const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    const sendCodeToBackend = async () => {
      if (!code) return;

      try {
        const response = await loginViaGoogle(code);

        if(response.success == false){
          throw new Error(response.error)
        }
        const jwtToken = response.data.data.authToken

        console.log("Response came", response.data.data.authToken)
      
        // Save token
        localStorage.setItem('access_token', jwtToken);
        toast.success('Signed in successfully!');
        // setToast({ message: 'Signed in successfully!', type: 'success' });
        login(jwtToken);
      } catch (error) {
        console.error(error);
        toast.error("Failed to signin")
        // setToast({ message: "Sign in failed", type: 'error' });
        logout()
      }
    };

    sendCodeToBackend();
  }, [code, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
