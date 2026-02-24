import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Code, Award, Globe, Users, Zap, BookOpen } from 'lucide-react';
import { courses } from '../data/mockData';

export function LandingPage() {
  const features = [
    {
      icon: Code,
      title: 'Learn by Building',
      description: 'Hands-on projects and real dApp development from day one',
    },
    {
      icon: Award,
      title: 'On-Chain Credentials',
      description: 'Earn verifiable NFT certificates stored on Solana',
    },
    {
      icon: Zap,
      title: 'XP & Achievements',
      description: 'Level up your skills with gamified learning progression',
    },
    {
      icon: Globe,
      title: 'Multilingual',
      description: 'Learn in English, Portuguese, or Spanish',
    },
    {
      icon: Users,
      title: 'Community-Driven',
      description: 'Join thousands of developers building on Solana',
    },
    {
      icon: BookOpen,
      title: 'Open Source',
      description: 'Free forever, built by the community for the community',
    },
  ];

  const learningPaths = [
    { name: 'Solana Fundamentals', icon: '🚀', courses: 3, color: 'from-green-400 to-blue-500' },
    { name: 'DeFi Developer', icon: '💰', courses: 5, color: 'from-purple-400 to-pink-500' },
    { name: 'Security & Audits', icon: '🔒', courses: 4, color: 'from-red-400 to-orange-500' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/20 via-transparent to-[#14F195]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="container relative px-4 md:px-8 py-24 md:py-32 max-w-[1320px] mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="mb-4 bg-gradient-to-r from-[#14F195] to-[#9945FF] text-white border-0">
              Powered by Superteam
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              The Ultimate{' '}
              <span className="bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                Solana Learning
              </span>{' '}
              Platform
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Codecademy-style learning. On-chain credentials. Built for crypto natives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/courses">
                <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90">
                  Start Learning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Explore Courses
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                  12K+
                </div>
                <div className="text-sm text-muted-foreground">Active Learners</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                  50+
                </div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                  2.5M+
                </div>
                <div className="text-sm text-muted-foreground">XP Earned</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-sm text-muted-foreground">Free</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-8 max-w-[1320px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Superteam Academy?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The most comprehensive and engaging way to learn Solana development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 hover:border-primary transition-all">
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24">
        <div className="container px-4 md:px-8 max-w-[1320px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured learning paths designed to take you from beginner to expert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <Link key={path.name} to="/courses">
                <Card className="p-8 hover:border-primary transition-all group cursor-pointer h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                    {path.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {path.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{path.courses} courses</p>
                  <div className="flex items-center text-primary font-medium">
                    Start Learning
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-8 max-w-[1320px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
              <p className="text-lg text-muted-foreground">Start your Solana journey today</p>
            </div>
            <Link to="/courses">
              <Button variant="outline">
                View All Courses
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => {
              const difficultyColor = {
                Beginner: 'bg-[#22C55E] text-white',
                Intermediate: 'bg-[#FACC15] text-black',
                Advanced: 'bg-[#EF4444] text-white',
              };

              return (
                <Link key={course.id} to={`/courses/${course.slug}`}>
                  <Card className="overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group cursor-pointer h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className={difficultyColor[course.difficulty]}>
                          {course.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{course.duration}</span>
                        <Badge variant="secondary">{course.xpReward} XP</Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container px-4 md:px-8 max-w-[1320px] mx-auto">
          <Card className="relative overflow-hidden p-12 md:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF] to-[#14F195] opacity-10" />
            <div className="relative text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Build on Solana?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of developers learning to build the future of decentralized applications
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/courses">
                  <Button size="lg" className="bg-gradient-to-r from-[#14F195] to-[#9945FF]">
                    Start Learning for Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
