import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LessonCard, Lesson } from "./LessonCard";
import { Search, Filter, ArrowLeft } from "lucide-react";

interface LessonBrowserProps {
  lessons: Record<string, Lesson>;
  completedLessons: string[];
  onStartLesson: (lessonId: number) => void;
  onBack: () => void;
}

export const LessonBrowser = ({ lessons, completedLessons, onStartLesson, onBack }: LessonBrowserProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);

  const lessonsArray = Object.entries(lessons).map(([key, lesson]) => ({
    ...lesson,
    completed: completedLessons.includes(key)
  }));

  const filteredLessons = lessonsArray.filter(lesson => {
    const matchesSearch = lesson.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === null || lesson.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const difficultyStats = [1, 2, 3].map(level => ({
    level,
    count: lessonsArray.filter(l => l.difficulty === level).length,
    label: level === 1 ? "Beginner" : level === 2 ? "Intermediate" : "Advanced"
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-learning-primary">All Lessons</h1>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Lessons
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Difficulty:</span>
            </div>
            <Button
              variant={difficultyFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setDifficultyFilter(null)}
            >
              All
            </Button>
            {difficultyStats.map(({ level, count, label }) => (
              <Button
                key={level}
                variant={difficultyFilter === level ? "default" : "outline"}
                size="sm"
                onClick={() => setDifficultyFilter(level)}
              >
                {label} ({count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-learning-primary">{lessonsArray.length}</p>
            <p className="text-sm text-muted-foreground">Total Lessons</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{completedLessons.length}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{lessonsArray.length - completedLessons.length}</p>
            <p className="text-sm text-muted-foreground">Remaining</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-learning-accent">
              {Math.round((completedLessons.length / lessonsArray.length) * 100)}%
            </p>
            <p className="text-sm text-muted-foreground">Progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <LessonCard
            key={lesson.lesson_id}
            lesson={lesson}
            onStart={onStartLesson}
          />
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No lessons found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setDifficultyFilter(null);
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};