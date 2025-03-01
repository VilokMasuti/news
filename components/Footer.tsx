import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-12 mt-12 bg-card text-card-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-xl tracking-tight">
              <span className="text-primary">News</span>
              <span className="text-muted-foreground">Pulse</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Delivering the latest news and insights from around the world.
              Stay informed with our comprehensive coverage.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/category/general"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Top Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/category/business"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="/category/technology"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/category/entertainment"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Entertainment
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">More Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/category/sports"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/category/science"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Science
                </Link>
              </li>
              <li>
                <Link
                  href="/category/health"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Health
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} NewsPulse. All rights reserved. Powered by{' '}
            <a
              href="https://newsapi.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              NewsAPI.org
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
