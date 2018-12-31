import {
  htmlElements,
  completeImageName,
  backImage,
  boardBackgroundColor
} from "./utils";

export const getInput = () => htmlElements.dimensionNum.value;

export const createGameBoard = cards => {
  htmlElements.container.style["grid-template-rows"] =
    "repeat(" + cards.length + ", 1fr)";
  htmlElements.container.style["grid-template-columns"] =
    "repeat(" + cards[0].length + ", 1fr)";

  const elements = cards.map((row, rindex) =>
    row.reduce(
      (html, element, cindex) =>
        html.concat(
          "",
          `<div class="item c_${rindex}_${cindex}" data-value="${element}"><img src="${backImage}" /></div>`
        ),
      ""
    )
  );

  const html = elements.join("");
  htmlElements.container.insertAdjacentHTML("beforeend", html);
};

export const clearGameBoard = () => {
  htmlElements.container.innerHTML = "";
};

export const flipCard = card => {
  document.querySelector(card).firstChild.src = completeImageName(
    document.querySelector(card).dataset.value
  );
};

export const updateBoardForMatched = cardArray => {
  cardArray.forEach(card => {
    document.querySelector(card).firstChild.src = "";
    document.querySelector(card).style.backgroundColor = boardBackgroundColor;
  });
};

export const updateBoardForUnmatched = cardArray => {
  cardArray.forEach(
    card => (document.querySelector(card).firstChild.src = backImage)
  );
};

export const enableReset = () => {
  htmlElements.resetBtn.disabled = false;
};

export const disableReset = () => {
  htmlElements.resetBtn.disabled = true;
};

export const updateTime = () => {
  var seconds = 0;
  return setInterval(() => {
    seconds++;
    htmlElements.timer.innerText =
      "Elapsed Time: " +
      parseInt(seconds / 60) +
      " mins " +
      (seconds % 60) +
      " secs";
  }, 1000);
};

export const removeTimer = () => {
  htmlElements.timer.innerText = "";
};
