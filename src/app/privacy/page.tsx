import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 md:py-12 px-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
            Privacy Policy
          </CardTitle>
          <p className="text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base max-w-none dark:prose-invert text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              Worklance ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you visit our
              platform. Please read this policy carefully.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you register on the
              Platform, express an interest in obtaining information about us or our products and services,
              when you participate in activities on the Platform, or otherwise when you contact us.
            </p>
            <p>The personal information we collect may include:</p>
            <ul className="list-disc list-inside pl-4">
              <li>Personal Identification Information: Name, email address, phone number, university affiliation.</li>
              <li>Profile Information: Skills, portfolio items, education, work experience, profile picture.</li>
              <li>Payment Data: Information necessary to process payments (though often handled by third-party payment processors).</li>
              <li>Communications: Messages exchanged with other users or with us.</li>
              <li>Usage Data: Information about how you use our Platform, such as IP address, browser type, pages visited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p>We use the information we collect or receive to:</p>
            <ul className="list-disc list-inside pl-4">
              <li>Create and manage your account.</li>
              <li>Facilitate the connection between Students and Clients.</li>
              <li>Process transactions and send you related information.</li>
              <li>Personalize and improve your experience on the Platform.</li>
              <li>Communicate with you, including responding to your inquiries and providing customer support.</li>
              <li>Send you administrative information, such as updates to our terms, conditions, and policies.</li>
              <li>For marketing and promotional purposes, with your consent where required.</li>
              <li>Monitor and analyze usage and trends to improve our Platform.</li>
              <li>Prevent fraudulent activity and ensure the security of our Platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Disclosure of Your Information</h2>
            <p>We may share your information in the following situations:</p>
            <ul className="list-disc list-inside pl-4">
              <li>With Other Users: Your profile information (name, skills, portfolio, etc.) will be visible to other users to facilitate connections.</li>
              <li>With Service Providers: We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf.</li>
              <li>For Legal Reasons: We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
              <li>Business Transfers: In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Data Security</h2>
            <p>
              We implement administrative, technical, and physical security measures designed to protect your
              personal information. However, no electronic transmission over the Internet or information storage
              technology can be guaranteed to be 100% secure.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Your Data Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such
              as the right to access, correct, delete, or restrict its use. You can usually manage your account
              information through your profile settings or by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies and similar tracking technologies to collect and store your information. You can
              control the use of cookies at the individual browser level.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Children's Privacy</h2>
            <p>
              Our Platform is not intended for use by individuals under the age of 16 (or other age as required by local law).
              We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by an
              updated "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              <br />
              Email: <a href="mailto:privacy@Worklance.com" className="text-primary hover:underline">privacy@Worklance.com</a>
              <br />
              Address: 123 University Drive, Innovation Hub, Anytown, ST 54321
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
