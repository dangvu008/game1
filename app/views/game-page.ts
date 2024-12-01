import { EventData, Page } from '@nativescript/core';
import { GameService } from '../shared/services/game.service';

let gameService: GameService;

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    gameService = new GameService();
    page.bindingContext = gameService;
    gameService.startGame();
}

export function onAnswerTap(args: EventData) {
    const button = args.object as any;
    const selectedNumber = parseInt(button.text);
    const problem = gameService.get('gameState').currentProblem;
    
    const userAnswer = evaluateUserAnswer(problem.leftNumber, selectedNumber, problem.operator);
    const correct = gameService.checkAnswer(userAnswer);
    
    // Visual feedback
    button.className = correct ? 'bg-green-500' : 'bg-red-500';
    setTimeout(() => {
        button.className = 'bg-blue-500';
    }, 300);
}

export function onPowerUpTap(args: EventData) {
    const button = args.object as any;
    const powerUpType = button.text;
    
    // Implement power-up logic here
    switch (powerUpType) {
        case '🕒 +5s':
            // Add 5 seconds
            break;
        case '❤️ +1':
            // Add extra life
            break;
        case '💫 Skip':
            // Skip current problem
            break;
    }
}