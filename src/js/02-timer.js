import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");

let countdownIntervalId;

function startCountdown() {
  const endDate = new Date(datetimePicker.value);
  const now = new Date();

  if (endDate < now) {
    window.alert("Please choose a date in the future");
    return;
  }

  startButton.disabled = true;

  function updateCountdown() {
    const timeLeft = endDate - new Date();

    if (timeLeft < 0) {
      clearInterval(countdownIntervalId);
      startButton.disabled = false;
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    daysValue.textContent = String(days).padStart(2, "0");
    hoursValue.textContent = String(hours).padStart(2, "0");
    minutesValue.textContent = String(minutes).padStart(2, "0");
    secondsValue.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  countdownIntervalId = setInterval(updateCountdown, 1000);
}

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert("Please choose a date in the future");
      datetimePicker.value = "";
      startButton.disabled = true;
      return;
    }

    startButton.disabled = false;
  },
});

startButton.addEventListener("click", startCountdown);