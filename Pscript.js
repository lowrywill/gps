"use strict";

// Grab every button ever
const btnA1 = document.querySelector(".btn_A1");
const btnA2 = document.querySelector(".btn_A2");
const btnA3 = document.querySelector(".btn_A3");

// REMEMBER TO MAKE THIS A PSCRIPT.JS FILE TODO

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
let room = "";
let totalSecs,
  min,
  sec = 0;
let timer;

// CLEAR ALL SELECTED
const clearSelected = function (btnType) {
  if (btnType == "act" || btnType == "all") {
    btnA1.classList.remove("selected");
    btnA2.classList.remove("selected");
    btnA3.classList.remove("selected");
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
};

clearSelected("all");

// Get dynamic image
const getImage = function (actNum) {
  return `ProgramControl_act${actNum}.png`;
};

// TIMER AND TIMEOUT
const startTimer = function (min, sec) {
  totalSecs = min * 60 + sec;
  const tick = function () {
    // console.log(`The timer for ${min} min and ${sec.toString().padStart(2, "0")} sec has started...`);
    min = Math.floor(totalSecs / 60);
    sec = totalSecs - min * 60;
    totalSecs--;
    timerSection.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
    if (totalSecs < 0) {
      clearInterval(timer);
      timeoutButton();
    }
  };

  tick();
  timer = setInterval(tick, 1000);

  return timer;
};

// SELECTING ACT ////////////////////////
btnA1.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("all");
  btnA1.classList.add("selected");
  btnDisplay.classList.add("hide");
  actNum = "1";
  actName.textContent = `Act ${actNum}`;
  // Eventually replace the above with:
  // selectAct1();
  puzzleImage.src = getImage(0);
});

btnA2.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("all");
  btnA2.classList.add("selected");
  btnDisplay.classList.add("hide");

  actNum = "2";
  actName.textContent = `Act ${actNum}`;
  // Eventually replace the above with:
  // selectAct2();
  puzzleImage.src = getImage(0);
});

btnA3.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("all");
  btnA3.classList.add("selected");
  btnDisplay.classList.remove("hide");
  actNum = "3";
  actName.textContent = `Act ${actNum}`;
  puzzleImage.src = getImage(0);
});

// SELECTING PHASE ////////////////////////
btnA1_1.addEventListener("click", function (e) {
  e.preventDefault();
  selectAct1();
  btnA1_1.classList.add("Pselected");
  puzzleImage.src = getImage("1-1");
  clearInterval(timer);
  startTimer(11, 0);
});

btnA1_2.addEventListener("click", function (e) {
  e.preventDefault();
  selectAct1();
  btnA1_2.classList.add("Pselected");
  puzzleImage.src = getImage("1-2");
});

btnA1_3.addEventListener("click", function (e) {
  e.preventDefault();
  selectAct1();
  btnA1_3.classList.add("Pselected");
  puzzleImage.src = getImage("1-3");
});

btnA1_4.addEventListener("click", function (e) {
  e.preventDefault();
  selectAct1();
  btnA1_4.classList.add("Pselected");
  puzzleImage.src = getImage("1-4");
});

btnA2_1.addEventListener("click", function (e) {
  e.preventDefault();
  selectAct2();
  btnA2_1.classList.add("Pselected");
  puzzleImage.src = getImage("2-1");
  clearInterval(timer);
  startTimer(11, 0);
});

btnA2_2.addEventListener("click", function (e) {
  e.preventDefault();
  selectAct2();
  btnA2_2.classList.add("Pselected");
  puzzleImage.src = getImage("2-2");
});

btnA2_3.addEventListener("click", function (e) {
  e.preventDefault();
  selectAct2();
  btnA2_3.classList.add("Pselected");
  puzzleImage.src = getImage("2-3");
});

// CHANGING MODE ////////////////////////

btnDisplay.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("phase");
  clearSelected("action");
  btnDisplay.classList.add("selected");
  puzzleImage.src = getImage(actNum);
  clearInterval(timer);
  startTimer(11, 0);
});

btnSolved.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("action");
  clearSelected("phase");
  clearSelected("action");
  btnSolved.classList.add("selected");
  puzzleImage.src = getImage("S");
  clearInterval(timer);
});

const timeoutButton = function () {
  console.log("The timer timed out.");
  puzzleImage.src = getImage("TO");
  btnTimeout.classList.remove("hide");
  btnSolved.classList.add("hide");
};

// FUNCTIONS TO SELECT ACTS - ONLY NEEDED FOR PROGRAM CONTROL
const selectAct1 = function () {
  clearSelected("all");
  btnA1.classList.add("selected");
  btnDisplay.classList.add("hide");
  actNum = "1";
  actName.textContent = `Act ${actNum}`;
};

const selectAct2 = function () {
  clearSelected("all");
  btnA2.classList.add("selected");
  btnDisplay.classList.add("hide");
  actNum = "2";
  actName.textContent = `Act ${actNum}`;
};

//  May want to make rooms hide after selection and reveal acts after selection

// Add "LOADING" graphic underneath?
