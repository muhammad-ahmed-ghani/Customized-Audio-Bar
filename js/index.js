// Created by Muhammad Ahmad.

const audioPlayer = document.querySelector(".audio-player");

// Just for testing purpose I am using online audio.
const audio = new Audio(
  "https://cdnsongs.com/dren/music/data/Punjabi/202305/Still_Rollin/128/Still_Rollin.mp3/Still%20Rollin.mp3"
);

audio.addEventListener(
  "loadeddata",
  () => {
    let duration = getTimeCodeFromNum(
      audio.duration
    );
    audioPlayer.querySelector(".length").textContent = duration;
  },
  false
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
  if(audio.currentTime==audio.duration)
  {
    progressBar.style.width = 0 + "%";
    audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
      0
    );
    document.getElementById("play-pause-img").src = "./images/play.png"
  }
}, 50);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
      document.getElementById("play-pause-img").src = "./images/pause.png"
      audio.play();
    } else {
      document.getElementById("play-pause-img").src = "./images/play.png"
      audio.pause();
    }
  },
  false
);

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}