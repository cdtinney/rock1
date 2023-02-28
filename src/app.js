/* eslint-env browser */

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

function updateProgressBar(secondsLeft) {
  const Settings = window.Rock1.Settings;

  const ticksLeft = Math.floor(secondsLeft / 0.6);

  if (Settings.displayType === Settings.DisplayType.Ticks) {
    document.getElementById("progressBarText").innerHTML = "-" + ticksLeft + "t"
  } else {
    document.getElementById("progressBarText").innerHTML = "-" + secondsLeft + "s";
  }

  const percent = sanitisePercentage(secondsLeft / 246 * 1000);

  const progressBarElem = document.getElementById("progressBarBar");
  progressBarElem.style.width = percent + "%";
  progressBarElem.style.backgroundColor = getProgressBarColor(percent);

  // TODO Change colour of text when on 2nd last tick

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function initialize() {
  window.initializeSettings();
  const timer = window.initializeTimer(updateProgressBar.bind(this));
  const voragoImageDetect = await window.initializeVoragoImageDetect();

  if (!window.alt1) {
    console.error('alt1lib not found');
    document.getElementById("addContainer").style.display = "flex";
    document.getElementById("addURL").innerText = `alt1://addapp/${window.location.origin}${window.location.pathname}appconfig.json`;
    return;
  }

  setInterval(function() {
    if (timer.isRunning) {
      return;
    }

    const shouldStartTimer = voragoImageDetect.findZeroHpImage();
    if (shouldStartTimer) {
      timer.reset(24.6); // 24.6 seconds (40t) from zero HP to TC tick
      timer.start(10); // Update every 10ms
    }
  }, 25); // 25ms
}
