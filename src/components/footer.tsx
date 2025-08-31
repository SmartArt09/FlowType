import Link from 'next/link';
import { PolicyDialog } from './policy-dialog';

export function Footer() {
  return (
    <footer className="bg-card/70 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between py-4 text-sm text-muted-foreground gap-4">
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <div>© 2025 FlowType. All rights reserved.</div>
            <div className="flex gap-4">
              <PolicyDialog title="Privacy Policy">
                <button className="hover:text-primary transition-colors">Privacy Policy</button>
              </PolicyDialog>
              <PolicyDialog title="Terms & Conditions">
                <button className="hover:text-primary transition-colors">Terms & Conditions</button>
              </PolicyDialog>
            </div>
          </div>
          <div className="text-center mt-2">
            Found an issue? Feel free to{' '}
            <Link
              href="https://github.com/SmartArt09/FlowType/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              open an issue
            </Link>{' '}
            or submit a pull request on GitHub.
          </div>
        </div>
      </div>
    </footer>
  );
}
