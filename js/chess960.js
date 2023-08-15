const start960ID = document.getElementById("start960");

const randomizePieces = () => {
  reset();

  let starterPieces = ["p", "p", "p", "p", "p", "p", "p", "p"];
  let rooksAdded = rookLogic(starterPieces);
  let kingAdded = kingLogic(rooksAdded);
  let bishopsAdded = bishopLogic(kingAdded);
  let allPiecesAdded = restOfPiecesLogic(bishopsAdded);
  let blackRanks = allPiecesAdded.join().toString().replaceAll(",", "");
  let whiteRanks = blackRanks.toUpperCase();

  game.load(
    `${blackRanks}/pppppppp/8/8/8/8/PPPPPPPP/${whiteRanks} w KQkq - 0 1`
  );
  board.position(game.fen());
};

const rookLogic = (rankPieces) => {
  let firstRookPosition = getRandomInt(8);
  let secondRookPosition = getRandomInt(firstRookPosition);
  let incorrectPosition = true;

  while (incorrectPosition) {
    if (
      firstRookPosition === secondRookPosition ||
      firstRookPosition - 1 === secondRookPosition
    ) {
      firstRookPosition = getRandomInt(8);
      secondRookPosition = getRandomInt(firstRookPosition);
    } else {
      incorrectPosition = false;
    }
  }

  let newArr = [...rankPieces];
  newArr.forEach((p, index) => {
    if (index === firstRookPosition || index === secondRookPosition) {
      newArr[index] = "r";
    }
  });

  return newArr;
};


const restOfPiecesLogic = (rankPieces) => {
    let emptyLocations = [];
    rankPieces.forEach((v, index) => {
      if (v === "p") {
        emptyLocations.push(index);
      }
    });
    let shuffledLocations = shuffle(emptyLocations);
    rankPieces[shuffledLocations[0]] = "q";
    rankPieces[shuffledLocations[1]] = "n";
    rankPieces[shuffledLocations[2]] = "n";
  
    return rankPieces;
  };