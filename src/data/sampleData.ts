export interface User {
  user_id: number;
  knowledge_level: number;
  completed_lessons: string[];
  skill_proficiency: Record<string, number>;
  learning_style: string;
  name: string;
}

export interface Question {
  question_id: number;
  text: string;
  options: string[];
  answer: string;
}

export interface Lesson {
  lesson_id: number;
  topic: string;
  difficulty: number;
  content_type: string;
  questions: Question[];
}

export const sampleUser: User = {
  user_id: 1,
  knowledge_level: 3,
  completed_lessons: [],
  skill_proficiency: {
    python: 0.7,
    "data_structures": 0.3,
    algorithms: 0.5,
    "web_development": 0.2
  },
  learning_style: "visual",
  name: "Alex Johnson"
};

export const sampleLessons: Record<string, Lesson> = {
  "lesson1": {
    lesson_id: 1,
    topic: "Introduction to Python",
    difficulty: 1,
    content_type: "video",
    questions: [
      {
        question_id: 1,
        text: "What is Python?",
        options: ["A programming language", "A reptile", "A fruit", "A web browser"],
        answer: "A programming language"
      },
      {
        question_id: 2,
        text: "Which of the following is a Python keyword?",
        options: ["variable", "def", "method", "function"],
        answer: "def"
      }
    ]
  },
  "lesson2": {
    lesson_id: 2,
    topic: "Data Structures: Lists",
    difficulty: 2,
    content_type: "text",
    questions: [
      {
        question_id: 3,
        text: "What is a list in Python?",
        options: ["A sequence of elements", "A collection of key-value pairs", "A single element", "A data type for numbers"],
        answer: "A sequence of elements"
      },
      {
        question_id: 4,
        text: "How do you create an empty list in Python?",
        options: ["list()", "[]", "Both A and B", "None of the above"],
        answer: "Both A and B"
      }
    ]
  },
  "lesson3": {
    lesson_id: 3,
    topic: "Algorithms: Sorting",
    difficulty: 3,
    content_type: "interactive",
    questions: [
      {
        question_id: 5,
        text: "Which sorting algorithm has the best average time complexity?",
        options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
        answer: "Quick Sort"
      },
      {
        question_id: 6,
        text: "What is the time complexity of Bubble Sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
        answer: "O(n²)"
      }
    ]
  },
  "lesson4": {
    lesson_id: 4,
    topic: "Web Development Basics",
    difficulty: 1,
    content_type: "text",
    questions: [
      {
        question_id: 7,
        text: "What does HTML stand for?",
        options: ["HyperText Markup Language", "High Technology Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        answer: "HyperText Markup Language"
      }
    ]
  }
};

export const getRecommendedLesson = (user: User): Lesson => {
  // Find skill with lowest proficiency
  const lowestSkill = Object.entries(user.skill_proficiency)
    .sort(([,a], [,b]) => a - b)[0];
  
  // Find lesson matching the skill
  const matchingLesson = Object.values(sampleLessons).find(lesson => 
    lesson.topic.toLowerCase().includes(lowestSkill[0].replace('_', ' '))
  );
  
  return matchingLesson || sampleLessons.lesson1;
};

export const getUserProgress = (user: User) => {
  const totalLessons = Object.keys(sampleLessons).length;
  const completedCount = user.completed_lessons.length;
  
  return {
    lessons_completed: completedCount,
    total_lessons: totalLessons,
    completion_percentage: Math.round((completedCount / totalLessons) * 100),
    skills: user.skill_proficiency,
    level: user.knowledge_level
  };
};