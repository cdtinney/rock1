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
		document.getElementById("timerText").innerHTML = "-" + ticksLeft + "t";
	} else {
		document.getElementById("timerText").innerHTML = "-" + secondsLeft + "s";
	}

	const percent = sanitisePercentage(secondsLeft / 246 * 1000);

	const progressBarElem = document.getElementById("progressBar");
	progressBarElem.style.width = percent + "%";
	progressBarElem.style.backgroundColor = getProgressBarColor(percent)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function initialize() {
	window.initializeSettings();
	const timer = window.initializeTimer(updateProgressBar.bind(this));
	const voragoImageDetect = await window.initializeVoragoImageDetect();

	setInterval(function() {
    // if (!window.alt1) {
    //   console.error('alt1lib not found');
    //   document.getElementById("addToAlt1Url").style.display = "flex";
    //   return;
    // }

		if (timer.isRunning) {
			return;
		}

		const shouldStartTimer = voragoImageDetect.findZeroHpImage();
		if (shouldStartTimer) {
			timer.reset(24.6); // 24.6 seconds (40t) from zero HP to TC tick
			timer.start(10); // Update every 10ms
		}
	}, 100); // 100ms
}
