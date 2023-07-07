
// Pomodoro Timer
const timerDisplay = document.getElementById("timer");
const pomodoroTimerDisplay = document.getElementById("pomodoroTimer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const workTimeSelect = document.getElementById("workTimeSelect");
const restTimeSelect = document.getElementById("restTimeSelect");
const clockDisplay = document.getElementById("clock");

const workTimes = {
    25: 1500, // 25 minutes in seconds
    45: 2700, // 45 minutes in seconds
    60: 3600, // 60 minutes in seconds
};

const restTimes = {
    5: 300, // 5 minutes in seconds
    10: 600, // 10 minutes in seconds
    15: 900, // 15 minutes in seconds
};

let workTime = workTimes[25];
let restTime = restTimes[5];
let timeLeft = workTime;
let isPomodoro = true;
let isRunning = false;
let intervalId = null;

// Music Player
const musicInfo = document.getElementById("musicInfo");
const audioPlayer = document.getElementById("audioPlayer");

let isMusicPlaying = false;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(updateTimer, 1000);
        startBtn.textContent = "Pause";
        if (!isMusicPlaying) {
            playMusic();
            isMusicPlaying = true;
        }
    } else {
        clearInterval(intervalId);
        isRunning = false;
        startBtn.textContent = "Resume";
    }
}

function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    startBtn.textContent = "Start";
    timeLeft = workTime;
    updateTimerDisplay();
    stopMusic();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(intervalId);
        isRunning = false;
        if (!isMusicPlaying) {
            playMusic();
            isMusicPlaying = true;
        }
        updateTimerDisplay();
        showNotification();
        if (isPomodoro) {
            timeLeft = restTime;
            isPomodoro = false;
        } else {
            timeLeft = workTime;
            isPomodoro = true;
        }
        startTimer();
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}


function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function showNotification() {
    if (Notification.permission === "granted") {
        const notification = new Notification("Pomodoro Timer", {
            body: `Time for ${isPomodoro ? "work" : "rest"}!`,
            icon: "path/to/notification-icon.png" // Replace with the path to your notification icon
        });
    }
}

function playMusic() {
    audioPlayer.play();
    musicInfo.textContent = "Music: Playing";
}

function stopMusic() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    musicInfo.textContent = "Music: Not Started";
    isMusicPlaying = false;
}

// Clock Display
function updateCurrentDate() {
    const currentDateElement = document.getElementById("currentDate");
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = currentDate.toLocaleDateString(undefined, options);
}

function updateClockDisplay() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    clockDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}`;
    updateCurrentDate();
}



// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle("dark");
}

// Event Listeners
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
workTimeSelect.addEventListener("change", function () {
    const selectedWorkTime = parseInt(this.value);
    workTime = workTimes[selectedWorkTime];
    if (!isRunning && isPomodoro) {
        timeLeft = workTime;
        updateTimerDisplay();
    }
});

restTimeSelect.addEventListener("change", function () {
    const selectedRestTime = parseInt(this.value);
    restTime = restTimes[selectedRestTime];
    if (!isRunning && !isPomodoro) {
        timeLeft = restTime;
        updateTimerDisplay();
    }
});

// Initialize Timer Display
updateTimerDisplay();

// Update Clock Display every second
setInterval(updateClockDisplay, 1000);

// Dark Mode Toggle Event Listener
darkModeToggle.addEventListener("click", toggleDarkMode);


function refreshBlur() {
    const elementToBlur = document.getElementById("elementToBlur");
    elementToBlur.classList.add("blur");
    setTimeout(function () {
        elementToBlur.classList.remove("blur");
    }, 500); // Adjust the time interval (in milliseconds) as needed
}
const muteBtn = document.getElementById("muteBtn");
let isMuted = false;

function toggleMute() {
    if (isMuted) {
        audioPlayer.muted = false;
        muteBtn.textContent = "Mute";
        isMuted = false;
    } else {
        audioPlayer.muted = true;
        muteBtn.textContent = "Unmute";
        isMuted = true;
    }
}

muteBtn.addEventListener("click", toggleMute);
