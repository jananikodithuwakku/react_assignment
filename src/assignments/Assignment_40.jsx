import { useEffect, useState } from "react";
import "./Assignment_40.css";

const WORDS = [
  "APPLE","HOUSE","TABLE","CHAIR","WATER","LIGHT","WORLD","MUSIC","PHONE","PAPER",
  "BREAD","HEART","SMILE","DREAM","RIVER","TRAIN","CLOUD","GREEN","STONE","HAPPY",
  "SLEEP","NIGHT","SUNNY","PLANT","CLOCK","SWEET","PEACE","BLUE","BIRD","WIND",
  "TREE","ROAD","STAR","GAME","FIRE","LOVE","FISH","BOOK","MILK","HAND","BALL",
  "SONG","FACE","RAIN","SHOE","CAR","CUP","PEN","BAG","MAP","RING","TOY","BOX",
  "CAT","DOG","COW","PIG","HEN","FOX","BEE","ANT","OWL","BAT","EGG","ICE","SEA",
  "SUN","SKY","AIR","OIL","JAM","TEA","INK","HAT","KEY","BED","RUN","WALK","JUMP",
  "READ","SING","COOK","PLAY","WORK","HELP","WASH","DRAW","OPEN","CLOSE","PUSH",
  "PULL","MAKE","GIVE","TAKE","FIND","KEEP","CALL","LOOK","TIME","YEAR","DAY",
  "WEEK","MONTH","LIFE","CHILD","MAN","WOMAN","FRIEND","FAMILY","SCHOOL","CITY",
  "TOWN","VILLAGE","COUNTRY","PLACE","SHOP","MARKET","STREET","ROOM","DOOR",
  "WINDOW","WALL","FLOOR","ROOF","GARDEN","PARK","FLOWER","FRUIT","FIELD",
  "BUS","CAR","BIKE","BOAT","SHIP","PLANE","BANK","MONEY","PRICE","COST","BUY",
  "SELL","PAY","FOOD","CAKE","SUGAR","COFFEE","DRINK","EAT","PLATE","BOWL",
  "GLASS","KNIFE","POT","HOT","COLD","FAST","SLOW","ANGRY","NICE","FUN","LOVE",
  "TREE","ROCK","STONE","BROWN","BLACK","WHITE","GREEN","YELLOW","ORANGE",
  "PURPLE","GOLD","BOOK","PAPER","PEPPER","HAMMER","MOUNTAIN","COST","DAY",
  "YEAR","PLAY"
];

const GRID_SIZE = 10;

export default function Assignment_40() {
  const [grid, setGrid] = useState([]); // letter grid
  const [words, setWords] = useState([]);  // words to find
  const [selected, setSelected] = useState([]); // selected cells
  const [found, setFound] = useState([]); // track mouse hold
  const [isMouseDown, setIsMouseDown] = useState(false);

  const direction = [ // possible word directions (horizontal, vertical, diagonal)
    [0, 1],   //  right
    [1, 0],   //  down
    [-1, 0],  //  up
    [1, 1],   //  diagonal down-right
    [-1, -1], //  diagonal up-left
    [1, -1],  //  diagonal down-left
    [-1, 1],  //  diagonal up-right
  ];

  // get 10 random words
  const getRandomWords = () =>
    [...WORDS].sort(() => 0.5 - Math.random()).slice(0, 10);

  // place words randomly in gri
  const placeWords = (grid, words) => {
    for (let word of words) {
      let placed = false;
      for (let attempt = 0; attempt < 100 && !placed; attempt++) {
        const dir = direction[Math.floor(Math.random() * direction.length)];
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        const endRow = row + dir[0] * (word.length - 1);
        const endCol = row + dir[1] * (word.length - 1);

        // skip if out of bounds
        if (
          endRow < 0 ||
          endRow >= GRID_SIZE ||
          endCol < 0 ||
          endCol >= GRID_SIZE
        )
          continue;

        // check if word fits in position  
        let canPlace = true;
        for (let i = 0; i < word.length; i++) {
          const r = row + dir[0] * i;
          const c = col + dir[1] * i;
          if (grid[r][c] !== "" && grid[r][c] !== word[i]) {
            canPlace = false;
            break;
          }
        }
    
        // place word if possible
        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const r = row + dir[0] * i;
            const c = col + dir[1] * i;
            grid[r][c] = word[i];
          }
          placed = true;
        }
      }
    }
  };

  // fill remaining cells with random letters
  const generateGrid = (words) => {
    const grid = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(""));

    placeWords(grid, words);

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c] === "") {
          grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
    return grid;
  };

  // create new puzzle
  const setupNewGrid = () => {
    const newWords = getRandomWords();
    const newGrid = generateGrid(newWords);
    setWords(newWords);
    setGrid(newGrid);
    setSelected([]);
    setFound([]);
  };
  // run once when page loads
  useEffect(() => {
    setupNewGrid();
  }, []);

  // mouse events for cell selection
  const handleMouseDown = (r, c) => {
    setIsMouseDown(true);
    setSelected([`${r}-${c}`]);
  };

  const handleMouseEnter = (r, c) => {
    if (isMouseDown) {
      setSelected((prev) => [...new Set([...prev, `${r}-${c}`])]);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    checkWord();
  };

  // check if selected letters form a valid word 
  const checkWord = () => {
    const current = selected
      .map((pos) => {
        const [r, c] = pos.split("-").map(Number);
        return grid[r][c];
      })
      .join("");

    const reversed = current.split("").reverse().join("");

    const matched = words.find((word) => word === current || word === reversed);

    if (matched && !found.includes(matched)) {
      setFound([...found, matched]);
    }
    setTimeout(() => setSelected([]), 200);
  };

  // determine CSS class for each cell
  const getCellClass = (r, c) => {
    const pos = `${r}-${c}`;
    if (selected.includes(pos)) return "wjcell selected";

    for (let word of found) {
      for (let dir of direction) {
        for (let row = 0; row < GRID_SIZE; row++) {
          for (let col = 0; col < GRID_SIZE; col++) {
            let match = true;
            for (let k = 0; k < word.length; k++) {
              const rr = row + dir[0] * k;
              const cc = col + dir[1] * k;
              if (
                rr < 0 ||
                rr >= GRID_SIZE ||
                cc < 0 ||
                cc >= GRID_SIZE ||
                grid[rr][cc] !== word[k]
              ) {
                match = false;
                break;
              }
            }
            if (match) {
              for (let k = 0; k < word.length; k++) {
                const rr = row + dir[0] * k;
                const cc = col + dir[1] * k;
                if (rr === r && cc === c) return "wjcell found";
              }
            }
          }
        }
      }
    }
    return "wjcell";
  };

  return (
    <div className="Jumble-container">
      <div className="wj-container">
        <div
          className="wj-grid"
          onMouseLeave={() => setIsMouseDown(false)}
          onMouseUp={handleMouseUp}
        >
          {grid.length > 0 &&
            grid.map((row, r) => (
              <div key={r} className="row">
                {row.map((letter, c) => (
                  <div
                    key={c}
                    className={getCellClass(r, c)}
                    onMouseDown={() => handleMouseDown(r, c)}
                    onMouseEnter={() => handleMouseEnter(r, c)}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            ))}
        </div>
        <div className="word-list">
          {words.map((word) => (
            <div
              key={word}
              className={`word-item ${
                found.includes(word) ? "found-word" : ""
              }`}
            >
              {word}
            </div>
          ))}
          <button className="shuffle-btn" onClick={setupNewGrid}>
            Shuffle Words
          </button>
        </div>
      </div>
    </div>
  );
}
