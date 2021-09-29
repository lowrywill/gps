"use strict";

// Grab every button ever
const btnA1 = document.querySelector(".btn_A1");
const btnA2 = document.querySelector(".btn_A2");
const btnA3 = document.querySelector(".btn_A3");

const btnDisplay = document.querySelector(".btn_display");
const btnSolved = document.querySelector(".btn_solved");
const btnTimeout = document.querySelector(".btn_timeout");
const btnReset = document.querySelector(".btn_reset");

const roomName = document.querySelector(".room_name");
const actName = document.querySelector(".act_name");
const timerSection = document.querySelector(".timer_section");

const puzzleImage = document.querySelector(".puzzle_image");

let actNum = 0;
const room = roomName.textContent;
const roomLtr = room[0];
roomLtr == "G"
  ? (roomName.textContent = "Grade School")
  : (roomName.textContent = "Storage Cellar");
let totalSecs,
  min,
  sec = 0;
let timer;
let timerVisibility = true;

// CLEAR ALL SELECTED
const clearSelected = function (btnType) {
  if (btnType == "act" || btnType == "all") {
    btnA1.classList.remove("selected");
    btnA2.classList.remove("selected");
    btnA3.classList.remove("selected");
  }
  if (btnType == "action" || btnType == "all") {
    btnDisplay.classList.remove("selected");
    btnSolved.classList.remove("selected");
    btnTimeout.classList.remove("selected");
  }
};

// Clear it all to start with, just in case
clearSelected("all");

// BACKGROUND CHANGE - Get dynamic image for background based on what act
const getImage = function (actNum) {
  return `${room}_act${actNum}.png`;
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
    // console.log(totalSecs);
  };

  tick(); // This calls tick() once because interval delays a second
  timer = setInterval(tick, 1000); // This repeatedly calls the numbers to create the countdown

  return timer;
};

// SELECTING ACT ////////////////////////
btnA1.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("all");
  timerBGchange("empty");
  btnA1.classList.add("selected");
  newActClassShift();
  actNum = "1";
  actName.textContent = `Act ${actNum}`;
  puzzleImage.src = getImage(0);
  // Set time allowed for the puzzle
  if (roomLtr == "G") {
    min = 11;
    sec = 12;
  } else if (roomLtr == "S") {
    min = 9;
    sec = 25;
  } else {
  }
});

btnA2.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("all");
  timerBGchange("empty");
  btnA2.classList.add("selected");
  newActClassShift();
  actNum = "2";
  actName.textContent = `Act ${actNum}`;
  puzzleImage.src = getImage(0);
  // Set time allowed for the puzzle
  if (roomLtr == "G") {
    min = 11;
    sec = 14;
  } else if (roomLtr == "S") {
    min = 11;
    sec = 25;
  } else {
  }
});

btnA3.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("all");
  timerBGchange("empty");
  btnA3.classList.add("selected");
  newActClassShift();
  actNum = "3";
  actName.textContent = `Act ${actNum}`;
  puzzleImage.src = getImage(0);
  // Set time allowed for the puzzle
  if (roomLtr == "G") {
    min = 8;
    sec = 10;
  } else if (roomLtr == "S") {
    min = 9;
    sec = 45;
  } else {
  }
});

// CHANGING MODE ////////////////////////

btnDisplay.addEventListener("click", function (e) {
  e.preventDefault();
  timerBGchange("countdown");
  timerVisibility = true;
  clearSelected("action");
  btnDisplay.classList.add("selected");
  btnSolved.classList.remove("hide");
  puzzleImage.src = getImage(actNum);
  clearInterval(timer);
  startTimer(min, sec);
});

btnSolved.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("action");
  btnSolved.classList.add("selected");
  // puzzleImage.src = getImage("S"); // Don't need anymore?
  timerBGchange("solved");
  timerSection.textContent = "";
  timerVisibility = false;
});

// WHEN IT TIMES OUT - No longer a button, but triggered on timeout
const timeoutButton = function () {
  timerSection.classList.add("timer_bg_empty");
  timerSection.textContent = "";
  timerBGchange("empty");
  puzzleImage.src = getImage("TO");
  btnTimeout.classList.remove("hide");
  btnSolved.classList.add("hide");
  btnDisplay.classList.remove("selected");
  btnDisplay.classList.add("hide");
};

// CHANGE CLASSES TO START ACT
const newActClassShift = function () {
  btnTimeout.classList.add("hide");
  btnSolved.classList.add("hide");
  btnDisplay.classList.remove("hide");
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

// Add "LOADING" graphic underneath?
