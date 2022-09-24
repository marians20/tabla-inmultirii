import { v4 as uuidv4 } from 'uuid';
import { calculateScore } from '../lib/numbers-utils';

import SummaryLine from "./summary-line";

import classes from './summary.module.css';

const Summary = ({results}) => {
  const score = calculateScore(results);

  console.log(score);
  
  return(<div className={classes.container}>
    {results.map(res => <div key={uuidv4()}>
      <SummaryLine result={res} />
    </div>)}
  </div>);
};

export default Summary;