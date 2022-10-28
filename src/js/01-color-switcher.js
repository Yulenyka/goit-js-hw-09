const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");
btnStop.disabled = true;
let timerId = null;

btnStart.addEventListener("click", () => {
  btnStart.disabled = true;
  btnStop.disabled = false;
  changeBackgroundColor();
  timerId = setInterval(changeBackgroundColor, 1000);
});
btnStop.addEventListener("click", (onClick) => {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBackgroundColor() {
  document.body.style.background = getRandomHexColor();
}