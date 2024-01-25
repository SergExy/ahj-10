/* eslint-disable no-useless-escape */
import createElement from '../createElement/createElement';
import Message from '../message/Message';
import Modal from '../modal/Modal';
import extractCoords from '../utils/extractCoords';

import './css/timeline.css';

export default class Timeline {
  constructor(parent) {
    if (typeof (parent) === 'string') {
      this.parent = document.querySelector(parent);
    } else {
      this.parent = parent;
    }
    this.modal = null;
    this.init();
  }

  init() {
    this.timelineEl = createElement({
      classes: ['timeline'],
    });

    const contentEl = createElement({
      classes: ['timeline__content'],
    });
    const lineEl = createElement({
      classes: ['timeline__line'],
    });
    contentEl.appendChild(lineEl);
    this.timelineEl.appendChild(contentEl);

    const msgBarEL = createElement({
      classes: ['timelien__messageBar'],
    });
    const form = createElement({
      name: 'form',
      classes: ['timeline__form'],
    });
    const groupEl = createElement({
      classes: ['timeline__group'],
    });
    const input = createElement({
      name: 'input',
      classes: ['timeline__input'],
      attributes: [
        { name: 'name', value: 'text' },
        { name: 'placeholder', value: 'Введите сообщение' },
      ],
    });
    form.onsubmit = this.onSubmit;

    groupEl.appendChild(input);

    form.appendChild(groupEl);
    msgBarEL.appendChild(form);
    this.timelineEl.appendChild(msgBarEL);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.msgData = {
      created: Date.now(),
    };

    const form = this.timelineEl.querySelector('.timeline__form');
    const formData = new FormData(form);
    this.msgData.text = formData.get('text');

    if (navigator.geolocation) {
      const position = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(resolve, () => this.getCoords());
      });

      const { coords } = position;

      if (!coords) return;
      this.msgData.coords = `[${coords.latitude}, ${coords.longitude}]`;
    }

    if (this.msgData.coords) {
      this.addMsg();
    } else {
      this.getCoords();
    }
  };

  addMsg() {
    const content = this.timelineEl.querySelector('.timeline__content');
    const msg = new Message(content, this.msgData);
    msg.bindToDOM();

    const height = content.scrollHeight;
    const lineEl = content.querySelector('.timeline__line');
    lineEl.style.height = `${height}px`;

    const form = this.timelineEl.querySelector('.timeline__form');
    form.reset();
  }

  getCoords() {
    if (this.modal) return;
    const content = createElement({
      classes: ['content'],
    });
    const descr = createElement({
      classes: ['content__descr'],
      text: 'К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную',
    });
    content.appendChild(descr);
    const form = createElement({
      name: 'form',
      classes: ['form'],
    });
    const groupInput = createElement({
      classes: ['form__group'],
    });
    const inputTitle = createElement({
      classes: ['form__inputTitle'],
      text: 'Широта и долгата через запятую',
    });
    groupInput.appendChild(inputTitle);
    const input = createElement({
      name: 'input',
      classes: ['form__input'],
      attributes: [{ name: 'name', value: 'coords' }],
    });
    groupInput.appendChild(input);
    form.appendChild(groupInput);

    const groupBtn = createElement({
      classes: ['form__btns'],
    });
    const submit = createElement({
      name: 'button',
      classes: ['form__btn', 'form__btn_submit'],
      text: 'ok',
    });
    groupBtn.appendChild(submit);

    const cancel = createElement({
      name: 'button',
      classes: ['form__btn', 'form__btn_cancel'],
      text: 'Отмена',
      attributes: [{ name: 'type', value: 'button' }],
    });
    groupBtn.appendChild(cancel);
    form.appendChild(groupBtn);
    content.appendChild(form);

    this.modal = new Modal('test', content);

    const showHint = (text) => {
      const hint = createElement({
        classes: ['form__hint'],
        text,
      });
      groupInput.appendChild(hint);
    };

    form.onsubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const coordsText = formData.get('coords');

      const currentHint = groupInput.querySelector('.form__hint');
      if (currentHint) currentHint.remove();
      const coords = extractCoords(coordsText);
      if (coords.error) {
        input.focus();
        showHint(coords.error);
        return;
      }

      this.msgData.coords = `[${coords.latitude}, ${coords.longitude}]`;
      this.addMsg();
      this.modal.remove();
      this.modal = null;
    };

    input.oninput = (e) => {
      const currentHint = groupInput.querySelector('.form__hint');
      if (currentHint) currentHint.remove();

      const value = e.target.value.trim();
      const banList = value.replace(/[\d\.,\[\] ]+/g, '');

      if (!banList) return;
      showHint('Будь умницей, используй только цифры, запятую и точку');
    };

    cancel.onclick = () => {
      this.modal.remove();
      this.modal = null;
    };

    this.modal.bindToDOM();
  }

  bindToDOM() {
    this.parent.appendChild(this.timelineEl);
  }
}
