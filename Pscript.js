"use strict";

// Grab every button ever
const btnA1 = document.querySelector(".btn_A1");
const btnA2 = document.querySelector(".btn_A2");
const btnA3 = document.querySelector(".btn_A3");

const btnPrologue = document.querySelector(".btn_prologue");
const btnEpilogue = document.querySelector(".btn_epilogue");

const btnA1_1 = document.querySelector(".btn_A1_1");
const btnA1_2 = document.querySelector(".btn_A1_2");
const btnA1_3 = document.querySelector(".btn_A1_3");
const btnA1_4 = document.querySelector(".btn_A1_4");

const btnA2_1 = document.querySelector(".btn_A2_1");
const btnA2_2 = document.querySelector(".btn_A2_2");
const btnA2_3 = document.querySelector(".btn_A2_3");

const btnDisplay = document.querySelector(".btn_display");
const btnSolved = document.querySelector(".btn_solved");
const btnTimeout = document.querySelector(".btn_timeout");
const btnReset = document.querySelector(".btn_reset");

const roomName = document.querySelector(".room_name");
const actName = document.querySelector(".act_name");
const timerSection = document.querySelector(".timer_section");

const puzzleImage = document.querySelector(".puzzle_image");

let actNum = 0;
let phase = 0;
let room = "";
let totalSecs,
  min,
  sec = 0;
let timer;
let timerVisibility = true;
let didTheyFinish = false;
let displayOn = false;

// CLEAR ALL SELECTED
const clearSelected = function (btnType) {
  if (btnType == "act" || btnType == "all") {
    btnA1.classList.remove("selected");
    btnA2.classList.remove("selected");
    btnA3.classList.remove("selected");
    btnPrologue.classList.remove("selected");
    btnEpilogue.classList.remove("selected");
  }
  if (btnType == "phase" || btnType == "all") {
    btnA1_1.classList.remove("Pselected");
    btnA1_2.classList.remove("Pselected");
    btnA1_3.classList.remove("Pselected");
    btnA1_4.classList.remove("Pselected");

    btnA2_1.classList.remove("Pselected");
    btnA2_2.classList.remove("Pselected");
    btnA2_3.classList.remove("Pselected");
  }
  if (btnType == "action" || btnType == "all") {
    btnDisplay.classList.remove("selected");
    btnSolved.classList.remove("selected");
    btnTimeout.classList.remove("selected");
  }
  if (btnType == "solved") {
    btnA1_1.classList.remove("Psolved");
    btnA1_2.classList.remove("Psolved");
    btnA1_3.classList.remove("Psolved");
    btnA1_4.classList.remove("Psolved");
    btnA2_1.classList.remove("Psolved");
    btnA2_2.classList.remove("Psolved");
    btnA2_3.classList.remove("Psolved");
  }
};

// Clear it all to start with, just in case
clearSelected("all");

// BACKGROUND CHANGE - Get dynamic image for background based on what act
const getImage = function (actNum) {
  return `ProgramControl_act${actNum}.png`;
};

// TIMER AND TIMEOUT
const startTimer = function (min, sec) {
  totalSecs = min * 60 + sec;
  const tick = function () {
    // This is the function to actually make the numbers change
    min = Math.floor(totalSecs / 60);
    sec = totalSecs - min * 60;
    totalSecs--;
    if (timerVisibility)
      timerSection.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
    if (totalSecs < 0) {
      clearInterval(timer);
      timeoutButton();
    }
    console.log(totalSecs);
  };

  tick(); // This calls tick() once because interval delays a second
  timer = setInterval(tick, 1000); // This repeatedly calls the numbers to create the countdown

  return timer;
};

// SELECTING ACT ////////////////////////
btnA1.addEventListener("click", function (e) {
  e.preventDefault();
  phase = 0;
  selectAct1();
  clearSelected("solved");
  clearInterval(timer);
  displayOn = false;
  didTheyFinish = false;
  puzzleImage.src = getImage(0);
});

btnA2.addEventListener("click", function (e) {
  e.preventDefault();
  phase = 0;
  selectAct2();
  clearInterval(timer);
  displayOn = false;
  puzzleImage.src = getImage(0);
});

btnA3.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("all");
  phase = 0;
  btnA3.classList.add("selected");
  btnDisplay.classList.remove("hide");
  newActClassShift();
  actNum = "3";
  actName.textContent = `Act ${actNum}`;
  displayOn = true;
  puzzleImage.src = getImage(0);
});

// SELECTING PROL/EPIL ////////////////////
btnPrologue.addEventListener("click", function (e) {
  e.preventDefault();
  timerVisibility = false;
  clearSelected("all");
  btnPrologue.classList.add("selected");
  puzzleImage.classList.add("Xborder");
  timerSection.classList.add("Xborder");
  btnDisplay.classList.remove("hide");
  actName.textContent = `Prologue`;
  puzzleImage.src = "prol-epil.png";
});

btnEpilogue.addEventListener("click", function (e) {
  e.preventDefault();
  timerVisibility = false;
  clearSelected("all");
  btnEpilogue.classList.add("selected");
  puzzleImage.classList.add("Xborder");
  timerSection.classList.add("Xborder");
  btnDisplay.classList.remove("hide");
  actName.textContent = `Epilogue`;
  puzzleImage.src = "prol-epil.png";
});

// SELECTING PHASE ////////////////////////
btnA1_1.addEventListener("click", function (e) {
  e.preventDefault();
  phase = 1;
  // If they didn't finish the puzzle:
  if (actNum == 1) selectAct1();
  else {
    selectAct2();
    startTimer(min, sec);
  }
  btnA1_1.classList.add("Pselected");
  puzzleImage.src = getImage("1-1");
  timerBGchange("countdown");
  timerVisibility = true;
  clearInterval(timer);
  startTimer(min, sec);
});

btnA1_2.addEventListener("click", function (e) {
  e.preventDefault();
  btnA1_2_GO();
});

const btnA1_2_GO = function () {
  phase = 2;
  // If they didn't finish the puzzle:
  if (actNum == 1) selectAct1();
  else {
    selectAct2();
    if (totalSecs <= 0) startTimer(min, sec);
  }
  // Highlight the button and grab next image:
  btnA1_2.classList.add("Pselected");
  puzzleImage.src = getImage("1-2");
  timerBGchange("countdown");
  timerVisibility = true;
};

btnA1_3.addEventListener("click", function (e) {
  e.preventDefault();
  btnA1_3_GO();
});

const btnA1_3_GO = function () {
  phase = 3;
  // If they didn't finish the puzzle:
  if (actNum == 1) selectAct1();
  else {
    selectAct2();
    if (totalSecs <= 0) startTimer(min, sec);
  }
  // Highlight the button and grab next image:
  btnA1_3.classList.add("Pselected");
  puzzleImage.src = getImage("1-3");
  timerBGchange("countdown");
  timerVisibility = true;
};

btnA1_4.addEventListener("click", function (e) {
  e.preventDefault();
  btnA1_4_GO();
});

const btnA1_4_GO = function () {
  phase = 4;
  // If they didn't finish the puzzle:
  if (actNum == 1) selectAct1();
  else {
    selectAct2();
    if (totalSecs <= 0) startTimer(min, sec);
  }
  // Highlight the button and grab next image:
  btnA1_4.classList.add("Pselected");
  puzzleImage.src = getImage("1-4");
  timerBGchange("countdown");
  timerVisibility = true;
};

btnA2_1.addEventListener("click", function (e) {
  e.preventDefault();
  btnA2_1_GO();
});

const btnA2_1_GO = function () {
  phase = 5;
  selectAct2();
  btnA2_1.classList.add("Pselected");
  puzzleImage.src = getImage("2-1");
  timerBGchange("countdown");
  timerVisibility = true;
  if ((actNum == 2) & (totalSecs <= 0)) {
    clearInterval(timer);
    startTimer(min, sec);
  }
};

btnA2_2.addEventListener("click", function (e) {
  e.preventDefault();
  btnA2_2_GO();
});

const btnA2_2_GO = function () {
  phase = 6;
  selectAct2();
  btnA2_2.classList.add("Pselected");
  puzzleImage.src = getImage("2-2");
  timerBGchange("countdown");
  timerVisibility = true;
};

btnA2_3.addEventListener("click", function (e) {
  e.preventDefault();
  btnA2_3_GO();
});

const btnA2_3_GO = function () {
  phase = 7;
  selectAct2();
  btnA2_3.classList.add("Pselected");
  puzzleImage.src = getImage("2-3");
  timerBGchange("countdown");
  timerVisibility = true;
};

// CHANGING MODE ////////////////////////

btnDisplay.addEventListener("click", function (e) {
  e.preventDefault();
  if (displayOn) {
    timerBGchange("countdown");
    timerVisibility = true;
    clearSelected("phase");
    clearSelected("action");
    btnDisplay.classList.add("selected");
    puzzleImage.src = getImage(actNum);
    clearInterval(timer);
    startTimer(12, 28); // only does this for Act 3
  }
});

btnSolved.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("action");
  btnSolved.classList.add("selected");
  // puzzleImage.src = getImage("S"); // Don't need anymore?
  timerBGchange("solved");
  timerSection.textContent = "";
  timerVisibility = false;
  if (actNum == 1 && phase == 4) didTheyFinish = true;

  // This part is ProgramControl-specific to go to next phase, if applicable
  if (actNum == 1 || actNum == 2) {
    setTimeout(function () {
      // Switch to next phase if applicable
      switch (phase) {
        case 1:
          btnA1_1.classList.add("Psolved");
          btnA1_1.textContent = "1Solved";
          if (totalSecs > 2) btnA1_2_GO();
          break;
        case 2:
          btnA1_2.classList.add("Psolved");
          btnA1_2.textContent = "2Solved";
          if (totalSecs > 2) btnA1_3_GO();
          break;
        case 3:
          btnA1_3.classList.add("Psolved");
          btnA1_3.textContent = "3Solved";
          if (totalSecs > 2) btnA1_4_GO();
          break;
        case 4:
          btnA1_4.classList.add("Psolved");
          btnA1_4.textContent = "4Solved";
          if (totalSecs > 2 && actNum == 2) btnA2_1_GO();
          break;
        case 5:
          btnA2_1.classList.add("Psolved");
          btnA2_1.textContent = "5Solved";
          if (totalSecs > 2) btnA2_2_GO();
          break;
        case 6:
          btnA2_2.classList.add("Psolved");
          btnA2_2.textContent = "6Solved";
          if (totalSecs > 2) btnA2_3_GO();
          break;
        case 7:
          btnA2_3.classList.add("Psolved");
          btnA2_3.textContent = "7Solved";
          break;
        default:
          //code
          break;
      }
    }, 2000);
  } else {
  }
});

// WHEN IT TIMES OUT - No longer a button, but triggered on timeout
const timeoutButton = function () {
  timerSection.classList.add("timer_bg_empty");
  timerSection.textContent = "";
  timerBGchange("empty");
  puzzleImage.src = getImage("TO");
  btnTimeout.classList.remove("hide");
  btnSolved.classList.add("hide");
  switch (phase) {
    case 1:
      btnA1_1.classList.remove("Pselected");
      break;
    case 2:
      btnA1_2.classList.remove("Pselected");
      break;
    case 3:
      btnA1_3.classList.remove("Pselected");
      break;
    case 4:
      btnA1_4.classList.remove("Pselected");
      break;
    default:
      //code
      break;
  }
};

// FUNCTIONS TO SELECT ACTS - ONLY NEEDED FOR PROGRAM CONTROL
const selectAct1 = function () {
  clearSelected("all");
  btnA1.classList.add("selected");
  btnDisplay.classList.add("hide");
  newActClassShift();
  actNum = "1";
  actName.textContent = `Act ${actNum}`;
  // For testing
  // min = 0;
  // sec = 18;
  min = 12;
  sec = 4;
};

const selectAct2 = function () {
  clearSelected("all");
  btnA2.classList.add("selected");
  btnDisplay.classList.add("hide");
  newActClassShift();
  actNum = "2";
  actName.textContent = `Act ${actNum}`;
  // For testing
  //  min = 0;
  // sec = 30;
  min = 13;
  sec = 18;
};

// CHANGE CLASSES TO START ACT
const newActClassShift = function () {
  btnTimeout.classList.add("hide");
  btnSolved.classList.remove("hide");
  puzzleImage.classList.remove("Xborder");
  timerSection.classList.remove("Xborder");
};

// CHANGE BACKGROUND IMAGE OF TIMER based on which property is passed in
const timerBGchange = function (which) {
  timerSection.classList.remove("timer_bg_empty");
  timerSection.classList.remove("timer_bg_countdown");
  timerSection.classList.remove("timer_bg_solved");
  timerSection.classList.add(`timer_bg_${which}`);
  return;
};

// Add "LOADING" graphic underneath just in case?
