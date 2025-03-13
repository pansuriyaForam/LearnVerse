const taskName = document.getElementById('taskName');
const taskType = document.getElementById('taskType');
const timerSelect = document.getElementById('timer');
const startTimerBtn = document.getElementById('startTimer');
const countdownDisplay = document.getElementById('countdown');
const taskList = document.getElementById('taskList');

let timer;
let timeLeft;
let currentTask;

// Load completed tasks from local storage
const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
updateTaskList();

startTimerBtn.addEventListener('click', () => {
  if (!taskName.value) {
    alert('Please enter a task name.');
    return;
  }
  currentTask = {
    name: taskName.value,
    type: taskType.value,
    time: parseInt(timerSelect.value) * 60 // Convert to seconds
  };
  startTimer(currentTask.time);
});

function startTimer(duration) {
  timeLeft = duration;
  updateTimerDisplay();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      askIfTaskCompleted();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  countdownDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function askIfTaskCompleted() {
  const success = confirm(`Did you successfully complete ${currentTask.name}?`);
  if (success) {
    completedTasks.push(currentTask);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    updateTaskList();
    showMotivationalMessage();
  }
}

function updateTaskList() {
  taskList.innerHTML = '';
  completedTasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.name} (${task.type}) - ${task.time / 60} minutes`;
    taskList.appendChild(li);
  });
}

function showMotivationalMessage() {
  const messages = [
    "Great job! You're unstoppable!",
    "You're leveling up! Keep going!",
    "Balance is key, and you're nailing it!",
    "Every task completed brings you closer to your goals!",
    "You're doing amazing! Keep pushing forward!"
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  alert(randomMessage);
}