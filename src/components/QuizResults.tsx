import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy, Target, RotateCcw, Home } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface QuizResultsProps {
  results: {
    correct: number;
    total: number;
    answers: Array<{ questionId: number; answer: string; correct: boolean }>;
  };
  lessonTitle: string;
  onRetry: () => void;
  onBackToDashboard: () => void;
  onNextLesson?: () => void;
}

export const QuizResults = ({ 
  results, 
  lessonTitle, 
  onRetry, 
  onBackToDashboard, 
  onNextLesson 
}: QuizResultsProps) => {
  const percentage = Math.round((results.correct / results.total) * 100);
  const passed = percentage >= 70;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excellent work! You've mastered this topic.";
    if (percentage >= 80) return "Great job! You have a solid understanding.";
    if (percentage >= 70) return "Good work! You've passed this lesson.";
    if (percentage >= 60) return "Almost there! Consider reviewing the material.";
    return "Keep practicing! Review the lesson and try again.";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          {passed ? (
            <div className="p-4 bg-success/10 rounded-full">
              <Trophy className="h-12 w-12 text-success" />
            </div>
          ) : (
            <div className="p-4 bg-destructive/10 rounded-full">
              <Target className="h-12 w-12 text-destructive" />
            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-bold">
          {passed ? "Congratulations!" : "Keep Trying!"}
        </h1>
        
        <p className="text-muted-foreground">
          You completed: {lessonTitle}
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-center">Your Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-learning-primary">
              {percentage}%
            </div>
            <p className={`text-lg font-medium ${getPerformanceColor()}`}>
              {getPerformanceMessage()}
            </p>
          </div>

          <ProgressBar
            label="Score"
            value={percentage}
            max={100}
            animated={true}
          />

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="font-medium">Correct</span>
              </div>
              <p className="text-2xl font-bold text-success">{results.correct}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <XCircle className="h-5 w-5 text-destructive" />
                <span className="font-medium">Incorrect</span>
              </div>
              <p className="text-2xl font-bold text-destructive">{results.total - results.correct}</p>
            </div>
          </div>

          {passed && (
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <Badge className="bg-success text-success-foreground">
                Lesson Completed!
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                This lesson has been added to your completed lessons.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onRetry} className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
        
        <Button onClick={onBackToDashboard} className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Back to Dashboard
        </Button>
        
        {onNextLesson && passed && (
          <Button variant="secondary" onClick={onNextLesson} className="flex items-center gap-2">
            Next Lesson
          </Button>
        )}
      </div>
    </div>
  );
};