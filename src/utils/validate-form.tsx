export interface ContactFormData{
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult{
    success: boolean;
  message: string;
}

export const ValidateContactForm = (form: ContactFormData): ValidationResult => {
    const result: ValidationResult = {
      success: true,
      message: "Form Validated",
    };
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!form.name.trim()) {
      result.message = 'Name is required';
      result.success = false;
    } else if (!form.email.trim()) {
      result.message = 'Email is required';
      result.success = false;
    } else if (!emailRegex.test(form.email)) {
      result.message = 'Enter a valid email';
      result.success = false;
    } else if (!form.message.trim()) {
      result.message = 'Message is required';
      result.success = false;
    } else if (form.message.trim().length < 10) {
      result.message = 'Message must be at least 10 characters';
      result.success = false;
    }
  
    return result;
  };