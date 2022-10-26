import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const body = document.querySelector("body");
const paliy = document.querySelector(".paliy");
const title = document.querySelector(".intro");
const back = document.querySelector(".back");

const dateTime = document.querySelector("input#datetime-picker");
const timerHtml = document.querySelector(".timer");
const startBtn = document.querySelector("button[data-start]");

const days = document.querySelector("span[data-days]");
const hours = document.querySelector("span[data-hours]");
const minutes = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");

startBtn.disabled = true;
timerHtml.style.color = "black";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure("Будь ласка, виберіть дату в майбутньому");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTime, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

startBtn.addEventListener("click", () => {
  let timer = setInterval(() => {
    let countdown = new Date(dateTime.value) - new Date();
    startBtn.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      minutes.textContent = addLeadingZero(timeObject.minutes);
      seconds.textContent = addLeadingZero(timeObject.seconds);

      body.classList.add("is-activ");
      title.textContent = "До бавовни залишилось:";
      timerHtml.style.color = "white";
      timerHtml.classList.add("big");
      back.style.color = "white";

      if (countdown <= 20000) {
        timerHtml.style.color = "tomato";
        paliy.classList.add("is-hot");
      }
    } else {
      clearInterval(timer);
      timerHtml.style.color = "white";
      Notiflix.Notify.success("Ну, мені нравиця як воно горить", {timeout: 3000,});
      Notiflix.Notify.success("Ну, люді в шокє, глаза аж вилазять у них!", {timeout: 6000,});
      Notiflix.Notify.success("А мені це по-приколу: дивиться, як вони бігають, суїтятсь, питаюця руками потушить, а воно ж ше дужче горить.",{timeout: 12000,});
      // paliy.classList.remove("is-hot");
    }
  }, 1000);
});
