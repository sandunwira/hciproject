import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#0A1628] text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>

          <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-300 mb-4">
                Welcome to FurnitureViz. These Terms of Service ("Terms") govern your use of our website, applications, and services (collectively, the "Services") provided by FurnitureViz ("we," "our," or "us").
              </p>
              <p className="text-gray-300">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
              <p className="text-gray-300 mb-4">
                To access certain features of our Services, you may need to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself and to update this information to maintain its accuracy.
              </p>
              <p className="text-gray-300 mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              <p className="text-gray-300">
                We reserve the right to suspend or terminate your account if any information provided during registration or thereafter proves to be inaccurate, false, or misleading, or if you violate any provision of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Use of Services</h2>
              <p className="text-gray-300 mb-4">
                Our Services are designed to help interior designers and clients visualize furniture arrangements in various spaces. You agree to use our Services only for lawful purposes and in accordance with these Terms.
              </p>
              <p className="text-gray-300 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li>Use the Services in any way that violates any applicable law or regulation</li>
                <li>Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Services</li>
                <li>Use any robot, spider, crawler, scraper, or other automated means to access the Services</li>
                <li>Bypass measures we may use to prevent or restrict access to the Services</li>
                <li>Upload or transmit viruses, malware, or other types of malicious software</li>
                <li>Collect or harvest any information from the Services, including account names</li>
                <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="text-gray-300 mb-4">
                The Services and their original content, features, and functionality are owned by FurnitureViz and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p className="text-gray-300 mb-4">
                You may not copy, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services, except as follows:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li>Your computer may temporarily store copies of such materials incidental to your accessing and viewing those materials</li>
                <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
                <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
              <p className="text-gray-300 mb-4">
                Our Services may allow you to upload, submit, store, send, or receive content, including room designs, furniture arrangements, and other materials (collectively, "User Content").
              </p>
              <p className="text-gray-300 mb-4">
                You retain ownership rights in your User Content. However, by uploading User Content, you grant FurnitureViz a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content in connection with providing the Services.
              </p>
              <p className="text-gray-300 mb-4">
                You represent and warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li>You own or control all rights in and to your User Content</li>
                <li>Your User Content does not violate the privacy rights, publicity rights, copyright, contractual rights, or any other rights of any person or entity</li>
                <li>Your User Content does not contain any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
              <p className="text-gray-300 mb-4">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-gray-300 mb-4">
                We do not warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li>The Services will function uninterrupted, secure, or available at any particular time or location</li>
                <li>Any errors or defects will be corrected</li>
                <li>The Services are free of viruses or other harmful components</li>
                <li>The results of using the Services will meet your requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-300 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL FURNITUREVIZ, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc list-inside text-gray-300 mb-4 ml-4">
                <li>Your access to or use of or inability to access or use the Services</li>
                <li>Any conduct or content of any third party on the Services</li>
                <li>Any content obtained from the Services</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Indemnification</h2>
              <p className="text-gray-300">
                You agree to defend, indemnify, and hold harmless FurnitureViz, its directors, employees, partners, agents, suppliers, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
              <p className="text-gray-300">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms or your use of the Services shall be exclusively brought in the courts located in [Your Jurisdiction], and you consent to the personal jurisdiction of such courts.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="text-gray-300 mb-2">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="text-gray-300">
                <p>Email: terms@furnitureviz.com</p>
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

export default TermsOfServicePage;
