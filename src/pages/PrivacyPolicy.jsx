import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#0A1628] text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

          <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-300 mb-4">
                Welcome to FurnitureViz ("we," "our," or "us"). We are committed to protecting your privacy and the personal information that you provide to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our furniture design visualization application.
              </p>
              <p className="text-gray-300">
                Please read this Privacy Policy carefully. By accessing or using our application, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium mb-2">2.1 Personal Information</h3>
              <p className="text-gray-300 mb-4">
                When you register for an account, we may collect the following personal information:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Password (stored in encrypted form)</li>
                <li>Professional title or role</li>
                <li>Company or organization information</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">2.2 User Content</h3>
              <p className="text-gray-300 mb-4">
                When you use our application, we collect and store the content you create, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li>Room designs and layouts</li>
                <li>Furniture selections and arrangements</li>
                <li>Color choices and design preferences</li>
                <li>Saved projects and client information</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">2.3 Usage Data</h3>
              <p className="text-gray-300 mb-4">
                We automatically collect certain information when you access or use our application:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li>Device information (type, operating system, browser)</li>
                <li>Log data (IP address, access times, pages viewed)</li>
                <li>Usage patterns and feature interactions</li>
                <li>Performance data and error reports</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li>Providing and maintaining our application</li>
                <li>Creating and managing your account</li>
                <li>Storing and processing your designs</li>
                <li>Improving our application and user experience</li>
                <li>Communicating with you about updates or changes</li>
                <li>Analyzing usage patterns to enhance our features</li>
                <li>Providing technical support</li>
                <li>Ensuring the security of our application</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-300 mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li><strong>With Your Consent:</strong> We may share information when you explicitly consent to such sharing.</li>
                <li><strong>Service Providers:</strong> We may employ third-party companies to facilitate our application, provide services on our behalf, or assist us in analyzing how our application is used.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.</li>
                <li><strong>Protection of Rights:</strong> We may disclose information to protect the rights, property, or safety of our company, our users, or others.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-gray-300 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p className="text-gray-300">
                We regularly review our security procedures and update them as necessary to maintain appropriate protection of your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
              <p className="text-gray-300">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
              <p className="text-gray-300 mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> You can request the deletion of your personal information in certain circumstances.</li>
                <li><strong>Restriction:</strong> You can request that we restrict the processing of your information.</li>
                <li><strong>Data Portability:</strong> You can request a copy of your information in a structured, machine-readable format.</li>
                <li><strong>Objection:</strong> You can object to our processing of your information in certain circumstances.</li>
              </ul>
              <p className="text-gray-300">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p className="text-gray-300">
                Our application is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to remove that information from our systems.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-300">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="text-gray-300 mb-2">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <div className="text-gray-300">
                <p>Email: privacy@furnitureviz.com</p>
                <p>Address: 42 Galle Road, Colombo 03, Western Province, Sri Lanka</p>
                <p>Phone: +94 11 234 5678</p>
              </div>
            </section>

            <div className="text-gray-400 text-sm text-center pt-6 border-t border-gray-700">
              Last Updated: April 8, 2025
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicyPage;
