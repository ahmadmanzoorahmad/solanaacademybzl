'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CourseCard } from '@/components/CourseCard';
import { Search } from 'lucide-react';
import { courses } from '@/data/mock-data';

const categories = ['All', 'Fundamentals', 'DeFi', 'Development', 'Security', 'NFT', 'Programming'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function CourseCatalogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All' || c.category === category;
    const matchDifficulty = difficulty === 'All' || c.difficulty === difficulty;
    return matchSearch && matchCategory && matchDifficulty;
  });

  return (
    <div className="container px-4 md:px-8 py-12 max-w-[1320px] mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Course Catalog</h1>
        <p className="text-lg text-muted-foreground">Explore our comprehensive Solana development courses</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button key={cat} variant={category === cat ? 'default' : 'outline'} size="sm" onClick={() => setCategory(cat)}>{cat}</Button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {difficulties.map((diff) => (
          <Badge key={diff} variant={difficulty === diff ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => setDifficulty(diff)}>{diff}</Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No courses found matching your criteria</p>
        </Card>
      )}
    </div>
  );
}
