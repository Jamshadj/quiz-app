import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz } from '../../redux/actions';
import { Button, Typography, Container, Paper, Box, Fade } from '@mui/material';
import styles from './Result.module.scss';

const Result = () => {
  const dispatch = useDispatch();
  const score = useSelector(state => state.quiz.score);
  const quizEnded = useSelector(state => state.quiz.quizEnded);

  if (!quizEnded) return null;

  return (
    <Container className={styles.container}>
      <Paper className={styles.paper} elevation={6}>
        <Box className={styles.iconContainer}>
          <Fade in={quizEnded} timeout={1000}>
            <Typography variant="h1" component="span" className={styles.icon}>
              🎉
            </Typography>
          </Fade>
        </Box>
        <Typography variant="h4" component="h2" className={styles.title}>
          Well Done!
        </Typography>
        <Typography variant="h5" component="h3" className={styles.score}>
          Your Final Score: {score}
        </Typography>
        <Box className={styles.buttonContainer}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => dispatch(resetQuiz())}
            className={styles.button}
          >
            Play Again
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Result;
