import React from 'react';
import classes from './summary-line.module.css';

const SummaryLine = ({ result }) => {
  const isCorrect = Number(result.result) === result.x * result.y;
  const resultClass = `${classes.container} ${isCorrect ? classes.correct : classes.wrong}`;

  return (<div className={resultClass}>
    {result.x} x {result.y} = {result.result}
    {!isCorrect && ` (${(result.x * result.y).toString()})`}
  </div>)
};

export default SummaryLine;