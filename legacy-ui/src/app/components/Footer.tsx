import { Link } from 'react-router';
import { Github, Twitter, MessageCircle, Book } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Footer() {
  return (
    <footer className="border-t bg-card mt-24">
      <div className="container px-4 md:px-8 py-12 max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#14F195] to-[#9945FF] rounded-lg" />
              <span className="font-bold text-lg">Superteam Academy</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn. Build. Ship on Solana.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/courses" className="hover:text-foreground transition-colors">All Courses</Link></li>
              <li><Link to="/courses" className="hover:text-foreground transition-colors">Fundamentals</Link></li>
              <li><Link to="/courses" className="hover:text-foreground transition-colors">DeFi</Link></li>
              <li><Link to="/courses" className="hover:text-foreground transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
              <li><a href="https://discord.com" className="hover:text-foreground transition-colors">Discord</a></li>
              <li><a href="https://github.com" className="hover:text-foreground transition-colors">GitHub</a></li>
              <li><a href="https://twitter.com" className="hover:text-foreground transition-colors">Twitter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Book className="w-3 h-3" /> Documentation
              </a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              <li><Link to="/settings" className="hover:text-foreground transition-colors">Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Superteam Solana Academy. Open source and community-driven.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">License</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}