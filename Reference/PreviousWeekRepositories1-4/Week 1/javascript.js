const clock = document.getElementById("clock");
const button = document.getElementById("changeTheme");
const root = document.documentElement;

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

updateClock();
setInterval(updateClock, 1000);

const accentColors = ["#ff7a00", "#ff4d6d", "#00c2ff", "#7ef29a", "#ffd166"];

button.addEventListener("click", () => {
  const randomColor =
    accentColors[Math.floor(Math.random() * accentColors.length)];
  root.style.setProperty("--accent", randomColor);
});
