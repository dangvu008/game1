export interface GameState {
  score: number;
  currentProblem: MathProblem;
  timeLeft: number;
  lives: number;
  level: number;
}

export interface MathProblem {
  leftNumber: number;
  rightNumber: number;
  operator: '<' | '>' | '=';
  correctAnswer: boolean;
  options: number[];
}

export interface PlayerStats {
  totalGames: number;
  wins: number;
  currentStreak: number;
  highestStreak: number;
  rank: string;
  points: number;
}