import React, { useEffect, useRef, useState } from 'react';
import styles from './Timer.module.scss'; 

const Timer = ({ duration = 5, reset, onTimeout }) => { 
  const [seconds, setSeconds] = useState(duration);
  const timerRef = useRef(null);

  useEffect(() => {
    if (reset) {
      setSeconds(duration); 
    }

    timerRef.current = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds > 1) {
          return prevSeconds - 1;
        } else {
          clearInterval(timerRef.current); 
          onTimeout(); 
          return duration; 
        }
      });
    }, 1000);

    return () => clearInterval(timerRef.current); 
  }, [reset, duration, onTimeout]);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerCircle}>
        <div className={styles.timerText}>{seconds > 0 ? seconds : ''}</div>
      </div>
    </div>
  );
};

export default Timer;
