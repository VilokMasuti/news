/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNews } from '@/context/news-context';
import { useTheme } from '@/context/theme-context';
import type { NewsCategory } from '@/types';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const categories: NewsCategory[] = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { setSearchQuery } = useNews();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
      setIsMenuOpen(false);
    }
  };

  const handleCategoryClick = (category: NewsCategory) => {
    router.push(`/category/${category}`);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center font-bold text-xl tracking-tight transition-transform hover:scale-[1.02]"
          >
            <span className="text-primary">News</span>
            <span className="text-muted-foreground">Pulse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`nav-link ${
                pathname === '/'
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              Home
            </Link>
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category}
                href={`/category/${category}`}
                className={`nav-link capitalize ${
                  pathname === `/category/${category}`
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {category}
              </Link>
            ))}
          </nav>

          {/* Right Section (Search & Theme Toggle) */}
          <div className="flex items-center">
            <div className="hidden md:block mr-2">
              <form
                onSubmit={handleSearch}
                className="relative transition-all duration-300"
              >
                <div
                  className={`flex items-center rounded-lg border transition-all duration-300
                  bg-background/50 focus-within:border-primary focus-within:shadow-sm`}
                >
                  <Input
                    type="text"
                    placeholder="Search news..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="p-2 mx-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              variant="ghost"
              size="icon"
              aria-label={`Switch to ${
                theme === 'light' ? 'dark' : 'light'
              } mode`}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors md:hidden"
              variant="ghost"
              size="icon"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen
            ? 'max-h-80 opacity-100 border-b bg-background/95 backdrop-blur-md'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 space-y-3">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search news..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <nav className="flex  flex-col space-y-2">
            <Link
              href="/"
              className={`nav-link ${
                pathname === '/' ? 'bg-secondary text-foreground' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category}`}
                className={`nav-link capitalize ${
                  pathname === `/category/${category}`
                    ? 'bg-secondary text-foreground'
                    : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
