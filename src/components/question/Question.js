import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Box, Paper, Button, Fade } from "@mui/material";
import { answerQuestion, nextQuestion } from "../../redux/actions";
import Timer from "../timer/Timer";
import styles from "./Question.module.scss";

const Question = () => {
  const dispatch = useDispatch();
  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );
  const questions = useSelector((state) => state.quiz.questions);
  const quizEnded = useSelector((state) => state.quiz.quizEnded);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timerReset, setTimerReset] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackEmoji, setFeedbackEmoji] = useState("");
  const hasTimeoutBeenHandled = useRef(false);

  const question = questions[currentQuestionIndex];

  const handleTimeout = () => {
    if (!selectedOption && !hasTimeoutBeenHandled.current) {
      hasTimeoutBeenHandled.current = true;
      setSelectedOption(question.answer);
      dispatch(
        answerQuestion({ isCorrect: false, correctOption: question.answer })
      );
      setFeedbackMessage(
        `Time’s up! The correct answer was: ${question.answer}`
      );
      setFeedbackEmoji("⏰");
      setShowNextButton(true);

      setTimeout(() => {
        dispatch(nextQuestion());
        setSelectedOption(null);
        setTimerReset(false);
        setShowNextButton(false);
        setFeedbackMessage("");
        setFeedbackEmoji("");
      }, 5000);
    }
  };

  const handleOptionClick = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);
    const isCorrect = option === question.answer;
    dispatch(
      answerQuestion({
        isCorrect: isCorrect,
        correctOption: question.answer,
      })
    );
    setFeedbackMessage(
      isCorrect ? "Great job! You’re right!" : "Oops! That’s not correct."
    );
    setFeedbackEmoji(isCorrect ? "🎉" : "😞");

    setTimerReset(true);
    hasTimeoutBeenHandled.current = false;
    setShowNextButton(true);
  };

  const handleNextButtonClick = () => {
    if (selectedOption) {
      dispatch(nextQuestion());
      setSelectedOption(null);
      setTimerReset(false);
      setShowNextButton(false);
      setFeedbackMessage("");
      setFeedbackEmoji("");
    }
  };

  useEffect(() => {
    if (!quizEnded) {
      setTimerReset(true);
      hasTimeoutBeenHandled.current = false;
      setShowNextButton(false); 
    }
  }, [currentQuestionIndex, quizEnded]);

  return (
    <div className={styles.container}>
      <Typography variant="h3" className={styles.heading}>
        Test Your Knowledge and Have Fun!
      </Typography>
      <Timer duration={5} reset={timerReset} onTimeout={handleTimeout} />
      <Paper elevation={3} className={styles.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={styles.questionText}>
              {currentQuestionIndex + 1}.{question.question}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {question.options.map((option) => (
              <Box
                key={option}
                className={`${styles.optionBox} ${
                  selectedOption
                    ? option === question.answer
                      ? styles.correctOption
                      : option === selectedOption
                      ? styles.incorrectOption
                      : ""
                    : styles.optionBoxHover
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Box>
            ))}
          </Grid>
        </Grid>
        <Fade in={!!feedbackMessage} timeout={500}>
          <Typography variant="h6" className={styles.feedbackMessage}>
            {feedbackMessage} {feedbackEmoji}
          </Typography>
        </Fade>
        {showNextButton && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextButtonClick}
            className={styles.nextButton}
          >
            Next
          </Button>
        )}
      </Paper>
    </div>
  );
};

export default Question;
