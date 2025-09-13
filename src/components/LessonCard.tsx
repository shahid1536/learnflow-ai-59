import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, FileText, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Lesson {
  lesson_id: number;
  topic: string;
  difficulty: number;
  content_type: string;
  questions: Array<{
    question_id: number;
    text: string;
    options: string[];
    answer: string;
  }>;
  completed?: boolean;
}

interface LessonCardProps {
  lesson: Lesson;
  onStart: (lessonId: number) => void;
  isRecommended?: boolean;
}

const getDifficultyColor = (difficulty: number) => {
  if (difficulty === 1) return "bg-success text-success-foreground";
  if (difficulty === 2) return "bg-warning text-warning-foreground";
  return "bg-destructive text-destructive-foreground";
};

const getDifficultyLabel = (difficulty: number) => {
  if (difficulty === 1) return "Beginner";
  if (difficulty === 2) return "Intermediate";
  return "Advanced";
};

const getContentIcon = (contentType: string) => {
  if (contentType === "video") return <Play className="h-4 w-4" />;
  if (contentType === "text") return <FileText className="h-4 w-4" />;
  return <BookOpen className="h-4 w-4" />;
};

export const LessonCard = ({ lesson, onStart, isRecommended = false }: LessonCardProps) => {
  return (
    <Card className={cn(
      "shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1",
      isRecommended && "ring-2 ring-learning-primary ring-opacity-50",
      lesson.completed && "opacity-75"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg leading-tight">{lesson.topic}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor(lesson.difficulty)}>
                {getDifficultyLabel(lesson.difficulty)}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {getContentIcon(lesson.content_type)}
                <span className="capitalize">{lesson.content_type}</span>
              </div>
            </div>
          </div>
          {lesson.completed && (
            <CheckCircle className="h-5 w-5 text-success" />
          )}
          {isRecommended && !lesson.completed && (
            <Badge variant="secondary" className="bg-learning-accent text-white">
              Recommended
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {lesson.questions.length} question{lesson.questions.length !== 1 ? 's' : ''} included
          </p>
          <Button 
            onClick={() => onStart(lesson.lesson_id)}
            className="w-full"
            variant={lesson.completed ? "outline" : "default"}
          >
            {lesson.completed ? "Review Lesson" : "Start Lesson"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};