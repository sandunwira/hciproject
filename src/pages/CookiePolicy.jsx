import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#0A1628] text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">Cookie Policy</h1>
          
          <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-300 mb-4">
                This Cookie Policy explains how FurnitureViz ("we," "our," or "us") uses cookies and similar technologies to recognize you when you visit our website and use our services (collectively, the "Services"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              <p className="text-gray-300">
                By continuing to use our Services, you are agreeing to our use of cookies as described in this Cookie Policy.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
              <p className="text-gray-300 mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p className="text-gray-300 mb-4">
                Cookies set by the website owner (in this case, FurnitureViz) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Why Do We Use Cookies?</h2>
              <p className="text-gray-300 mb-4">
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Services to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Services. Third parties serve cookies through our Services for advertising, analytics, and other purposes.
              </p>
              <p className="text-gray-300 mb-4">
                The specific types of first and third-party cookies served through our Services and the purposes they perform are described below:
              </p>
              
              <h3 className="text-xl font-medium mb-2">3.1 Essential Cookies</h3>
              <p className="text-gray-300 mb-4">
                These cookies are strictly necessary to provide you with services available through our Services and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Services, you cannot refuse them without impacting how our Services function.
              </p>
              
              <h3 className="text-xl font-medium mb-2">3.2 Performance and Functionality Cookies</h3>
              <p className="text-gray-300 mb-4">
                These cookies are used to enhance the performance and functionality of our Services but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
              </p>
              
              <h3 className="text-xl font-medium mb-2">3.3 Analytics and Customization Cookies</h3>
              <p className="text-gray-300 mb-4">
                These cookies collect information that is used either in aggregate form to help us understand how our Services are being used or how effective our marketing campaigns are, or to help us customize our Services for you in order to enhance your experience.
              </p>
              
              <h3 className="text-xl font-medium mb-2">3.4 Advertising Cookies</h3>
              <p className="text-gray-300 mb-4">
                These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
              </p>
              
              <h3 className="text-xl font-medium mb-2">3.5 Social Media Cookies</h3>
              <p className="text-gray-300 mb-4">
                These cookies are used to enable you to share pages and content that you find interesting on our Services through third-party social networking and other websites. These cookies may also be used for advertising purposes.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. How Can You Control Cookies?</h2>
              <p className="text-gray-300 mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner or cookie policy.
              </p>
              <p className="text-gray-300 mb-4">
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Services though your access to some functionality and areas of our Services may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
              </p>
              <p className="text-gray-300 mb-4">
                In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" className="text-blue-400 hover:underline">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" className="text-blue-400 hover:underline">http://www.youronlinechoices.com</a>.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. How Often Will We Update This Cookie Policy?</h2>
              <p className="text-gray-300 mb-4">
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p className="text-gray-300 mb-4">
                The date at the bottom of this Cookie Policy indicates when it was last updated.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Where Can You Get Further Information?</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about our use of cookies or other technologies, please contact us at:
              </p>
              <div className="text-gray-300">
                <p>Email: privacy@furnitureviz.com</p>
                <p>Address: 123 Design Street, Suite 456, Visualization City, VC 12345</p>
                <p>Phone: +1 (555) 123-4567</p>
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

export default CookiePolicyPage;
