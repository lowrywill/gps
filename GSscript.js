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

clearSelected("all");

// Get dynamic image
const getImage = function (actNum) {
  return `${room}_act${actNum}.png`;
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
  puzzleImage.classList.remove("Xborder");
  timerSection.classList.remove("Xborder");
  actNum = "1";
  actName.textContent = `Act ${actNum}`;
  puzzleImage.src = getImage(0);
});

btnA2.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("all");
  btnA2.classList.add("selected");
  puzzleImage.classList.remove("Xborder");
  timerSection.classList.remove("Xborder");
  actNum = "2";
  actName.textContent = `Act ${actNum}`;
  puzzleImage.src = getImage(0);
});

btnA3.addEventListener("click", function (e) {
  e.preventDefault();
  clearSelected("all");
  btnA3.classList.add("selected");
  puzzleImage.classList.remove("Xborder");
  timerSection.classList.remove("Xborder");
  actNum = "3";
  actName.textContent = `Act ${actNum}`;
  puzzleImage.src = getImage(0);
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

// Add "LOADING" graphic underneath?
