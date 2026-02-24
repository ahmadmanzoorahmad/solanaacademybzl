import { Outlet } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '../components/ui/sonner';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DevModeIndicator } from '../components/DevModeIndicator';

export function RootLayout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
        <DevModeIndicator />
      </div>
    </ThemeProvider>
  );
}