import React, { useState, useCallback, useEffect, useRef } from "react";
import useSound from 'use-sound';

import Rezultate from './rezultate';
import Constants from './../constants';
import { isDigit } from '../lib/validators/stringValidators';

import fart from '../sounds/fart.mp3';
import clapping from '../sounds/clapping.mp3';
import classes from "./tabla-inmultirii.module.css";


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
    console.log(theEvent.type);
    if (theEvent.type === Constants.EventTypes.Paste) {
      key = theEvent.clipboardData.getData('text/plain');
    }
    else {
      // Handle key press
      key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
    }
    if (!isDigit(key)) {
      theEvent.returnValue = false;

      if (theEvent.preventDefault) {
        theEvent.preventDefault();
      }
    }
  }

  const resultClass = isChecked ? (isCorrect ? classes.correct : classes.wrong) : '';

  const waiting = (
    <iframe
      title='waiting'
      allow="fullscreen"
      frameBorder="0"
      height="270"
      src="https://giphy.com/embed/S32isdJcvgiHELsJ5l/video"
      width="480"/>
  );

  const happy = (
    <iframe
      title='happy'
      src="https://giphy.com/embed/YnBntKOgnUSBkV7bQH"
      width="480"
      height="400"
      frameBorder="0"
      class="giphy-embed"
      allowFullScreen />
  )

  const sad = (
    <iframe
      title='sad'
      src="https://giphy.com/embed/6WawoqPVcO7S738Tht"
      width="480"
      height="270"
      frameBorder="0"
      class="giphy-embed"
      allowFullScreen />
  )

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
        <span className={classes.correct}>{isChecked && !isCorrect && `${x * y}`}</span>
      </div>
      <div className={classes['results-container']}>
        <span>
          {!isChecked && waiting}
          {isChecked && isCorrect && happy}
          {isChecked && !isCorrect && sad}
        </span>
        <span>
          <Rezultate results={results} />
        </span>
      </div>

    </>
  );
};

export default TablaInmultirii;
