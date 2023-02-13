/* eslint-env browser */

// Global variables
const Rock1 = window.Rock1;
const Alt1 = window.A1lib;
let zeroHpImageData;
let zeroHpScopImageData;
let isTimerRunning = false;

async function initializeImageData() {
	zeroHpImageData = await Alt1.ImageDetect.imageDataFromBase64('iVBORw0KGgoAAAANSUhEUgAAABEAAAAcCAYAAACH81QkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJiSURBVEhLpVRNaxNRFH1NZpKZZnTyMcTWgImYgkXElaK4EyxCiVTaRQgiUkQ3gooiiP0F7nThRrpzo7XUiksVBV0ZRXFt1D+Q9h8c5zw88VkCmhq4uV/nnHfn5mXMRGMK5ck9uHFrCRubm+CH/ur1m7ZerNawM5lEUtuL2r5pm5NDzz7NeH4OcwttfPr8BUEUI5PJwBiDbreL1tw8onLVkijkikqIscl6Pt68fWcJjAWYb5/FysoTRMVkcDqnoWky1ulTEQ9r68/Q7nQQJxP2ZDbOLV7E6tpT+PnQknY1mrbuitHsJJmsh9aZBfR6PYQ7SoPmt+8/cDqt+/nA5hTXDjStsFaEjctXrqHf79vF8nP+wiWwl+z+TdRO9BiKrYiUudixX4ulFeLyHwSKMCbe9YbPzKZOUdMl02tXEtPBjA2XycAFuQIEs8/cFRGOZlxFEdhwSawr1mEStiL8cgv0FCVRohJxMa6wvfYMRGBM4xVXjWB61lwBmRFRYBmBmki5DmNOvPp2EhdI0x9N04jk5jRi6O1OhjXcuh7ZnVY9esNg67MSzF+BZHmKSJg5cTpwMImENLa8asQxF5GcgQgTTSCC7sKwnuqqMTaznUX8r5lMLsQoVqmEeHE/Z+3reg6HDwYw48dPoXBsBvKusba1v3y3jqXbU8jGFcyciPH4Tj4VqU9jFOs9H4cXFeGXqjbHe390EZLG0nex8lfL8fZE+MJSvi2RjdfpDhwRm7uAf7HVeyWcPOrZeLZVt/nIIgeONPHhYR4vH0T4+CjC/kPp+2QY8G8W1ppoNgJkg0J6dwL8BHjxrdibRBHwAAAAAElFTkSuQmCC');
	zeroHpScopImageData = await await Alt1.ImageDetect.imageDataFromBase64('iVBORw0KGgoAAAANSUhEUgAAAAwAAAAdCAYAAACe/43ZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAImSURBVDhPlVNNaxNRFH3NJJOvMd9EY8DUONNaROLCiq24qGIrhEoVFWrrxo0bFy4DfuDHzp0u3Eh3bhRcCO6MUnEp+g/0JyQ/4TjnxTM8pS0YOLn33HfPuffNMKbRPoxKs40D0xFqrUMgJ0qNluWCuDkxv4CllT7c3+07dxMTRoloZKKZWWx/+Yr+pcswxlhUq1UUyzXrKlEyIYoirK5dxWg0woNHTzDbO2md6q2ObdLKWtOEsSCoNhFUGhgMBhiPx7hyfcM6s0lwJsxg7dp64ra+eRMfh0PsqzVtzRVykul2u3j4+Omf605+Z5fOI+1nk1UYCTsh5Xko1fcjH5SSSxOV5sFkqiJhXBfGIF5FnI5aizlryYvjAYvkroBRaB+ZmwhckXJNkolEhk1yl0ANjK4Jc8MxEvCAkTW3WbAC/vFSOmSUGzkNdM7cPiVNUYPLCXc9K9Ahnci1npoUeWb4NNioyKJMyNlMLpFxL8mch+Ruk3JG+x5YJJhLqLpqzDnR9G/cwv/ApPw8dkK9nsfwpW/x872P+eM5WzeFxRUUzlxEcWEZzBmJrecd3L8XwSvXsXyujLfPfOR6i7GgM4ed8OtDAemggkz8NZLjWwZeIf4E/m0U2DCVziT881Z58q24TS4oYIM4BV6uuLtgvJ39S0C+p+DdiyounE7bvL/asXwq5e0uOHYqxPfXWXx6FeDHmwBHe+29L03k2yHC6ZxdJeXnYh7iN9MM/p+Mvt0nAAAAAElFTkSuQmCC');
}

function findZeroHpImage(img) {
	const imgRefBind = Alt1.captureHoldFullRs();
	if (!imgRefBind) {
		return null;
	}

	const VoragoImg = imgRefBind.findSubimage(img, zeroHpImageData);
	if (VoragoImg.length != 0) {
		return true;
	}

	const ScopImg = imgRefBind.findSubimage(img, zeroHpScopImageData);
	if (ScopImg.length != 0) {
		return true;
	}

	return false;
}

function getColor(value) {
	const hue = (value * 1.2).toString(10);
	return "hsl(" + hue + ",75%,50%)";
}

function sanitisePercentage(i) {
  return Math.min(100, Math.max(0, i));
}

// eslint-disable-next-line no-undef
const beamTimer = new _timer(function(time) {
	const Settings = window.Rock1.Settings;

	const secsLeft = (Math.floor(time / 600) * 0.6 ).toFixed(1);
	const ticksLeft = Math.floor(secsLeft / 0.6);

	if (Settings.displayType === Settings.DisplayType.Ticks) {
		document.getElementById("timerText").innerHTML = "-" + ticksLeft + "t";
	} else {
		document.getElementById("timerText").innerHTML = "-" + secsLeft + "s";
	}

	const percent = sanitisePercentage(secsLeft / 246 * 1000);

	const progressBarElem = document.getElementById("progressBar");
	progressBarElem.style.width = percent + "%";
	progressBarElem.style.backgroundColor = getColor(percent)

	if (time <= 0) {
		beamTimer.stop();
		isTimerRunning = false;
	}
});

// 01:38:24 0 hp
// 01:38:48 tag
// 40 ticks
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initialize() {
	window.initializeSettings();

	initializeImageData();

	if (window.alt1) {
		setInterval(function() {
			if (isTimerRunning) {
				return;
			}

			const shouldStartTimer = findZeroHpImage();
			if (shouldStartTimer) {
				isTimerRunning = true;
				beamTimer.reset(246);
				beamTimer.start(10);
			}
		}, 100);
	} else {
		// TODO: Throw error
	}
}