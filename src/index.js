// Open the modal window
const modalButtons = document.querySelectorAll(".button-modal");
const modalWindow = document.querySelector("#login");

function openModalWindow() {
  modalWindow.classList.toggle("open");
}

modalButtons.forEach(button => {
  button.addEventListener("click", () => openModalWindow());
});

// Open burger menu
const menuButton = document.querySelector(".menu__button");
const menu = document.querySelector(".header-section__nav");
const body = document.querySelector(".body");
const menuList = document.querySelector(".nav__nav-list");

menuButton.addEventListener("input", () => {
  menuButton.classList.toggle("open")
  menu.classList.toggle("open");
  body.classList.toggle("overflow-disabled");

  menuList.addEventListener("click", event => {
    let link = event.target;
    console.log(link)
    if (link.classList.contains("plain-item") || link.classList.contains("submenu-item__header")) {
      menuButton.classList.remove("open")
      menu.classList.remove("open");
      body.classList.remove("overflow-disabled");
    }
  })
});

// Change language 
const langTrigger = document.querySelector(".lang__trigger");
const langList = document.querySelector(".lang__wrapper");
const langValue = document.querySelector(".lang__value");
const valueArray = document.querySelectorAll(".lang-list__label");
const inputArray = document.querySelectorAll(".lang-list__input");

function changeCheckedLang(id) {
  inputArray.forEach(input => {
    input.removeAttribute("checked");
  });
  inputArray[id].setAttribute("checked", "true")
}

langTrigger.addEventListener("input", () => {
  langList.classList.toggle("open-lang");
});

valueArray.forEach(value => {
  value.addEventListener("click", () => {
    langValue.innerHTML = value.getAttribute("data-lang") + "<span class='trigger-icon'></span>";
    langList.classList.toggle("open-lang");
    changeCheckedLang(Array.from(valueArray).indexOf(value));
  });
});

// Change security icon 
const benefitsButtons = document.querySelectorAll(".benefits-item__button");


benefitsButtons.forEach(button => {
  const id = button.getAttribute("id");
  const benefitsLink = document.querySelector(`[data-id="${id}"]`);
  const benefitsIcon = document.querySelector(`[data-id="${id}"] .benefit-link__icon`);
  console.log(benefitsIcon)
  button.addEventListener("input", () => {
    if (button.checked) {
      benefitsLink.innerHTML = "<span class='benefit-link__icon checked'></span>";
      benefitsLink.classList.toggle("checked");
    } else {
      benefitsLink.innerHTML = "Learn more <span class='benefit-link__icon'></span>";
      benefitsLink.classList.toggle("checked");
    }
  })
})

// Slider
const sliderList = document.querySelector(".slider__list");
const slides = document.querySelectorAll(".slider-item");
const buttons = document.querySelectorAll(".controls__arrow");
const pagButtons = document.querySelectorAll(".controls__pag-input");
const pagLabels = document.querySelectorAll(".controls__pag-label");

// Slider - Counting the list offset
function countOffset() {
  return Math.abs(parseInt(window.getComputedStyle(sliderList).left))
}

// Slider - Counting the width of the block 
function countBlockWidth() {
  const slide = slides[0];
  return Math.abs(parseInt(window.getComputedStyle(slide).width))
}

// Slider - Set classes
function setClasses(direction, id) {
  slides.forEach(item => item.classList = "slider__list-item slider-item list-item")

  if (direction === "left") {
    id = id;
  } else {
    id = id - 1;
  }

  slides[id].classList.add("current-slide");
  if (id > 0) {
    slides[id - 1].classList.add("prev-slide");
  }

  if (id < 5) {
    slides[id + 1].classList.add("next-slide");
  }
}

// Slider - HIde buttons 
function hideButton(id) {
  const rightButton = document.querySelector(".arrow-right");
  const leftButton = document.querySelector(".arrow-left");

  if (id === 0) {
    leftButton.disabled = true;
  } else {
    leftButton.disabled = false;
  }

  if (id === 5) {
    rightButton.disabled = true;
  } else {
    rightButton.disabled = false;
  }
}

// Slider - Translate list
function translateList(direction, offset) {
  if (direction === "right") {
    offset += countOffset();
  } else {
    offset = countOffset() - offset;
  }
  
  sliderList.style.left = `${-offset}px`;
}

buttons.forEach(button => {
  button.addEventListener("click", event => {
    let curPagBut = document.querySelector(".controls__pag-input[checked]");
    let newPagButIndex;
    let direction;
    console.log(curPagBut)
    if (event.target.classList.contains("arrow-left")) {
      direction = "left";
      if (Array.from(pagButtons).indexOf(curPagBut) !== 0) {
          newPagButIndex = Array.from(pagButtons).indexOf(curPagBut) - 1;
          hideButton(newPagButIndex)
        if (newPagButIndex > -1) {
          translateList(direction, countBlockWidth());
          setClasses(direction, newPagButIndex);
          
        }
      }
    } else {
      direction = "right";
      if (Array.from(pagButtons).indexOf(curPagBut) !== 5) {
        newPagButIndex = Array.from(pagButtons).indexOf(curPagBut) + 1;
        hideButton(newPagButIndex)
        if (newPagButIndex < 6) {
          translateList(direction, countBlockWidth());
          setClasses(direction, newPagButIndex + 1);
        }
      }
    }

    setPagination(pagButtons[newPagButIndex]);
  });
});

// Slider - Change pagination
pagButtons.forEach(pagBut => {
  let curPagBut;
  let newPagBut;
  let slidesNum;
  
  pagBut.addEventListener("click", event => {
    newPagBut = event.target;
    curPagBut = document.querySelector(".controls__pag-input[checked]");
    console.log(curPagBut)
    let curValue = Number(curPagBut.value);
    let newValue = Number(newPagBut.value);

    console.log(newValue, curValue)
    if (newValue > curValue) {
      slidesNum = newValue - curValue;
      translateList("right", countBlockWidth() * slidesNum)
      setClasses("right", newValue)
      hideButton(newValue - 1)
      setPagination(newPagBut);
    } else {
      slidesNum = curValue - newValue;
      setClasses("left", newValue - 1)
      translateList("left", countBlockWidth() * slidesNum)
      hideButton(newValue - 1)
      setPagination(newPagBut);
    }    
    
  });
})

function setPagination(newPagBut) {
  pagButtons.forEach(button => button.removeAttribute("checked"));
  pagLabels.forEach(label => label.classList.remove("checked"));
  newPagBut.setAttribute("checked", "true");
  const id = newPagBut.value;
  console.log(document.querySelector(`[data-slide="${4}"`))
  document.querySelector(`[data-slide="${id}"`).classList.toggle("checked");
}