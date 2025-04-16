import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LicensesPage() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#0A1628] text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">Licenses</h1>

          <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Open Source Software Licenses</h2>
              <p className="text-gray-300 mb-6">
                FurnitureViz uses various open source software components. We are grateful to the developers of these projects for their contributions to the open source community. Below is a list of the major open source software used in our application and their respective licenses.
              </p>

              <div className="space-y-6">
                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-xl font-medium mb-2">React</h3>
                  <p className="text-gray-300 mb-2">
                    A JavaScript library for building user interfaces.
                  </p>
                  <p className="text-gray-400 mb-2">
                    <strong>License:</strong> MIT License
                  </p>
                  <p className="text-gray-400 text-sm">
                    Copyright (c) Meta Platforms, Inc. and affiliates.
                  </p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-xl font-medium mb-2">Tailwind CSS</h3>
                  <p className="text-gray-300 mb-2">
                    A utility-first CSS framework for rapidly building custom user interfaces.
                  </p>
                  <p className="text-gray-400 mb-2">
                    <strong>License:</strong> MIT License
                  </p>
                  <p className="text-gray-400 text-sm">
                    Copyright (c) Tailwind Labs, Inc.
                  </p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-xl font-medium mb-2">Three.js</h3>
                  <p className="text-gray-300 mb-2">
                    A JavaScript 3D library that makes WebGL simpler.
                  </p>
                  <p className="text-gray-400 mb-2">
                    <strong>License:</strong> MIT License
                  </p>
                  <p className="text-gray-400 text-sm">
                    Copyright (c) 2010-2023 Three.js Authors
                  </p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-xl font-medium mb-2">React Three Fiber</h3>
                  <p className="text-gray-300 mb-2">
                    A React renderer for Three.js.
                  </p>
                  <p className="text-gray-400 mb-2">
                    <strong>License:</strong> MIT License
                  </p>
                  <p className="text-gray-400 text-sm">
                    Copyright (c) 2019 Paul Henschel
                  </p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-xl font-medium mb-2">React Router</h3>
                  <p className="text-gray-300 mb-2">
                    Declarative routing for React applications.
                  </p>
                  <p className="text-gray-400 mb-2">
                    <strong>License:</strong> MIT License
                  </p>
                  <p className="text-gray-400 text-sm">
                    Copyright (c) React Training LLC
                  </p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-xl font-medium mb-2">Vite</h3>
                  <p className="text-gray-300 mb-2">
                    A build tool that aims to provide a faster and leaner development experience for modern web projects.
                  </p>
                  <p className="text-gray-400 mb-2">
                    <strong>License:</strong> MIT License
                  </p>
                  <p className="text-gray-400 text-sm">
                    Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors
                  </p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-xl font-medium mb-2">Supabase</h3>
                  <p className="text-gray-300 mb-2">
                    An open source Firebase alternative.
                  </p>
                  <p className="text-gray-400 mb-2">
                    <strong>License:</strong> Apache License 2.0
                  </p>
                  <p className="text-gray-400 text-sm">
                    Copyright (c) Supabase
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">MIT License</h2>
              <div className="bg-gray-900 p-4 rounded text-gray-300 text-sm font-mono whitespace-pre-wrap">
                {`Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Apache License 2.0</h2>
              <p className="text-gray-300 mb-4">
                A summary of the Apache License 2.0 is provided below. For the full license text, please visit <a href="https://www.apache.org/licenses/LICENSE-2.0" className="text-blue-400 hover:underline">https://www.apache.org/licenses/LICENSE-2.0</a>.
              </p>
              <div className="bg-gray-900 p-4 rounded text-gray-300 text-sm font-mono whitespace-pre-wrap">
                {`Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3D Models and Assets</h2>
              <p className="text-gray-300 mb-4">
                Some 3D models and assets used in FurnitureViz may be licensed from third parties. These assets are used in accordance with their respective licenses. If you believe any content infringes on your copyright, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about our licenses or the use of open source software in our application, please contact us at:
              </p>
              <div className="text-gray-300">
                <p>Email: legal@furnitureviz.com</p>
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

export default LicensesPage;
