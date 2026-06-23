
export type KnowledgeLevel = '1-sinf' | '2-sinf' | '3-sinf' | '4-sinf' | '5-sinf' | '6-sinf' | '7-sinf' | '8-sinf' | '9-sinf' | '10-sinf' | '11-sinf';
export type LearningGoal = 'theoretical' | 'practical' | 'professional';

export interface VocabularyItem {
  term: string;
  definition: string;
}

export interface LessonSection {
  title: string;
  content: string;
  type: 'concept' | 'exercise' | 'summary' | 'example';
}

export interface GeneratedLesson {
  topic: string;
  level: KnowledgeLevel;
  goal: LearningGoal;
  sections: LessonSection[];
  vocabulary: VocabularyItem[];
  sources: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GeneratedQuiz {
  topic: string;
  questions: QuizQuestion[];
}

export interface TopicProgress {
  topic: string;
  level: KnowledgeLevel;
  mastered: boolean;
  lastStudied: string | null;
  testScore: number | null;
  attempts: number;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
  xp: number;
  streak: number;
  currentLevel: KnowledgeLevel;
  topicProgress: TopicProgress[];
  joinDate: string;
}
