// src/services/apiService.ts
import { ContactFormData } from '@/utils/validate-form';

const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export async function matchResume(file: File, jobDescription: string) {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobDescription', jobDescription);

  try {
    const response = await fetch(`${apiBaseUrl}/ai/match`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Something went wrong');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export const optimizeResume = async (file:File | null, jobDescription: string)=>{
  const formData = new FormData();

  formData.append('jobDescription',jobDescription);

  if(file){
    formData.append('resume',file);
  }

  try{
    const response = await fetch(`${apiBaseUrl}/ai/generate-resume`,{
      method:'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error('Failed to generate resume');
    }

    const data = await response.blob();

    return { success: true, data};
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export const submitContactForm = async (form:ContactFormData)=>{

  try{

    const response = await fetch(`${apiBaseUrl}/user/contact`,{
      method:'POST',
      body: JSON.stringify(form),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Something went wrong');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export const loginViaGoogle = async (code:string)=>{
  
  try{ 

    const response = await fetch(`${apiBaseUrl}/user/login`,{
      method:'POST',
      body: JSON.stringify({
        code:code
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if(!response.ok){
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Something went wrong');
    }

    const data = await response.json();
    return {success:true, data}

  }catch(error:any){
    return {success:false,error:error.message}
  }
}

export const getProfileData = async ()=>{
  try{
    const authToken = localStorage.getItem('token');
    const response = await fetch(`${apiBaseUrl}/user/profile`,{
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Something went wrong');
    }

    const data = await response.json();
    return { success: true, data };

  }catch(error:any){
    console.log(error)
    return {success:false,error:error.message}
  }
}

export const updateProfileData = async (formData:FormData)=>{
  try{

    const authToken = localStorage.getItem('token');
    const response = await fetch(`${apiBaseUrl}/user/profile`,{
      method:'PATCH',
      body: formData,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Something went wrong');
    }

    const data = await response.json();
    return { success: true, data };

  }catch(error:any){
    console.log(error)
    return {success:false,error:error.message}
  }
}
