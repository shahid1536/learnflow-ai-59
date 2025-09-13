import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { LessonBrowser } from "@/components/LessonBrowser";
import { QuizInterface } from "@/components/QuizInterface";
import { QuizResults } from "@/components/QuizResults";
import { sampleUser, sampleLessons, getRecommendedLesson, getUserProgress } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

type AppState = "dashboard" | "lessons" | "quiz" | "results";

const Index = () => {
  const { toast } = useToast();
  const [appState, setAppState] = useState<AppState>("dashboard");
  const [currentUser, setCurrentUser] = useState(sampleUser);
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
  const [quizResults, setQuizResults] = useState<any>(null);

  const progress = getUserProgress(currentUser);
  const recommendedLesson = getRecommendedLesson(currentUser);

  const handleStartLesson = (lessonId: number) => {
    setCurrentLessonId(lessonId);
    setAppState("quiz");
  };

  const handleQuizComplete = (results: any) => {
    setQuizResults(results);
    
    // Update user progress if passed
    if (results.correct / results.total >= 0.7) {
      const lessonKey = `lesson${currentLessonId}`;
      if (!currentUser.completed_lessons.includes(lessonKey)) {
        setCurrentUser(prev => ({
          ...prev,
          completed_lessons: [...prev.completed_lessons, lessonKey],
          knowledge_level: prev.knowledge_level + 1
        }));
        
        toast({
          title: "Lesson Completed!",
          description: "Great job! You've mastered this lesson.",
        });
      }
    }
    
    setAppState("results");
  };

  const handleRetryQuiz = () => {
    setAppState("quiz");
  };

  const handleBackToDashboard = () => {
    setAppState("dashboard");
    setCurrentLessonId(null);
    setQuizResults(null);
  };

  const handleViewAllLessons = () => {
    setAppState("lessons");
  };

  const currentLesson = currentLessonId ? Object.values(sampleLessons).find(l => l.lesson_id === currentLessonId) : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {appState === "dashboard" && (
          <Dashboard
            user={currentUser}
            recommendedLesson={recommendedLesson}
            progress={progress}
            onStartLesson={handleStartLesson}
            onViewAllLessons={handleViewAllLessons}
          />
        )}

        {appState === "lessons" && (
          <LessonBrowser
            lessons={sampleLessons}
            completedLessons={currentUser.completed_lessons}
            onStartLesson={handleStartLesson}
            onBack={handleBackToDashboard}
          />
        )}

        {appState === "quiz" && currentLesson && (
          <QuizInterface
            questions={currentLesson.questions}
            lessonTitle={currentLesson.topic}
            onComplete={handleQuizComplete}
          />
        )}

        {appState === "results" && quizResults && currentLesson && (
          <QuizResults
            results={quizResults}
            lessonTitle={currentLesson.topic}
            onRetry={handleRetryQuiz}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
