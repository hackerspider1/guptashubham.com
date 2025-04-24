import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Shubham Gupta',
  description: 'Privacy Policy of Shubham Gupta\'s website.',
}

export default function PrivacyPolicy(): React.ReactNode {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Shubham Gupta's website. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <span className="font-medium">Technical Data</span> includes internet protocol (IP) address, browser type and version,
                time zone setting and location, browser plug-in types and versions, operating system and platform and other technology
                on the devices you use to access this website.
              </li>
              <li>
                <span className="font-medium">Usage Data</span> includes information about how you use our website.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>To analyze website usage to improve user experience</li>
              <li>To protect our website from malicious activities</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
            <p>
              Our website may use third-party services such as Google Analytics, which collect, monitor and analyze
              usage data. These third-party service providers have their own privacy policies addressing how they use such information.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
              used or accessed in an unauthorized way, altered or disclosed.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data,
              including the right to request access, correction, erasure, restriction, transfer, or to object to processing.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Changes to the Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the "last updated" date.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@guptashubham.com.
            </p>
          </section>
        </div>
        
        <div className="mt-10 text-sm text-gray-400">
          Last updated: May 1, 2023
        </div>
      </div>
    </div>
  );
}
