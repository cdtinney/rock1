export type TimerCallback = (secondsLeft: number) => void;

export class Timer {
  currentTime = 0;
  isRunning = false
  timerId = 0;
  callback: TimerCallback;
  startTime = new Date().getTime();

  start(interval = 1000) {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.timerId = setInterval((() => {
      this.currentTime = this.startTime - (new Date().getTime());
      if (this.currentTime <=0) {
        this.stop();
        return;
      }

      this._triggerCallback();
    }) as TimerHandler, interval);
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

  constructor(callback: TimerCallback) {
    this.callback = callback;
  }

  _triggerCallback() {
    const secondsLeft = (Math.floor(this.currentTime / 600) * 0.6 ).toFixed(1);
    this.callback(Number.parseFloat(secondsLeft));
  }
}

export function initializeTimer(callback: (secondsLeft: number) => void) {
  return new Timer(callback);
}
