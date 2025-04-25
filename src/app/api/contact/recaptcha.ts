/**
 * reCAPTCHA verification module for the contact form
 */

// Verify a reCAPTCHA token against Google's API
export async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('reCAPTCHA secret key not configured');
      return false;
    }
    
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: 'POST' }
    );
    
    const data = await response.json();
    
    // Google's reCAPTCHA API returns a success field
    if (!data.success) {
      console.warn('reCAPTCHA verification failed:', data['error-codes']);
    }
    
    return data.success;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
} 