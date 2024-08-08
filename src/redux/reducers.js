import { START_QUIZ, NEXT_QUESTION, ANSWER_QUESTION, RESET_QUIZ } from './actions';

const initialState = {
  questions: [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Mark Twain", "Charles Dickens", "William Shakespeare", "Jane Austen"], answer: "William Shakespeare" },
    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" }
  ],
  currentQuestionIndex: 0,
  score: 0,
  timer: 5,
  quizStarted: false,
  quizEnded: false,
  showResult: false, 
};

const quizReducer = (state = initialState, action) => {
  switch(action.type) {
    case START_QUIZ:
      return { ...state, quizStarted: true, quizEnded: false };
      case NEXT_QUESTION:
        const nextIndex = state.currentQuestionIndex + 1;
        if (nextIndex >= state.questions.length) {
          return { ...state, quizEnded: true, showResult: true };
        }
        return { ...state, currentQuestionIndex: nextIndex, timer: 5, showResult: false };
    case ANSWER_QUESTION:
      return {
        ...state,
        score: action.payload.isCorrect ? state.score + 1 : state.score,
        showResult: true,
        correctOption: action.payload.correctOption
      };
    case RESET_QUIZ:
      return initialState;
    default:
      return state;
  }
};


export default quizReducer;
