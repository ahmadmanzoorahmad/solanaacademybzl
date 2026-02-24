import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="container px-4 md:px-8 py-24 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-9xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
          404
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Page Not Found</h1>
          <p className="text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/courses">
            <Button size="lg" variant="outline">
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
