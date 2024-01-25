import createElement from './createElement/createElement';
import Timeline from './timeline/Timeline';

const onDOMLoaded = () => {
  const container = createElement({
    classes: ['container'],
  });
  document.querySelector('body').appendChild(container);
  const timeline = new Timeline(container);
  timeline.bindToDOM();
};

document.addEventListener('DOMContentLoaded', onDOMLoaded);
