import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 md:py-12 px-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
            Terms of Service
          </CardTitle>
          <p className="text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base max-w-none dark:prose-invert text-muted-foreground space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              Welcome to Worklance ("Platform", "we", "us", or "our"). By accessing or using our Platform,
              you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not
              agree to these Terms, please do not use our Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Platform Services</h2>
            <p>
              Worklance provides an online marketplace connecting university students ("Students", "Freelancers")
              with local businesses and individuals ("Clients") seeking to procure freelance services ("Jobs", "Projects").
              We facilitate profiles, job postings, applications, communication, and payment processing (features may vary).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. User Accounts</h2>
            <p>
              To use certain features, you must register for an account. You agree to provide accurate, current,
              and complete information during registration and to update such information to keep it accurate.
              You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. User Conduct</h2>
            <p>
              You agree not to use the Platform for any unlawful purpose or in any way that interrupts, damages,
              or impairs the service. You are responsible for all content you post and interactions you have with
              other users. Misrepresentation, harassment, or fraudulent activity is strictly prohibited.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Job Postings and Applications</h2>
            <p>
              Clients are responsible for the accuracy and legality of their job postings. Students are responsible
              for the accuracy of their profiles and proposals. Worklance does not guarantee employment or project
              completion and is not responsible for the quality of services provided by Students or payment fulfillment by Clients,
              though we may offer dispute resolution mechanisms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Fees and Payments</h2>
            <p>
              Worklance may charge fees for certain services (e.g., commission on completed jobs, premium features).
              Any applicable fees will be clearly disclosed. Users agree to pay all fees associated with their use of
              such services. Payment processing may be handled by third-party providers.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Intellectual Property</h2>
            <p>
              The Platform and its original content (excluding User Content), features, and functionality are and will
              remain the exclusive property of Worklance and its licensors. By posting content, you grant Worklance
              a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection
              with operating and promoting the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Disclaimer of Warranties</h2>
            <p>
              The Platform is provided "as is" and "as available" without any warranties of any kind, express or implied.
              We do not warrant that the Platform will be error-free, uninterrupted, secure, or that defects will be corrected.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Limitation of Liability</h2>
            <p>
              In no event shall Worklance be liable for any indirect, incidental, special, consequential, or punitive
              damages arising out of or related to your use of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the
              new Terms on this page. Your continued use of the Platform after such changes constitutes your acceptance
              of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:legal@Worklance.com" className="text-primary hover:underline">legal@Worklance.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
