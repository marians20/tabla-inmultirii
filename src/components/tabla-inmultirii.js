import React, { useState, useCallback, useEffect, useRef } from "react";
import classes from "./tabla-inmultirii.module.css";
const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;

const TablaInmultirii = () => {
  const inputElement = useRef();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [result, setResult] = useState(undefined);
  const [isCorrect, setIsCorrect] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const initialize = useCallback(() => {
    setX(getRandomNumber);
    setY(getRandomNumber);
    setResult(undefined);
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
        {x} x {y} = &nbsp;
        <input
          type="number"
          className={resultClass}
          value={result}
          onChange={(event) => setResult(event.target.value)}
          onKeyUp={handleKeyUp}
          ref={inputElement}
        />
      </div>
      {isChecked && (
        <div className={classes.message}>
          {isCorrect ? "Corect!" : `Gresit! valoarea corecta este ${x * y}`}
        </div>
      )}
    </>
  );
};

export default TablaInmultirii;
