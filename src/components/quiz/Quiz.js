import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Container } from '@mui/material';
import Question from '../question/Question';
import StartScreen from '../startScreen/StartScreen';
import styles from './Quiz.module.scss';
import Result from '../Result/Result';

const Quiz = () => {
  const quizStarted = useSelector(state => state.quiz.quizStarted);
  const quizEnded = useSelector(state => state.quiz.quizEnded);

  return (
    <Container className={styles.container}>
      <Card className={styles.card} variant="outlined">
        <CardContent>
          {quizEnded ? (
            <Result /> 
          ) : quizStarted ? (
            <Question /> 
          ) : (
            <StartScreen /> 
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Quiz;
