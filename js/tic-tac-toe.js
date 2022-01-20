// ? buat accordion
let log = ((v) => {
  setTimeout(() => {
    console.log(v)
  }, 200);
})

const accordionHead = document.querySelector(".ttt__main__header__rules__accordion__head")
const accordionContent = document.querySelector(".ttt__main__header__rules__accordion__content")
const arrowIcon = accordionHead.querySelector("i")
let headChild = Array.from(accordionContent.children)
let accStyle = getComputedStyle(accordionContent)
let accHeight = accStyle.height
let accPadding = accStyle.padding
accordionContent.style.height = "0"
accordionContent.style.padding = "0"
let check = false
// let swap = 1
// let swap2 = 2
accordionHead.addEventListener("click", () => {
  function swapCheck() { check = !check }
  swapCheck()

  arrowIcon.classList.toggle("rotate")
  // prevent transition on first load page
  accordionContent.classList.remove("hide")
  if (check) {
    accordionContent.style.height = accHeight
    accordionContent.style.padding = accPadding
  } else {
    accordionContent.style.height = "0"
    accordionContent.style.padding = "0"
  }
})

// ?  GAME PART
const overlay = document.querySelector(".overlay")
const overlayButtons = Array.from(overlay.children)
const cells = document.querySelectorAll(".ttt__main__content-wrapper__cell")
const result = document.querySelector(".result__text")


// score variable
const scoreHomeEl = document.querySelector(".score__home")
const scoreAwayEl = document.querySelector(".score__away")

// input shape variable
const inputCircle = document.querySelector(".input-circle")
const inputCross = document.querySelector(".input-cross")
const shapes = document.querySelectorAll(".shape")

// input dificulty variable
const dificulties = document.querySelectorAll(".dificulty")

// btn variable
const resetBtn = document.querySelector(".restart-btn")
const saveBtn = document.querySelector(".save-btn")

let mode
let circle

let scoreHome = 0
let scoreAway = 0

let win

let swap = () => { circle = !circle }
const winComb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// make array of number for the representation of the board
let cellKeys = Array.from(Array(9).keys())

let player = ''
let opponent = ''

let level = ""

// make a shape checker function
let chooseShape = (e) => {
  e.target.classList.contains("input-circle") ? circle = true : circle = false
  circle ? player = "circle" : player = "cross"
  circle ? opponent = "cross" : opponent = "circle"
}
// choose the shape and check for the shape every time
shapes.forEach(shape => {
  shape.addEventListener("click", chooseShape)
})
let chooseLevel = (e) => {
  if (e.target.classList.contains("easy")) {
    level = "easy"
  } else if (e.target.classList.contains("medium")) {
    level = "medium"
  } else {
    level = "hard"
  }
}
// choose the dificulty
dificulties.forEach(level => {
  level.addEventListener("click", chooseLevel)
})

// get score from local storage
function firstScore(keyHome, keyAway) {
  let dataScoreHome = JSON.parse(localStorage.getItem(keyHome))
  let dataScoreAway = JSON.parse(localStorage.getItem(keyAway))
  dataScoreHome ? scoreHome = dataScoreHome : scoreHome = 0
  dataScoreAway ? scoreAway = dataScoreAway : scoreAway = 0
  scoreHomeEl.textContent = scoreHome.toString()
  scoreAwayEl.textContent = scoreAway.toString()
}
//restart semua kotak jadi kosong
function empty() {
  cells.forEach(cell => {
    cell.style.pointerEvents = "auto"
    cell.classList.remove("circle")
    cell.classList.remove("cross")
  })
  cellKeys.forEach((key, idx) => {
    cellKeys[idx] = idx
  })
}

let gameStarted = false
// let switched = false
// overlay.classList.add("blur")
let executed1 = false
let executed2 = false
overlayButtons.forEach(btn => {
  btn.addEventListener("click", (() => {
    gameStarted = true
    // stop checking for shape
    shapes.forEach(shape => {
      shape.removeEventListener("click", chooseShape)
    })
    // stop checking for dificulties
    dificulties.forEach(level => {
      level.removeEventListener("click", chooseLevel)
    })


    // btn.stopPropagation()
    overlay.classList.add("blur")
    overlay.classList.remove("scale")
    // stop the interval when the game start
    if (btn.classList.contains("single")) {
      mode = "single"
      if (!executed1) {
        firstScore("singleHomeScore", "singleAwayScore")
      }
      executed1 = true
      executed2 = false
    } else {
      mode = "multi"
      if (!executed2) {
        firstScore("multiHomeScore", "multiAwayScore")
      }
      executed2 = true
      executed1 = false
    }
    console.log(executed1);
    console.log(executed2);
    // restart every cell box
    empty()
    // prevent input from clicked
    inputCircle.setAttribute("disabled", true)
    inputCross.setAttribute("disabled", true)
    // prevent dificulties input from clicked
    dificulties.forEach(level => {
      level.setAttribute("disabled", true)
    })
  }))
})

// start the game
startGame()

function startGame() {
  // default shape
  circle = false
  player = "cross"
  opponent = "circle"
  level = "easy"
  cells.forEach(cell => {
    cell.addEventListener("mouseover", ((e) => {
      // adding hover view  to the cell
      if (e.target.classList.contains("cirle") || e.target.classList.contains("cross")) {
        return;
      } else {
        if (circle) {
          e.target.classList.add("hover-circle")
        } else {
          e.target.classList.add("hover-cross")
        }
      }
    }))
    cell.addEventListener("mouseout", ((e) => {
      e.target.classList.remove("hover-circle")
      e.target.classList.remove("hover-cross")
      // }
    }))

    // ini event listener untuk mainnya antara single multi
    cell.addEventListener("click", gamestart)
  })
}
// function to place mark
function placeMark(e) {
  if (circle) {
    // e.target.classList.add("circle")
    cellKeys[e.target.id] = "circle"
  } else {
    // e.target.classList.add("cross")
    cellKeys[e.target.id] = "cross"
  }
  cells.forEach((cell, idx) => {
    cell.classList.add(cellKeys[idx])
  })

  e.target.classList.remove("hover-cross")
  e.target.classList.remove("hover-circle")
  // remove the eventlistener for cell
  e.target.style.pointerEvents = "none"
}

function gamestart(e) {
  // single player mode
  if (mode == "single") {
    singleMode(e)
  }
  // multiplayer mode
  else if (mode == "multi") {
    multiMode(e)
    // switch turns if not one win
    console.log(circle);
  }
}
// single mode
function singleMode(e) {
  placeMark(e)
  if (!checkWinSingle(player, opponent)) {
    opponentMove()
  }

  if (checkWinSingle(player, opponent)) {
    overlayBack()
    // enabled the choose shape again
    shapes.forEach(shape => {
      shape.addEventListener("click", chooseShape)
    })
    // enabled the chooseLevel again
    dificulties.forEach(level => {
      level.addEventListener("click", chooseLevel)
    })

    if (win) {
      result.textContent = "You Win"
      // add score
      scoreHome++
      scoreHomeEl.textContent = scoreHome.toString()
      noWinner = false
    } else {
      // kalo opponent yang menang swap lagi supaya balik ke player shapenya
      result.textContent = "You Lose"
      // add score
      scoreAway++
      scoreAwayEl.textContent = scoreAway.toString()
    }
  } else {
    checkDraw(false)
  }
}
function emptySquares() {
  // return cellKeys.map(key => if(key == "circle" || key == "cross"))
  // return cellKeys.filter(key => key.length < 2)
  return cellKeys.forEach(key => {
    if (key == "circle" || key == "cross") {
      key = undefined
    }
  })
  // console.log(cellKeys);
}

// const blockComb = [
//   [[0, 1], [1, 2], [0, 2]],
//   [[3, 4], [4, 5], [3, 5]],
//   [[6, 7], [7, 8], [6, 8]],
//   [[0, 3], [3, 6], [0, 6]],
//   [[1, 4], [4, 7], [1, 7]],
//   [[2, 5], [5, 8], [2, 8]],
//   [[0, 4], [4, 8], [0, 8]],
//   [[2, 4], [4, 6], [2, 6]],
// ]
// let danger = 0
// let danger2 = 0
// let dangerKey = 0

// function getDangerKey() {
//   switch (danger) {
//     case 0: case 1: case 2:
//       dangerKey = 0
//       break;
//     case 3: case 4: case 5:
//       dangerKey = 1
//       break;
//     case 6: case 7: case 8:
//       dangerKey = 2
//       break;
//     case 9: case 10: case 11:
//       dangerKey = 3
//       break;
//     case 12: case 13: case 14:
//       dangerKey = 4
//       break;
//     case 15: case 16: case 17:
//       dangerKey = 5
//       break;
//     case 18: case 19: case 20:
//       dangerKey = 6
//       break;
//     case 21: case 22: case 23:
//       dangerKey = 7
//       break;
//   }
// }

function opponentMove() {
  if (level == "easy") {
    console.log("easy");
    let availableCell = cellKeys.filter(key => typeof key == "number")
    // console.log(cellDuplicate);
    if (availableCell.length > 0) {
      cells[availableCell[0]].classList.add(opponent)
      cells[availableCell[0]].style.pointerEvents = "none"
      cellKeys[availableCell[0]] = opponent
    }
  }
  // medium
  else if (level == "medium") {
    console.log("medium");
    // kalau yang tengah blom diisi maka isi yang tengah
    // if (typeof cellKeys[4] == "number") {
    //   cells[cellKeys[4]].classList.add(opponent)
    //   cells[cellKeys[4]].style.pointerEvents = "none"
    //   cellKeys[4] = opponent
    // } else {
    // kalau ada yang danger yang diisi
    // if (checkDanger(player)) {
    //   console.log("danger");
    //   getDangerKey()
    //   console.log("danger :" + danger);
    //   console.log("danger2 :" + danger2);
    //   // console.log(dangerKey);
    //   // dangerCell = Array.from(cellKeys[dangerKey])
    //   // let availableDangerCell = cellKeys[dangerKey].filter(key => typeof key == "number")
    //   // console.log(availableDangerCell);
    //   blockComb[danger][danger2] = []
    //   console.log(blockComb);

    // }
    // // kalau ndak ada yang danger diisi
    // else {
    //   let availableCell = cellKeys.filter(key => typeof key == "number")
    //   // console.log(cellDuplicate);
    //   if (availableCell.length > 0) {
    //     // kalo tengah sudah diisi maka isi berurutan
    //     cells[availableCell[0]].classList.add(opponent)
    //     cells[availableCell[0]].style.pointerEvents = "none"
    //     cellKeys[availableCell[0]] = opponent
    //   }
    // }
    // }
  }
  // hard
  else {
    // let index = minimax(board, opponent).index
    // let selector = "#" + index

    // cellKeys[index] = opponent
    // console.log(cellKeys);
    // console.log(index);
    // console.log("hard");
  }
}
//===========================================================
//===========================================================


// multi mode
function multiMode(e) {
  const currentClass = circle ? "circle" : "cross"
  // place mark
  placeMark(e)

  // check for win
  if (checkWin(currentClass)) {
    overlayBack()
    // enabled the shape checker
    shapes.forEach(shape => {
      shape.addEventListener("click", chooseShape)
    })
    if (currentClass == player) {
      result.textContent = player + " Win"
      // add score
      scoreHome++
      scoreHomeEl.textContent = scoreHome.toString()
    } else {
      // kalo opponent yang menang swap lagi supaya balik ke player shapenya
      swap()
      result.textContent = opponent + " win"
      // add score
      scoreAway++
      scoreAwayEl.textContent = scoreAway.toString()
    }
    return
  } else {
    // kalo blom ada yang menang swap shapenya
    swap()
  }
  // check if there's no winner
  checkDraw(true)
}

// enabled input from clicked
function overlayBack() {
  inputCircle.removeAttribute("disabled")
  inputCross.removeAttribute("disabled")
  dificulties.forEach(level => {
    level.removeAttribute("disabled")
  })
  overlay.classList.add("scale")
  overlay.classList.remove("blur")
}

// function untuk check menang multi
// function checkWin(currentClass) {
function checkWin(currentClass) {
  // function untuk check ada ndak combinasi yang bener
  return winComb.some(combination => {
    // kombinasi yang bener tu di tentukan kalo semua index dari kombinasi itu benar
    return combination.every(index => {
      // check untuk setiap index yang ada di salah satu kombinasi apakah element cell dengan index yang sama dengan index di dalam kombinasinya punya class yang sama semua ndak
      // return cells[index].classList.contains(currentClass)
      return cellKeys[index] == currentClass
    })
  })
}
function checkWinSingle(player, opponent) {
  // function untuk check ada ndak combinasi yang bener
  return winComb.some(combination => {
    let playerWin = combination.every(index => {
      return cellKeys[index] == player
    })
    let opponentWin = combination.every(index => {
      return cellKeys[index] == opponent
    })
    if (playerWin) {
      win = true
      return playerWin
    } else {
      win = false
      return opponentWin
    }
  })
}

function checkDraw(boolean) {
  // check for draw
  if (cellKeys.every(key => key == "circle" || key == "cross")) {
    result.textContent = "Draw"
    overlayBack()
    // karna setiap mulai main baru shape pasti di swap maka tinggal swap balik aja pas menang
    // buat dia swap untuk multiplayer aja
    if (boolean) {
      swap()
    }
  }
}
// function checkDanger(player) {
//   // function untuk check ada ndak combinasi yang bener
//   return blockComb.some((combination, idx1) => {
//     // kombinasi yang bener tu di tentukan kalo semua index dari kombinasi itu benar
//     danger = idx1
//     console.log(danger);
//     return combination.some((comb, idx2) => {
//       return comb.every(index => {
//         // check untuk setiap index yang ada di salah satu kombinasi apakah element cell dengan index yang sama dengan index di dalam kombinasinya punya class yang sama semua ndak
//         // return cells[index].classList.contains(currentClass)
//         danger2 = idx2
//         // blockComb[idx1][idx2] = 2
//         return cellKeys[index] == player
//       })
//     })
//   })
// }

// ========================
// btn event listener 
// ======================== 
saveBtn.addEventListener("click", save)
const saveMessage = document.querySelector(".saved-message")
function save(e) {
  e.preventDefault()
  saveMessage.classList.add("open")
  saveMessage.style.pointerEvents = "none"
  setTimeout(() => {
    saveMessage.style.pointerEvents = "auto"
    saveMessage.classList.remove("open")
  }, 1500);

  if (mode == "single") {
    localStorage.setItem("singleHomeScore", JSON.stringify(scoreHome))
    localStorage.setItem("singleAwayScore", JSON.stringify(scoreAway))
  } else {
    localStorage.setItem("multiHomeScore", JSON.stringify(scoreHome))
    localStorage.setItem("multiAwayScore", JSON.stringify(scoreAway))
  }
}

resetBtn.addEventListener("click", reset)
function reset() {
  if (confirm("are you sure?")) {
    scoreHome = 0
    scoreAway = 0
    scoreHomeEl.textContent = scoreHome.toString()
    scoreAwayEl.textContent = scoreAway.toString()
    localStorage.removeItem("multiHomeScore")
    localStorage.removeItem("multiAwayScore")
    if (gameStarted) {
      empty()
      overlayBack()
    }
  }
}

// const recursive = ((num) => {
//   console.log(num);
//   if (num < 100) {
//     recursive(num + 1)
//   }
// })
// recursive(10)

// let factorial = ((num) => {
//   return (num > 0) ? num * factorial(num - 1) : 1
// })
// console.log(factorial(5))

// function increase() {
//   let num = 0
//   function increaseNum() {
//     num++
//     return num
//   }
//   return increaseNum
// }
// const increment = increase()

// let math = () => {
//   let counter = 0
//   function incre() {
//     function incre1() {
//       counter++
//       return counter
//     }
//     function incre5() {
//       counter += 5
//       return counter
//     }
//     function incre10() {
//       counter += 10
//     }
//     return {
//       incre1,
//       incre5,
//       incre10,
//     }
//   }
//   function decre() {
//     counter--
//   }
//   function divis() {
//     counter /= 2
//   }
//   function multi() {
//     counter *= 2
//   }
//   function getValue() {
//     return counter
//   }
//   return {
//     incre,
//     decre,
//     divis,
//     multi,
//     getValue,
//   }
// }

// let operation = math()
// console.log(operation);
// let incre = operation.incre();
// operation.incre().incre10();
// operation.incre().incre10();
// operation.incre().incre10();
// operation.decre();
// operation.decre();
// operation.decre();
// operation.decre();
// operation.decre();
// operation.multi();
// operation.multi();
// operation.incre().incre10();
// operation.divis();
// console.log(operation.getValue());