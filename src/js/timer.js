/* eslint-env browser */

class Timer {
  currentTime = 0;
  isRunning = false
  timerId = null;
  callback = null;
  startTime = new Date().getTime();

  start(interval = 1000) {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.timerId = setInterval(() => {
      this.currentTime = this.startTime - (new Date().getTime());
      if (this.currentTime <=0) {
        this.stop();
        return;
      }

      this._triggerCallback();
    }, interval);
  }

  stop() {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    clearInterval(this.timerId);
    this.callback(0);
  }

  reset(newStartTimeInSeconds = 0) {
    this.startTime = (new Date().getTime()) + (newStartTimeInSeconds * 1000);
  }

  constructor(callback) {
    this.callback = callback;
  }

  _triggerCallback() {
    const secondsLeft = (Math.floor(this.currentTime / 600) * 0.6 ).toFixed(1);
    this.callback(secondsLeft);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initializeTimer(callback) {
  if (window.Rock1 && window.Rock1.Timer) {
    return;
  }

  window.Rock1 = window.Rock1 || {};
  window.Rock1.Timer = new Timer(callback);
  return window.Rock1.Timer;
}
