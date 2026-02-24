import { Card } from './ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { currentUser } from '../data/mockData';

export function SkillRadarChart() {
  const skillData = [
    { skill: 'Rust', value: currentUser.skills.rust, fullMark: 100 },
    { skill: 'Anchor', value: currentUser.skills.anchor, fullMark: 100 },
    { skill: 'Frontend', value: currentUser.skills.frontend, fullMark: 100 },
    { skill: 'Security', value: currentUser.skills.security, fullMark: 100 },
    { skill: 'DeFi', value: 55, fullMark: 100 },
    { skill: 'Testing', value: 60, fullMark: 100 },
  ];

  return (
    <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm">
      {/* Gradient Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/5 via-transparent to-[#14F195]/5 opacity-50 pointer-events-none" />
      
      <div className="relative p-6">
        <h3 className="text-lg font-heading mb-6">Skill Distribution</h3>
        
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={skillData}>
            <PolarGrid 
              stroke="hsl(var(--border))" 
              strokeOpacity={0.5}
            />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ 
                fill: 'hsl(var(--muted-foreground))', 
                fontSize: 12,
                fontFamily: 'var(--font-sans)'
              }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              stroke="hsl(var(--border))"
            />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="#9945FF"
              fill="#9945FF"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            {/* Gradient overlay */}
            <defs>
              <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#14F195" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#9945FF" stopOpacity={0.4} />
              </linearGradient>
            </defs>
          </RadarChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {skillData.map((item) => (
            <div key={item.skill} className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2">
              <span className="text-xs text-muted-foreground">{item.skill}</span>
              <span className="text-sm font-heading gradient-solana-text">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}