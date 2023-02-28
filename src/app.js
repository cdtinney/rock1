/* eslint-env browser */

// Constants

const ElementIds = {
  // TODO
}

// Functions

/**
 * Progress bar changes from green > red.
 * @param {Number} percent
 * @returns {String} color the bar should use
 */
function getProgressBarColor(percent) {
  const hue = (percent * 1.2).toString(10);
  return "hsl(" + hue + ",75%,50%)";
}

function sanitisePercentage(integer) {
  return Math.min(100, Math.max(0, integer));
}

function updateProgressBarSpecialTickTimeline(ticksLeft) {
  const SpecialTickIcons = {
    // Incendiary shot
    // TODO Check if setting enabled
    36: 'red',
    // TODO lands, jumps
  };

  const ticksToCheck = [
    ticksLeft - 2,
    ticksLeft - 1,
    ticksLeft,
  ];
  const icons = ticksToCheck.map((tick) => {
    return SpecialTickIcons[tick] ?? undefined;
  });
  const currentTickElem = document.getElementById("tickTimelineCurrentTick");
  currentTickElem.style.backgroundColor = icons[2] ?? null;
  const secondTickElem = document.getElementById("tickTimelineSecondTick");
  secondTickElem.style.backgroundColor = icons[1] ?? null;
  const thirdTickElem = document.getElementById("tickTimelineThirdTick");
  thirdTickElem.style.backgroundColor = icons[0] ?? null;
  // document.getElementById('a').style.backgroundImage="url(images/img.jpg)"; // specify the image path here

}

function updateProgressBar(secondsLeft) {
  const Settings = window.Rock1.Settings;

  const ticksLeft = Math.floor(secondsLeft / 0.6);

  if (Settings.displayType === Settings.DisplayType.Ticks) {
    document.getElementById("progressBarTcText").innerHTML = "-" + ticksLeft + "t"
  } else {
    document.getElementById("progressBarTcText").innerHTML = "-" + secondsLeft + "s";
  }

  const colorBarWidthPercentage = sanitisePercentage(secondsLeft / 246 * 1000);
  const progressBarElem = document.getElementById("progressBarColorBar");
  progressBarElem.style.width = colorBarWidthPercentage + "%";
  progressBarElem.style.backgroundColor = getProgressBarColor(colorBarWidthPercentage, ticksLeft);

  updateProgressBarSpecialTickTimeline(ticksLeft)
}

let timer = null;
function startTimer() {
  timer?.reset(24.6); // 24.6 seconds (40t) from zero HP to TC tick
  timer?.start(10); // Update every 10ms
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function initialize() {
  window.initializeSettings();
  timer = window.initializeTimer(updateProgressBar.bind(this));
  const voragoImageDetect = await window.initializeVoragoImageDetect();

  // If non-alt1 browser detected
  if (!window.alt1) {
    console.error('alt1lib not found');
    document.getElementById("browserContainer").style.display = "flex";
    document.getElementById("addURL").innerText = `alt1://addapp/${window.location.origin}${window.location.pathname}appconfig.json`;
    // TODO Add test button
    return;
  }

  setInterval(function() {
    if (timer?.isRunning) {
      return;
    }

    const shouldStartTimer = voragoImageDetect.findZeroHpImage();
    if (shouldStartTimer) {
      startTimer();
    }
  }, 25); // 25ms
}
