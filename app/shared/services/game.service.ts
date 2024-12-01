import { Observable } from '@nativescript/core';
import { GameState, MathProblem } from '../models/game.model';

export class GameService extends Observable {
  private gameState: GameState;
  private readonly GAME_DURATION = 60; // seconds
  private timer: any;

  constructor() {
    super();
    this.gameState = {
      score: 0,
      currentProblem: this.generateProblem(),
      timeLeft: this.GAME_DURATION,
      lives: 3,
      level: 1
    };
  }

  private generateProblem(): MathProblem {
    const operators = ['<', '>', '='];
    const operator = operators[Math.floor(Math.random() * operators.length)] as '<' | '>' | '=';
    const leftNumber = Math.floor(Math.random() * 20) + 1;
    const rightNumber = Math.floor(Math.random() * 20) + 1;
    
    return {
      leftNumber,
      rightNumber,
      operator,
      correctAnswer: this.evaluateAnswer(leftNumber, rightNumber, operator),
      options: this.generateOptions(leftNumber, rightNumber)
    };
  }

  private evaluateAnswer(left: number, right: number, operator: string): boolean {
    switch (operator) {
      case '<': return left < right;
      case '>': return left > right;
      case '=': return left === right;
      default: return false;
    }
  }

  private generateOptions(left: number, right: number): number[] {
    const options = [left - 1, left, left + 1, right - 1, right, right + 1];
    return [...new Set(options)]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  public checkAnswer(userAnswer: boolean): boolean {
    const correct = userAnswer === this.gameState.currentProblem.correctAnswer;
    if (correct) {
      this.gameState.score += 10 * this.gameState.level;
    } else {
      this.gameState.lives--;
    }
    this.gameState.currentProblem = this.generateProblem();
    this.notifyPropertyChange('gameState', this.gameState);
    return correct;
  }

  public startGame() {
    this.timer = setInterval(() => {
      this.gameState.timeLeft--;
      if (this.gameState.timeLeft <= 0 || this.gameState.lives <= 0) {
        this.endGame();
      }
      this.notifyPropertyChange('gameState', this.gameState);
    }, 1000);
  }

  private endGame() {
    clearInterval(this.timer);
    // Implement game end logic here
  }
}