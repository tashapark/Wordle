const dictionary = [
  "earth",
  "plane",
  "world",
  "audio",
  "mouse",
  "house",
  "river",
  "phone",
  "bread",
  "happy",
  "color",
  "green",
  "stuff",
  "money",
];

const state = {
  // data를 dom이랑 분리하고 싶대.. ?
  secret: dictionary[Math.floor(Math.random() * dictionary.length)],
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill("")), //2d grid를 만듬. 6행 5열.. 문자 채우게
  currentRow: 0, //처음 시작은 0이니까
  currentCol: 0,
};

function updateGrid() {
  //게임 상태에 맞춰서 ui를 업그레이드 하려는 것. 박스 만들 때  쓴 거 가지고 왔음.
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, letter = "") {
  // 안에 4개 인수가 포함.
  const box = document.createElement("div");
  box.className = "box";
  box.id = `box${row}${col}`;
  box.textContent = letter; // 박스 안의 문자는 레터로

  container.appendChild(box); //div 추가하고
  return box; // box로 나오게
}

function drawGrid(container) {
  //drawbox랑 왜 별개지?
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < 6; i++) {
    //행에서 0-6까지 이동 루프
    for (let j = 0; j < 5; j++) {
      // 열에서 0-5까지 이동}
      drawBox(grid, i, j); //각 반복에 대해서 그리드를 그리고 싶음. 컨테이너 자체가 되고 행 i, 열은 j
    }
  }
  container.appendChild(grid);
}

function registerKeyboardEvents() {
  document.body.onkeydown = (e) => {}; //e = event
  const key = e.key;
  if (key === "Enter") {
    if (state.currentCol === 5) {
      // 넘어가기 전에 한 줄 다 채워 졌는지
      const word = getCurrentWorld();
      if (isWordValid(word)) {
        revealWord(word);
        state.currentRow++; //valid하니깐 다음 줄로 넘어가
        state.currentCol = 0;
      } else {
        alert("Not a valid word.");
      }
    }
  }
  if (key === "Backspace") {
    removeLetter();
  }
  if (isLetter(key)) {
    addLetter(key);
  }
}

function getCurrentWorld() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
  //reduce가 콜백 펑션으로 이전꺼 현재꺼 더해서 가지고 옴.
}

function isWordValid(word) {
  return dictionary.includes(word);
}

function startup() {
  //처음에 하고 싶을 때 여기서 수행되게

  const game = document.getElementById("game");
  drawGrid(game);

  registerKeyboardEvents();
}
startup();
