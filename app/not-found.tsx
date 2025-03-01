import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <h2 className="text-4xl font-bold mb-2">404</h2>
      <p className="text-xl mb-1">Page Not Found</p>
      <p className="text-muted-foreground mb-6">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button>Return to Homepage</Button>
      </Link>
    </div>
  );
}
