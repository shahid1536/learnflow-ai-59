import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  question_id: number;
  text: string;
  options: string[];
  answer: string;
}

interface QuizInterfaceProps {
  questions: Question[];
  onComplete: (results: { correct: number; total: number; answers: Array<{ questionId: number; answer: string; correct: boolean }> }) => void;
  lessonTitle: string;
}

export const QuizInterface = ({ questions, onComplete, lessonTitle }: QuizInterfaceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Array<{ questionId: number; answer: string; correct: boolean }>>([]);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === question.answer;
    const newAnswer = {
      questionId: question.question_id,
      answer: selectedAnswer,
      correct: isCorrect
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setShowResult(true);

    setTimeout(() => {
      if (isLastQuestion) {
        const correctCount = updatedAnswers.filter(a => a.correct).length;
        onComplete({
          correct: correctCount,
          total: questions.length,
          answers: updatedAnswers
        });
      } else {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer("");
        setShowResult(false);
      }
    }, 1500);
  };

  const getResultIcon = () => {
    const isCorrect = selectedAnswer === question.answer;
    return isCorrect ? (
      <CheckCircle className="h-6 w-6 text-success" />
    ) : (
      <XCircle className="h-6 w-6 text-destructive" />
    );
  };

  const getResultMessage = () => {
    const isCorrect = selectedAnswer === question.answer;
    return isCorrect ? "Correct!" : `Incorrect. The answer is: ${question.answer}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-learning-primary">{lessonTitle}</h2>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-lg">{question.text}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showResult ? (
            <>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left h-auto p-4 transition-all",
                      selectedAnswer === option && "ring-2 ring-learning-primary bg-accent"
                    )}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <span className="mr-3 flex-shrink-0 h-6 w-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </Button>
                ))}
              </div>
              <Button 
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="w-full"
              >
                Submit Answer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4 py-6">
              <div className="flex items-center justify-center">
                {getResultIcon()}
              </div>
              <p className="text-lg font-medium">{getResultMessage()}</p>
              {!isLastQuestion && (
                <p className="text-muted-foreground">Moving to next question...</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};