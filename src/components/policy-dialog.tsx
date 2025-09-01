
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

interface PolicyDialogProps {
  title: string;
  children: React.ReactNode;
}

const PrivacyPolicy = () => (
  <>
    <p className="font-semibold">Effective Date: August 28, 2025</p>
    <p>At FlowType (<a href="https://flow-type.vercel.app/" className="text-primary hover:underline">https://flow-type.vercel.app/</a>), your privacy matters to us. This Privacy Policy explains how we handle information when you use our website.</p>
    
    <h3 className="font-bold mt-4 mb-2">Information We Collect</h3>
    <p><strong>Non-Personal Information:</strong> We may collect basic technical details such as browser type, device type, IP address, and usage statistics to improve our website.</p>
    <p><strong>Cookies:</strong> FlowType may use cookies to enhance your browsing experience and display relevant advertisements.</p>

    <h3 className="font-bold mt-4 mb-2">How We Use Information</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li>To operate and improve the typing test platform.</li>
      <li>To provide relevant advertising content.</li>
      <li>To analyze performance and user engagement.</li>
    </ul>

    <h3 className="font-bold mt-4 mb-2">Third-Party Services</h3>
    <p>FlowType may display ads from third-party providers. These providers may use cookies and similar technologies to serve advertisements. We do not control how third parties use such technologies.</p>

    <h3 className="font-bold mt-4 mb-2">Data Protection</h3>
    <p>We take reasonable precautions to protect the limited information we collect, but no method of transmission or storage is 100% secure.</p>

    <h3 className="font-bold mt-4 mb-2">Updates to This Policy</h3>
    <p>We may update this Privacy Policy from time to time. The updated version will always be available on this page.</p>

    <h3 className="font-bold mt-4 mb-2">Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, you can reach us at: <a href="mailto:support@flowtype.app" className="text-primary hover:underline">support@flowtype.app</a></p>
  </>
);

const TermsOfService = () => (
  <>
    <p className="font-semibold">Effective Date: August 28, 2025</p>
    <p>Welcome to FlowType (<a href="https://flow-type.vercel.app/" className="text-primary hover:underline">https://flow-type.vercel.app/</a>). By using our site, you agree to the following terms.</p>
    
    <h3 className="font-bold mt-4 mb-2">1. Use of Website</h3>
    <p>FlowType is provided for personal, non-commercial use. You agree not to misuse, disrupt, or interfere with the service.</p>

    <h3 className="font-bold mt-4 mb-2">2. Intellectual Property</h3>
    <p>All content, design, and branding on FlowType belong to FlowType unless otherwise stated. You may not copy, distribute, or reproduce any part of the site without prior written consent.</p>

    <h3 className="font-bold mt-4 mb-2">3. Advertising</h3>
    <p>Our site may display third-party advertisements. FlowType is not responsible for the content, products, or services provided by advertisers.</p>

    <h3 className="font-bold mt-4 mb-2">4. Disclaimer</h3>
    <p>FlowType is provided “as is” without warranties of any kind. We do not guarantee uninterrupted service, error-free operation, or complete accuracy of results.</p>

    <h3 className="font-bold mt-4 mb-2">5. Limitation of Liability</h3>
    <p>FlowType is not liable for any direct, indirect, or incidental damages resulting from the use of the site.</p>

    <h3 className="font-bold mt-4 mb-2">6. Changes to Terms</h3>
    <p>We may update these Terms at any time. Continued use of FlowType constitutes your acceptance of the updated Terms.</p>

    <h3 className="font-bold mt-4 mb-2">7. Governing Law</h3>
    <p>These Terms are governed by the laws of your jurisdiction.</p>

    <h3 className="font-bold mt-4 mb-2">Contact</h3>
    <p>For any inquiries regarding these Terms, you can contact us at: <a href="mailto:support@flowtype.app" className="text-primary hover:underline">support@flowtype.app</a></p>
  </>
);


export function PolicyDialog({ title, children }: PolicyDialogProps) {
  const isPrivacyPolicy = title === 'Privacy Policy';
  
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {isPrivacyPolicy ? "Privacy Policy for FlowType" : "Terms and Conditions for FlowType"}
          </DialogDescription>
        </DialogHeader>
        <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto pr-4">
          {isPrivacyPolicy ? <PrivacyPolicy /> : <TermsOfService />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
