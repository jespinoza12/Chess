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
  