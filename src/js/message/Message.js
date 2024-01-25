import createElement from '../createElement/createElement';
import formatDate from '../formatDate/formatDate';

import './css/message.css';
import EyeIcon from './img/eye.png';

export default class Message {
  constructor(parent, data) {
    this.parent = parent;
    this.data = data;

    this.init();
  }

  init() {
    this.messageEl = createElement({
      classes: ['msg'],
    });
    const container = createElement({
      classes: ['msg__container'],
    });

    const headerEl = createElement({
      classes: ['msg__header'],
    });
    const dateEl = createElement({
      classes: ['msg__date'],
      text: formatDate(this.data.created),
    });
    headerEl.appendChild(dateEl);
    container.appendChild(headerEl);

    const contentEl = createElement({
      classes: ['msg__content'],
      text: this.data.text,
    });
    container.appendChild(contentEl);

    const coordsWrapEl = createElement({
      classes: ['msg__footer'],
    });
    const coordsEl = createElement({
      classes: ['msg__coords'],
      text: this.data.coords,
    });
    coordsWrapEl.appendChild(coordsEl);
    const iconEl = createElement({
      classes: ['msg__icon'],
    });
    const imageIcon = createElement({
      name: 'img',
      attributes: [{ name: 'src', value: EyeIcon }],
    });
    iconEl.appendChild(imageIcon);
    coordsWrapEl.appendChild(iconEl);
    container.appendChild(coordsWrapEl);

    this.messageEl.appendChild(container);
  }

  bindToDOM() {
    this.parent.appendChild(this.messageEl);
  }
}
