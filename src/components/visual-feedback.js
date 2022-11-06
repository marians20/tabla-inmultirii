import React from 'react';

const waiting = (
  <iframe
    title="waiting"
    src="https://giphy.com/embed/S32isdJcvgiHELsJ5l/video"
    height="270"
    width="480"
    frameBorder="0"
  />
);

const happy = (
  <iframe
    title="happy"
    src="https://giphy.com/embed/YnBntKOgnUSBkV7bQH"
    width="480"
    height="400"
    frameBorder="0" />
);

const sad = (
  <iframe
    title="sad"
    src="https://giphy.com/embed/6WawoqPVcO7S738Tht"
    width="480"
    height="270"
    frameBorder="0" />
);

const VisualFeedback = ({ isChecked, isCorrect }) => {

  return (<>
    {!isChecked && waiting}
    {isChecked && isCorrect && happy}
    {isChecked && !isCorrect && sad}
  </>);
};

export default VisualFeedback;