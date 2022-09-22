import { v4 as uuidv4 } from 'uuid';

import Rezultat from "./rezultat";

import classes from './rezultate.module.css';

const Rezultate = ({results}) => {
  return(<div className={classes.container}>
    {results.map(res => <div key={uuidv4()}>
      <Rezultat result={res} />
    </div>)}
  </div>);
};

export default Rezultate;