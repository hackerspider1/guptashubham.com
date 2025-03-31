import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Shubham Gupta',
  description: 'Privacy policy for guptashubham.com',
}

export default function PrivacyPolicy(): JSX.Element {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-300 mb-4">
            This privacy policy explains how guptashubham.com ("we", "us", or "our") collects, uses, and protects your information when you visit our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-300 mb-4">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>To improve our website functionality and user experience</li>
            <li>To analyze our website traffic and understand user preferences</li>
            <li>To maintain security and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="text-gray-300 mb-4">
            We may use third-party services such as Google Analytics to monitor and analyze the use of our website. These third parties have their own privacy policies addressing how they use such information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-300 mb-4">
            The security of your data is important to us. We strive to use commercially acceptable means to protect your personal information but cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-gray-300">
            If you have any questions about this Privacy Policy, please contact us at privacy@guptashubham.com
          </p>
        </section>
      </div>
    </div>
  );
}
