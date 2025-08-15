import { PolicyDialog } from './policy-dialog';

export function Footer() {
  return (
    <footer className="bg-card/70 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-16 text-sm text-muted-foreground gap-4">
          <div>© 2025 TypeFlow. All rights reserved.</div>
          <div className="flex gap-4">
            <PolicyDialog title="Privacy Policy">
              <button className="hover:text-primary transition-colors">Privacy Policy</button>
            </PolicyDialog>
            <PolicyDialog title="Terms & Conditions">
              <button className="hover:text-primary transition-colors">Terms & Conditions</button>
            </PolicyDialog>
          </div>
        </div>
      </div>
    </footer>
  );
}
