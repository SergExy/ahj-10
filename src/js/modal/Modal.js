import createElement from '../createElement/createElement';

import './css/modal.css';

export default class Modal {
  constructor(title, content) {
    this.title = title;
    this.content = content;

    this.init();
  }

  init() {
    this.modalEl = createElement({
      classes: ['modal'],
    });
    const header = createElement({
      classes: ['modal__header'],
    });
    const title = createElement({
      classes: ['modal__title'],
      text: this.title || 'Модальное окно',
    });
    header.appendChild(title);
    this.modalEl.appendChild(header);

    const content = createElement({
      classes: ['modal__content'],
    });
    content.appendChild(this.content);
    this.modalEl.appendChild(content);
  }

  bindToDOM() {
    const body = document.querySelector('body');
    body.appendChild(this.modalEl);
  }

  remove() {
    this.modalEl.remove();
  }
}
