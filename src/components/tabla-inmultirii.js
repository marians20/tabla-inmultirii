import React, { useState, useCallback, useEffect, useRef } from "react";
import classes from "./tabla-inmultirii.module.css";
const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;

const TablaInmultirii = () => {
  const inputElement = useRef();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [result, setResult] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const initialize = useCallback(() => {
    setX(getRandomNumber);
    setY(getRandomNumber);
    setResult('');
    setIsChecked(false);
    inputElement.current.value = undefined;
    inputElement.current.focus();
  }, []);

  const checkResult = useCallback(() => {
    setIsCorrect(Number(result) === x * y);
    setIsChecked(true);
  }, [result, x, y]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleKeyUp = (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    if (isChecked) {
      initialize();
    } else {
      checkResult();
    }
  };

  const resultClass = isChecked ? (isCorrect ? classes.correct : classes.wrong) : '';
  return (
    <>
      <div className={classes.container}>
        {x} x {y} =
        <input
          type="text"
          className={resultClass}
          value={result}
          onChange={(event) => setResult(event.target.value)}
          onKeyUp={handleKeyUp}
          ref={inputElement}
          pattern="[0-9]+"
        />
        <span className={classes.correct}>{isChecked && !isCorrect && `${x * y}`}</span>
      </div>
    </>
  );
};

export default TablaInmultirii;
