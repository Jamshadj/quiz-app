import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { startQuiz } from '../../redux/actions';
import styles from './StartScreen.module.scss';

const StartScreen = () => {
  const dispatch = useDispatch();

  const handleStartClick = () => {
    dispatch(startQuiz());
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h4" component="h2" className={styles.title} gutterBottom>
        Ready for the Quiz?
      </Typography>
      <Typography variant="body1" className={styles.description}>
        Test your knowledge with our fun and engaging quiz. Click the button below to get started!
      </Typography>
      <Button
        className={styles.button}
        onClick={handleStartClick}
      >
        Start Quiz
      </Button>
    </Container>
  );
};

export default StartScreen;
