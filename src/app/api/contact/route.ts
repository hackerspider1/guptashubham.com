import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isRateLimited, incrementRateLimit, getRateLimitRemaining, getRateLimitResetTime } from './rate-limits';
import { verifyRecaptcha } from './recaptcha';

export async function POST(req: NextRequest) {
  try {
    // Get client IP
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (isRateLimited(ip)) {
      const resetTime = getRateLimitResetTime(ip);
      const resetMinutes = Math.ceil(resetTime / 60000); // Convert to minutes
      
      return NextResponse.json(
        { 
          error: `Rate limit exceeded. Please try again later (in about ${resetMinutes} minute${resetMinutes !== 1 ? 's' : ''}).` 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(Date.now() + resetTime))
          }
        }
      );
    }
    
    // Parse the request body
    const { name, email, message, recaptchaToken } = await req.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Validate reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }
    
    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'hotmail', // Microsoft service for live.com emails
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'shubhamgupta109.1995@live.com',
      subject: `Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Increment rate limit counter
    incrementRateLimit(ip);
    
    // Get remaining requests for headers
    const remaining = getRateLimitRemaining(ip);

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(Math.ceil(Date.now() + getRateLimitResetTime(ip)))
        }
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: (error as Error).message },
      { status: 500 }
    );
  }
} 