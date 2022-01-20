
const accordionHead2 = document.querySelector(".breakout__main__header__rules__accordion__head")
const accordionContent2 = document.querySelector(".breakout__main__header__rules__accordion__content")
const arrowIcon2 = accordionHead2.querySelector("#breakout-icon")
let headChild2 = Array.from(accordionContent2.children)
let accStyle2 = getComputedStyle(accordionContent2)
let accHeight2 = accStyle2.height
let accPadding2 = accStyle2.padding
accordionContent2.style.height = "0"
accordionContent2.style.padding = "0"
let check2 = false
// let swap = 1
// let swap2 = 2
accordionHead2.addEventListener("click", () => {
  function swapCheck2() { check2 = !check2 }
  swapCheck2()

  arrowIcon.classList.toggle("rotate")
  // prevent transition on first load page
  accordionContent2.classList.remove("hide")
  if (check2) {
    accordionContent2.style.height = accHeight2
    accordionContent2.style.padding = accPadding2
  } else {
    accordionContent2.style.height = "0"
    accordionContent2.style.padding = "0"
  }
})