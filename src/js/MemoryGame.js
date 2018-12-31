export default class MemoryGame {
  constructor(dimension) {
    this.dimension = dimension;
    this.totalPairs = (dimension * dimension) / 2;
    this.matchedPairs = 0;
  }

  buildGame() {
    const randomArray = Array.from(
      new Array(this.dimension * this.dimension),
      (x, i) => {
        if (i < (this.dimension * this.dimension) / 2) {
          return i + 1;
        } else {
          return i - (this.dimension * this.dimension) / 2 + 1;
        }
      }
    ).sort(() => Math.random() - 0.5);

    return (this.cards = Array(parseInt(this.dimension))
      .fill()
      .map((element, index) => {
        const tempArray = randomArray;
        return tempArray.slice(
          index * this.dimension,
          (index + 1) * this.dimension
        );
      }));
  }

  decideMatch(firstCard, secondCard) {
    const firstCardRowIndex = firstCard.split("_")[1];
    const firstCardColIndex = firstCard.split("_")[2];
    const secondCardRowIndex = secondCard.split("_")[1];
    const secondCardColIndex = secondCard.split("_")[2];

    if (
      this.cards[firstCardRowIndex][firstCardColIndex] ===
      this.cards[secondCardRowIndex][secondCardColIndex]
    ) {
      this.matchedPairs++;
      return true;
    } else {
      return false;
    }
  }

  decideGameOver() {
    return this.totalPairs == this.matchedPairs ? true : false;
  }
}
