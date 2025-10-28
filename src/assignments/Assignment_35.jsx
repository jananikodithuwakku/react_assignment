import { useEffect, useState } from "react";
import "./Assignment_35.css";

export default function Assignment_35() {
  const size = 3; // 3*3 puzzle size
  const imageUrl =
    "https://i.pinimg.com/1200x/aa/81/d5/aa81d54ef0fdd5d528819917c48ce533.jpg";
  const [tiles, setTiles] = useState([]); // 2D array for puzzle tiles
  const [empty, setEmpty] = useState({ row: size - 1, col: size - 1 }); // empty tile position
  const [isSolved, setIsSolved] = useState(false); // puzzle solved state

  // create puzzle grid and shuffle it on first load
  useEffect(() => {
    const initial = [];
    for (let r = 0; r < size; r++) {
      const row = [];
      for (let c = 0; c < size; c++) {
        row.push(r * size + c); // fill numbers
      }
      initial.push(row);
    }
    shuffleTiles(initial); // shuffle the grid
  }, []);

  // shuffle the puzzle randomly
  const shuffleTiles = (grid) => {
    const directions = [
      { dr: 1, dc: 0 }, // move down
      { dr: -1, dc: 0 }, // move up
      { dr: 0, dc: 1 }, // move right
      { dr: 0, dc: -1 }, // move left
    ];

    let er = size - 1,
      ec = size - 1; // start with empty in bottom-right

    // random moves to shuffle
    for (let i = 0; i < 200; i++) {
      // make 200 random valid moves
      const move = directions[Math.floor(Math.random() * 4)];
      const nr = er + move.dr,
        nc = ec + move.dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        [grid[er][ec], grid[nr][nc]] = [grid[nr][nc], grid[er][ec]]; // swap tiles
        er = nr;
        ec = nc; // update empty position
      }
    }

    setTiles(grid);
    setEmpty({ row: er, col: ec }); // set new empty position
    setIsSolved(false); // reset solved flag
  };

  // handle key press (arrow or WASD)
  useEffect(() => {
    const handleKey = (e) => {
      if (isSolved) return; // disable when solved
      const key = e.key.toLowerCase();
      let move = null;
      if (key === "arrowup" || key === "w") move = { dr: 1, dc: 0 };
      if (key === "arrowdown" || key === "s") move = { dr: -1, dc: 0 };
      if (key === "arrowleft" || key === "a") move = { dr: 0, dc: 1 };
      if (key === "arrowright" || key === "d") move = { dr: 0, dc: -1 };
      if (move) moveTile(move); // move tile if key is valid
    };
    window.addEventListener("keydown", handleKey); // add key listener
    return () => window.removeEventListener("keydown", handleKey); // clean up
  });

  // move a tile in a given direction
  const moveTile = ({ dr, dc }) => {
    const { row, col } = empty; // current empty cell
    const nr = row + dr,
      nc = col + dc; // new empty position
    if (nr < 0 || nr >= size || nc < 0 || nc >= size) return; // check bounds

    const newTiles = tiles.map((r) => [...r]); // copy grid
    [newTiles[row][col], newTiles[nr][nc]] = [
      newTiles[nr][nc],
      newTiles[row][col],
    ]; // swap tiles
    setTiles(newTiles);
    setEmpty({ row: nr, col: nc }); // update empty position

    checkSolved(newTiles);
  };

  // check if puzzle is solved
  const checkSolved = (grid) => {
    let solved = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] !== r * size + c) {
          // check order
          solved = false;
          break;
        }
      }
    }
    if (solved) setIsSolved(true); // mark solved
  };

  // restart and reshuffle puzzle
  const restartGame = () => {
    const grid = [];
    for (let r = 0; r < size; r++) {
      const row = [];
      for (let c = 0; c < size; c++) {
        row.push(r * size + c);
      }
      grid.push(row);
    }
    shuffleTiles(grid);
  };

  const tileSize = 100; // each tile size in pixels

  return (
    <div className="puzzle-container">
      <h2> Sliding Puzzle</h2>

      {/* puzzle grid area */}
      <div
        className="puzzle-grid"
        style={{ width: tileSize * size, height: tileSize * size }}
      >
        {isSolved ? (
          <img src={imageUrl} alt="Full Puzzle" />
        ) : (
          tiles.map((row, r) =>
            row.map((val, c) => {
              if (r === empty.row && c === empty.col) return null;
              const x = (val % size) * -tileSize;
              const y = Math.floor(val / size) * -tileSize;
              return (
                <div
                  key={val}
                  className="puzzle-tile"
                  style={{
                    width: tileSize,
                    height: tileSize,
                    left: c * tileSize,
                    top: r * tileSize,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: `${tileSize * size}px ${tileSize * size}px`,
                    backgroundPosition: `${x}px ${y}px`,
                  }}
                />
              );
            })
          )
        )}
      </div>

      {isSolved && (
        <button className="puzzle-button" onClick={() => restartGame()}>
          Restart Puzzle
        </button>
      )}
      <p>Use Arrow Keys or W/A/S/D to move tiles.</p>
    </div>
  );
}
