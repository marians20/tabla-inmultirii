import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './tabla-inmultirii.module.css'

import LinieTableInmultirii from './linie-table-inmultirii';

const TablaInmultirii = ({ n }) => {

  const generate = (n) => {
    const arr = [];
    for (let i = 1; i <= 9; i++) {
      arr.push({ n: n, x: i, r: n * i })
    }

    return arr.map(it => (<LinieTableInmultirii key={uuidv4()} a={it.n} b={it.x} />))
  }

  const generateAll = () => {
    const arr = Array.from({ length: 9}, (_, i) => i+1);

    return arr.map(it => <div key={uuidv4()}>{generate(it)}</div>);
  }

  return (<>
    <div className={styles.container}>
      {generateAll()}
    </div>
  </>)
};

export default TablaInmultirii;