import React, { useState, useCallback, useEffect, useRef } from "react";
import useSound from 'use-sound';

import Summary from './summary';
import Constants from './../constants';
import { isDigit } from '../lib/validators/stringValidators';

import fart from '../sounds/fart.mp3';
import clapping from '../sounds/clapping.mp3';
import classes from "./tabla-inmultirii.module.css";
import VisualFeedback from "./visual-feedback";


const getRandomNumber = () => Math.floor(Math.random() * 8) + 2;

const TablaInmultirii = () => {
  const inputElement = useRef();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [result, setResult] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [results, setResults] = useState([]);
  const [playFart] = useSound(fart);
  const [playClapping] = useSound(clapping);
  const initialize = useCallback(() => {
    setX(getRandomNumber);
    setY(getRandomNumber);
    setResult('');
    setIsChecked(false);
    inputElement.current.focus();
    setStartTime(new Date());
  }, []);

  const checkResult = useCallback(() => {
    setIsChecked(true);
    const isCorrectAnswer = Number(result) === x * y;
    if (!isCorrectAnswer) {
      playFart();
    } else {
      playClapping();
    }

    setIsCorrect(isCorrectAnswer);
    const arr = [...results];
    arr.push({ x: x, y: y, result: result, startTime: startTime, responseTime: new Date() });
    setResults(arr);
  }, [result, x, y, results, startTime, playFart, playClapping]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleKeyUp = (event) => {
    event.preventDefault();

    switch (event.code) {
      case Constants.KeyCodes.Enter:
        if (isChecked) {
          initialize();
        } else {
          checkResult();
        }
        break;
      case Constants.KeyCodes.Escape:
        initialize();
        break;
      default:
      // pass
    }
  };

  const validate = (evt) => {
    let theEvent = evt || window.event;
    let key;

    // Handle paste
    if (theEvent.type === Constants.EventTypes.Paste) {
      key = theEvent.clipboardData.getData('text/plain');
    }
    else {
      // Handle key press
      key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }

    if (!isDigit(key) && ['Backspace'].indexOf(theEvent.code) < 0) {
      theEvent.returnValue = false;

      if (theEvent.preventDefault) {
        console.log('preventing default');
        theEvent.preventDefault();
      }
    }
  }

  const resultClass = isChecked ? (isCorrect ? classes.correct : classes.wrong) : '';

  return (
    <>
      <div className={classes.container} onKeyUp={handleKeyUp}>
        {x} x {y} =
        <input
          type="text"
          readOnly={isChecked}
          className={resultClass}
          value={result}
          onChange={(event) => setResult(event.target.value)}
          onKeyDown={validate}
          onKeyUp={handleKeyUp}
          ref={inputElement}
        />
        {isChecked && !isCorrect && <span className={classes.correct}>{`${x * y}`}</span>}
      </div>
      <div className={classes['results-container']}>
        {/* <span>
          <VisualFeedback isChecked={isChecked} isCorrect={isCorrect} />
        </span> */}
        <span>
          <Summary results={results} />
        </span>
      </div>

    </>
  );
};

export default TablaInmultirii;
