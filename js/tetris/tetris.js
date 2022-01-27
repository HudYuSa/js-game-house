const accordionHead3 = document.querySelector(
  ".tetris__main__header__rules__accordion__head"
);
const accordionContent3 = document.querySelector(
  ".tetris__main__header__rules__accordion__content"
);
const arrowIcon3 = accordionHead3.querySelector("#tetris-icon");
let headChild3 = Array.from(accordionContent3.children);
let accStyle3 = getComputedStyle(accordionContent3);
let accHeight3 = accStyle3.height;
let accPadding3 = accStyle3.padding;
accordionContent3.style.height = "0";
accordionContent3.style.padding = "0";
let check3 = false;
// let swap = 1
// let swap2 = 2
accordionHead3.addEventListener("click", () => {
  function swapCheck3() {
    check3 = !check3;
  }
  swapCheck3();

  arrowIcon3.classList.toggle("rotate");
  // prevent transition on first load page
  accordionContent3.classList.remove("hide");
  if (check3) {
    accordionContent3.style.height = accHeight3;
    accordionContent3.style.padding = accPadding3;
  } else {
    accordionContent3.style.height = "0";
    accordionContent3.style.padding = "0";
  }
});
