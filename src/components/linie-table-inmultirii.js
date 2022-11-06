import React from 'react';

const LinieTableInmultirii = ({ a, b }) => (<div>{a.toString().padStart(2, ' ')} x {b.toString().padStart(2,  ' ')} = {(a * b).toString().padStart(2, ' ')}</div>);

export default LinieTableInmultirii;