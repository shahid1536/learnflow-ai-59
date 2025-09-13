import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import { SkillChart } from "./SkillChart";
import { LessonCard } from "./LessonCard";
import { Trophy, Target, BookOpen, TrendingUp } from "lucide-react";
import { User, Lesson } from "@/data/sampleData";

interface DashboardProps {
  user: User;
  recommendedLesson: Lesson;
  progress: {
    lessons_completed: number;
    total_lessons: number;
    completion_percentage: number;
    skills: Record<string, number>;
    level: number;
  };
  onStartLesson: (lessonId: number) => void;
  onViewAllLessons: () => void;
}

export const Dashboard = ({ 
  user, 
  recommendedLesson, 
  progress, 
  onStartLesson, 
  onViewAllLessons 
}: DashboardProps) => {
  const skills = Object.entries(progress.skills).map(([name, level]) => ({
    name,
    level
  }));

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-hero rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-white/90">Ready to continue your learning journey?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5" />
              <span className="font-medium">Level {progress.level}</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {user.learning_style} learner
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-learning-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-learning-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progress.lessons_completed}</p>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-learning-secondary/10 rounded-lg">
                <Target className="h-6 w-6 text-learning-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{progress.completion_percentage}%</p>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-learning-accent/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-learning-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Object.keys(progress.skills).length}</p>
                <p className="text-sm text-muted-foreground">Skills Tracked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Lesson */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recommended for You</h2>
            <Button variant="outline" onClick={onViewAllLessons}>
              View All Lessons
            </Button>
          </div>
          <LessonCard 
            lesson={recommendedLesson}
            onStart={onStartLesson}
            isRecommended={true}
          />
        </div>

        {/* Skills Chart */}
        <SkillChart skills={skills} />
      </div>

      {/* Overall Progress */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar
            label="Course Completion"
            value={progress.completion_percentage}
            max={100}
            animated={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};