import "./global.css";

const TIME_ELEMENT_ID = "time";
const LOCAL_STORAGE_TIME = "LIMITED_OFFER_TIME";

let countDownDate = new Date();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

if (localStorage.getItem(LOCAL_STORAGE_TIME)) {
  const distanceMs = Number(localStorage.getItem(LOCAL_STORAGE_TIME));
  countDownDate = new Date(countDownDate.getTime() + distanceMs);
} else {
  // get random numbers and save them in local storage
  countDownDate.setHours(new Date().getHours() + getRandomNumber(2, 5));
  countDownDate.setMinutes(new Date().getMinutes() + getRandomNumber(0, 59));
  countDownDate.setSeconds(new Date().getSeconds() + getRandomNumber(0, 59));
}

function format(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  localStorage.setItem(LOCAL_STORAGE_TIME, distance);

  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById(TIME_ELEMENT_ID).innerHTML =
    format(hours) + ":" + format(minutes) + ":" + format(seconds);

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById(TIME_ELEMENT_ID).innerHTML = "LAST CHANCE";
  }
}, 1000);
