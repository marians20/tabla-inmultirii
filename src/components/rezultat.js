import React from 'react';
import classes from './rezultat.module.css';

const isCorrect = (result) => Number(result.result) === result.x * result.y;

const Rezultat = ({ result }) => {
  const resultClass = `${classes.container} ${isCorrect(result) ? classes.correct: classes.wrong}`;

  return (<div className={resultClass}>
    {result.x} x {result.y} = {result.result}
  </div>)
};

export default Rezultat;