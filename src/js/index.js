import MemoryGame from "./MemoryGame";
import { htmlElements, wrapAsClass } from "./utils";
import * as gameView from "./gameView";

let state = {};

const startGame = () => {
  gameView.clearGameBoard();
  clearGameState();
  state.memoryGame = new MemoryGame(state.currentDimension);
  gameView.createGameBoard(state.memoryGame.buildGame());
  gameView.enableReset();
  registerListnertoGameboard();
  state.timer = gameView.updateTime();
};

const comparePair = e => {
  if (e.target.tagName === "IMG") {
    if (state.firstCard == null) {
      state.firstCard = e.target.parentNode.classList[1];
      gameView.flipCard(wrapAsClass(state.firstCard));
    } else {
      state.secondCard = e.target.parentNode.classList[1];
      if (!(state.firstCard === state.secondCard)) {
        if (state.memoryGame.decideMatch(state.firstCard, state.secondCard)) {
          if (state.memoryGame.decideGameOver()) {
            gameView.flipCard(wrapAsClass(state.secondCard));
            gameView.updateBoardForMatched([
              wrapAsClass(state.firstCard),
              wrapAsClass(state.secondCard)
            ]);
            setTimeout(alertMessage, 1000, "You Completed");
            clearInterval(state.timer);
            setTimeout(gameView.removeTimer, 3000);
            setTimeout(gameView.disableReset, 1000);
          } else {
            gameView.flipCard(wrapAsClass(state.secondCard));
            gameView.updateBoardForMatched([
              wrapAsClass(state.firstCard),
              wrapAsClass(state.secondCard)
            ]);
          }
          state.firstCard = null;
        } else {
          gameView.flipCard(wrapAsClass(state.secondCard));
          setTimeout(gameView.updateBoardForUnmatched, 1000, [
            wrapAsClass(state.firstCard),
            wrapAsClass(state.secondCard)
          ]);
          state.firstCard = null;
        }
      }
    }
  }
};

htmlElements.startBtn.addEventListener("click", e => {
  e.preventDefault();
  const availableInput = ["2", "4", "6"];
  const num = gameView.getInput();
  if (availableInput.includes(num)) {
    state.currentDimension = num;
    startGame();
  } else {
    alertMessage(`Please enter a value among 2, 4, and 6.`);
  }
});

htmlElements.resetBtn.addEventListener("click", e => {
  e.preventDefault();
  startGame();
});

const registerListnertoGameboard = e =>
  htmlElements.container.addEventListener("click", comparePair);

const alertMessage = message => {
  alert(message);
};

const clearGameState = () => {
  state.firstCard = null;
  state.secondCard = null;
  if (state.timer != null) {
    clearInterval(state.timer);
  }
};
