let timers = [];

document.getElementById('set-timer').addEventListener('click', () => {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert('Please set a valid time!');
    return;
  }

  const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
  startNewTimer(totalTimeInSeconds);
});

function startNewTimer(time) {
  const timerId = timers.length;
  const timerElement = createTimerElement(timerId, time);

  timers.push({ id: timerId, timeLeft: time, interval: null });
  document.getElementById('timers-list').appendChild(timerElement);
  timers[timerId].interval = setInterval(() => updateTimer(timerId), 1000);
}

function createTimerElement(id, time) {
  const timerItem = document.createElement('div');
  timerItem.classList.add('timer-item');
  timerItem.id = `timer-${id}`;

  const timeLeftElement = document.createElement('p');
  timeLeftElement.textContent = formatTime(time);
  timerItem.appendChild(timeLeftElement);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => stopTimer(id));
  timerItem.appendChild(deleteButton);

  return timerItem;
}

function updateTimer(id) {
  const timer = timers[id];
  if (timer.timeLeft <= 0) {
    stopTimer(id);
    alertTimerEnd(id);
    return;
  }
  timer.timeLeft--;
  document.querySelector(`#timer-${id} p`).textContent = formatTime(timer.timeLeft);
}

function stopTimer(id) {
  clearInterval(timers[id].interval);
  document.getElementById(`timer-${id}`).remove();
  timers[id] = null;
}

function alertTimerEnd(id) {
  const endAlert = document.createElement('div');
  endAlert.classList.add('timer-item');
  endAlert.textContent = 'Timer Is Up!';
  document.getElementById('timers-list').appendChild(endAlert);

  const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
  audio.play();
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
}
