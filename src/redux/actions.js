export const START_QUIZ = 'START_QUIZ';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const RESET_QUIZ = 'RESET_QUIZ';

export const startQuiz = () => ({ type: START_QUIZ });
export const nextQuestion = () => ({ type: NEXT_QUESTION });
export const answerQuestion = (isCorrect) => ({ type: ANSWER_QUESTION, payload: isCorrect });
export const resetQuiz = () => ({ type: RESET_QUIZ });
