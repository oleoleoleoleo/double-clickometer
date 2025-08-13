const leftContainer = document.querySelector('.left-click-container');
const leftClickContainer = leftContainer.querySelector('.click-box');
const leftClickInfoContainer = leftContainer.querySelector('.info-container');

const leftClick = {
  eventName: 'click',
  clickBox: leftClickContainer,
  infoBox: leftClickInfoContainer,
  firstClickTime: null,
  timeoutRef: null,
};

const middleContainer = document.querySelector('.middle-click-container');
const middleClickContainer = middleContainer.querySelector('.click-box');
const middleClickInfoContainer =
  middleContainer.querySelector('.info-container');

const middleClick = {
  eventName: 'auxclick',
  clickBox: middleClickContainer,
  infoBox: middleClickInfoContainer,
  firstClickTime: null,
  timeoutRef: null,
};

const rightContainer = document.querySelector('.right-click-container');
const rightClickContainer = rightContainer.querySelector('.click-box');
const rightClickInfoContainer = rightContainer.querySelector('.info-container');

const rightClick = {
  eventName: 'contextmenu',
  clickBox: rightClickContainer,
  infoBox: rightClickInfoContainer,
  firstClickTime: null,
  timeoutRef: null,
};

const containersIndex = [leftClick, middleClick, rightClick];

const createTextEl = (content) => {
  const p = document.createElement('p');
  p.className = 'info-item';
  p.innerText = content;
  return p;
};

containersIndex.forEach((container) => {
  let { clickBox, infoBox, firstClickTime, eventName, timeoutRef } = container;
  clickBox.addEventListener(eventName, (e) => {
    e.preventDefault();

    if (!firstClickTime) {
      firstClickTime = performance.now();
      timeoutRef = setTimeout(() => {
        if (firstClickTime) {
          firstClickTime = null;
        }
      }, 1000);
      return;
    }
    infoBox.prepend(
      createTextEl(`፠ ${(performance.now() - firstClickTime).toFixed(2)} ms`)
    );
    firstClickTime = null;
    clearTimeout(timeoutRef);
  });
});
