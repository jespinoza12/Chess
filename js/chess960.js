const chess960 = document.getElementById("chess960");

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

const kingLogic = (rankPieces) => {
  let rookIndexLocations = [];
  rankPieces.forEach((v, index) => {
    if (v === "r") {
      rookIndexLocations.push(index);
    }
  });

  let kingPosition = getRandomIntRange(
    rookIndexLocations[0] + 1,
    rookIndexLocations[1]
  );

  rankPieces[kingPosition] = "k";
  return rankPieces;
};

const bishopLogic = (rankPieces) => {
  let emptyOddLocations = [];
  let emptyEvenLocations = [];
  rankPieces.forEach((v, index) => {
    if (v === "p" && index % 2 == 0) {
      emptyEvenLocations.push(index);
    }
    if (v === "p" && index % 2 == 1) {
      emptyOddLocations.push(index);
    }
  });

  let firstBishop = getRandomInt(emptyOddLocations.length);
  let secondBishop = getRandomInt(emptyEvenLocations.length);
  let firstBishopIndex = emptyOddLocations[firstBishop];
  let secondBishopIndex = emptyEvenLocations[secondBishop];
  rankPieces[firstBishopIndex] = "b";
  rankPieces[secondBishopIndex] = "b";

  return rankPieces;
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

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomIntRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

chess960.addEventListener("click", randomizePieces);
