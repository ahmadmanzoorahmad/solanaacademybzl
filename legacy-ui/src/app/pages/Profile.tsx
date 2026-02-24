import { useParams, Link } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { AchievementBadge } from '../components/AchievementBadge';
import { Twitter, Github, Settings, Award, ExternalLink, CheckCircle } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { currentUser, achievements, certificates } from '../data/mockData';

export function Profile() {
  const { username } = useParams();
  const isOwnProfile = !username || username === currentUser.username;
  const user = currentUser; // In a real app, fetch user by username

  const skillData = [
    { skill: 'Rust', value: user.skills.rust },
    { skill: 'Anchor', value: user.skills.anchor },
    { skill: 'Frontend', value: user.skills.frontend },
    { skill: 'Security', value: user.skills.security },
  ];

  const earnedAchievements = achievements.filter((a) => a.earned);

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[1320px] mx-auto">
      {/* Profile Header */}
      <Card className="p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
                <p className="text-muted-foreground mb-2">@{user.username}</p>
                <p className="text-muted-foreground max-w-2xl">{user.bio}</p>
              </div>
              
              {isOwnProfile && (
                <Link to="/settings">
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {user.socialLinks.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </Button>
              )}
              {user.socialLinks.github && (
                <Button variant="outline" size="sm" asChild>
                  <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
                  {user.xp.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
              <div>
                <div className="text-2xl font-bold">Level {user.level}</div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold">#{user.rank}</div>
                <div className="text-sm text-muted-foreground">Global Rank</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{user.streak} days</div>
                <div className="text-sm text-muted-foreground">Streak</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Skills Radar Chart */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Radar
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList>
          <TabsTrigger value="achievements">
            <Award className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="certificates">
            <CheckCircle className="w-4 h-4 mr-2" />
            Certificates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Achievements</h2>
              <Badge variant="secondary">
                {earnedAchievements.length} / {achievements.length} Unlocked
              </Badge>
            </div>

            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <AchievementBadge key={achievement.id} achievement={achievement} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No achievements yet</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">On-Chain Certificates</h2>
              <Badge variant="secondary">{certificates.length} Earned</Badge>
            </div>

            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="overflow-hidden hover:border-primary transition-all">
                    <div className="relative h-48 bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <Award className="w-16 h-16 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">{cert.courseName}</h3>
                        <p className="text-white/80">Certificate of Completion</p>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Awarded to</p>
                        <p className="font-semibold">{cert.recipientName}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Completion Date</p>
                        <p className="font-semibold">
                          {new Date(cert.completionDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/certificates/${cert.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Certificate
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <a
                            href={`https://explorer.solana.com/address/${cert.nftMintAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No certificates earned yet</p>
                <Link to="/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
