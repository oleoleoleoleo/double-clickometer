const leftContainer = document.querySelector('.left-click-container');
const middleContainer = document.querySelector('.middle-click-container');
const rightContainer = document.querySelector('.right-click-container');

const delayInput = document.querySelector('#delay-input');
const delayForm = document.querySelector('#delay-form');

const leftClick = {
  eventName: 'click',
  containerEl: leftContainer,
  firstClickTime: null,
  timeoutRef: null,
};

const middleClick = {
  eventName: 'auxclick',
  containerEl: middleContainer,
  firstClickTime: null,
  timeoutRef: null,
};

const rightClick = {
  eventName: 'contextmenu',
  containerEl: rightContainer,
  firstClickTime: null,
  timeoutRef: null,
};

const createTextEl = (content) => {
  const p = document.createElement('p');
  p.className = 'info-item';
  p.innerText = content;
  return p;
};

const addClickListeners = (delay) => {
  [leftClick, middleClick, rightClick].forEach((container) => {
    let { containerEl, firstClickTime, eventName, timeoutRef } = container;
    const infoBox = containerEl.querySelector('.info-box');

    const previousClickBox = containerEl.querySelector('.click-box');
    const clonedClickBox = previousClickBox.cloneNode(true);

    // replace to get rid of previous event listeners
    containerEl.replaceChild(clonedClickBox, previousClickBox);

    clonedClickBox.addEventListener(eventName, (e) => {
      e.preventDefault();

      if (!firstClickTime) {
        firstClickTime = performance.now();
        timeoutRef = setTimeout(() => {
          if (firstClickTime) {
            firstClickTime = null;
          }
        }, delay);
        return;
      }

      infoBox.prepend(
        createTextEl(`፠ ${(performance.now() - firstClickTime).toFixed(2)} ms`)
      );
      firstClickTime = null;
      clearTimeout(timeoutRef);
    });
  });
};

delayForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addClickListeners(delayInput.value);
});

addClickListeners(delayInput.value);
