import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import SummaryLine from "./summary-line";

import classes from './summary.module.css';

const marksClasses = [
  {
    fromMark: 0,
    toMark: 4.99,
    class: classes.bad,
  },
  {
    fromMark: 5,
    toMark: 6.99,
    class: classes.danger,
  },
  {
    fromMark: 7,
    toMark: 8.99,
    class: classes.good,
  },
  {
    fromMark: 9,
    toMark: 10,
    class: classes['very-good'],
  }
];

const getResults = (results) => {
  if (!results || results.length === 0) {
    return {
      mark: undefined,
      questionsCount: 0,
      correctResponses: 0
    };
  }

  const correctResultsCount = results.filter(r => Number(r.result) === r.x * r.y).length;

  return {
    mark: Math.round(10 * correctResultsCount / results.length * 2) / 2,
    questionsCount: results.length,
    correctResponses: correctResultsCount
  };
}

const Summary = ({ results }) => {
  const { mark, questionsCount, correctResponses } = getResults(results);

  console.log(mark);
  const summaryClass = mark !== undefined ? marksClasses.filter(c => c.fromMark <= mark && c.toMark >= mark)[0].class || '' : '';

  console.log(summaryClass);

  return (<>
    {
      questionsCount > 0 && (
        <div className={`${classes.header} ${summaryClass}`}>
          Nota: {mark} Ai răspuns corect la {correctResponses} din {questionsCount} întrebări
          {mark < 5 && 'CORIJENT LA MATEMATICĂ!!!'}
        </div>
      )
    }
    <div className={classes.container}>
      {results.map(res => <div key={uuidv4()}>
        <SummaryLine result={res} />
      </div>)}
    </div>
  </>);
};

export default Summary;