const boxWrapper = document.querySelector(".main__box-wrapper")
{/* <div class="box  box1 normal">
  <img src="img/weather.png" alt="game img" class="box__img">
    <h2 class="box__title">Game Title</h2>
</div> */}

let createBox = ((className, idName, img, text, ratio) => {
  let div = document.createElement("div")
  div.classList.add("box")
  div.classList.add(className)
  div.setAttribute("id", idName)
  div.classList.add(ratio)
  let image = document.createElement("img")
  image.setAttribute("src", img)
  image.setAttribute("alt", "game img")
  image.classList.add("box__img")
  let h2 = document.createElement("h2")
  h2.classList.add("box__title")
  let h2Text = document.createTextNode(text)

  div.appendChild(image)
  h2.appendChild(h2Text)
  div.appendChild(h2)

  return div
})

let addBox = [
  // class ,id, img , title , ratio
  createBox("tic-tac-toe", "ttt", "https://ik.imagekit.io/hudyusuf/tic-tac-toe_OZztXKSE4ul.png?updatedAt=1641949737971", "Tic Tac Toe", "normal"),
  createBox("other-game", "other", "./img/weather.png", "other-game", "normal"),
  createBox("other-game", "other", "./img/weather.png", "other-game", "normal"),
  // createBox("other-game", "other", "./img/calculator.png", "calculator", "height"),
  // createBox("other-game", "other", "./img/calculator.png", "calculator", "height"),
  // createBox("other-game", "other", "./img/weather.png", "other-game", "normal"),
]
addBox.forEach(box => {
  boxWrapper.appendChild(box)
})

const aside = document.querySelector(".game-wrapper")
const asideStyle = getComputedStyle(aside)
const main = document.querySelector(".main")
const mainStyle = getComputedStyle(main)
const gameSections = aside.querySelectorAll("section")
const boxes = document.querySelectorAll(".box")
const closeBtn = document.querySelector(".close-btn")

boxes.forEach(box => {
  box.addEventListener("click", reveal)
})
function reveal(e) {
  aside.classList.add("reveal")
  aside.classList.remove("hidden")
  setTimeout(() => {
    main.style.display = "none"
  }, 750);
  gameSections.forEach(section => {
    if (section.classList.contains(e.target.id)) {
      section.style.display = "block"
    } else {
      section.style.display = "none"
    }
  })
}

closeBtn.addEventListener("click", () => {
  main.style.display = "block"
  aside.classList.remove("reveal")
  aside.classList.add("hidden")
})