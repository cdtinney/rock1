/* eslint-env browser */

const MetricsLocalStorageKeys = {
  PhaseDurationMetrics: "rock1.phaseDurationMetrics",
};

class PhaseDurationMetrics {
  phaseDurations = [];

  constructor(initialPhaseDurations = []) {
    this.phaseDurations = initialPhaseDurations;
  }

  storePhaseDuration(phaseDuration) {
    if (this.isDone()) {
      throw new Error('Five phases already stored')
    }

    console.error('adding ' + phaseDuration + ' to ' + this.phaseDurations);
    this.phaseDurations = this.phaseDurations.concat(phaseDuration);
  }

  isDone() {
    return this.phaseDurations.length === 5;
  }

  toString() {
    return this.phaseDurations.map((duration) => `${duration}s`).join(' | ');
  }
}

class Metrics {
  phaseDurationsMetrics = [];

  selectors = {
    phaseDurations: '.metrics__phase-durations',
  };

  constructor() {
    this.load();
  }

  storePhaseDuration(phaseDuration) {
    console.error('storing phase = ' + phaseDuration);
    const currentPhaseDurationsMetrics = this.getLastPhaseDurationMetricsOrNew();
    console.error('current metrics = ' + this.currentPhaseDurationsMetrics);
    currentPhaseDurationsMetrics.storePhaseDuration(phaseDuration);

    this.phaseDurationsMetrics = this.phaseDurationsMetrics.concat(currentPhaseDurationsMetrics);
    console.error('new metrics arr = ' + this.phaseDurationsMetrics);
    this.save();
  }

  getLastPhaseDurationMetricsOrNew() {
    const lastMetrics = this.phaseDurationsMetrics.pop() ?? null;
    if (!lastMetrics || lastMetrics.isDone()) {
      console.error("creating new metrics");
      return new PhaseDurationMetrics();
    }

    return lastMetrics;
  }

  render() {
    const phaseDurationsElement = document.querySelector(this.selectors.phaseDurations);
    if (!phaseDurationsElement) {
      console.error('No phase durations element found')
      return;
    }

    phaseDurationsElement.innerHTML = '';

    console.error(this.phaseDurationsMetrics);
    this.phaseDurationsMetrics.forEach((metrics, index) => {
      const metricsElement = document.createElement('div');
      metricsElement.classList.add('kill-phase-durations');
      metricsElement.innerHTML = `<strong> Kill ${index + 1}: </strong>` + metrics.toString();
      phaseDurationsElement.appendChild(metricsElement);
    })
  }

  load() {
    console.error('loading metrics');
    const storedJson = localStorage.getItem(MetricsLocalStorageKeys.PhaseDurationMetrics);
    console.error(storedJson);

    if (storedJson && storedJson.length > 0) {
      console.error('parsing json');
      const plainPhaseDurationMetricsObjects = JSON.parse(storedJson);
      console.error(plainPhaseDurationMetricsObjects);
      this.phaseDurationsMetrics = plainPhaseDurationMetricsObjects.map((plainObject) => {
        return new PhaseDurationMetrics(plainObject.phaseDurations);
      });
    }
  }

  save() {
    console.error('saving metrics');
    const jsonArray = JSON.stringify(this.phaseDurationsMetrics);
    console.error(jsonArray);
    localStorage.setItem(MetricsLocalStorageKeys.PhaseDurationMetrics, jsonArray);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initializeMetrics() {
  if (window.Rock1 && window.Rock1.Metrics) {
    console.error('not initializing');
    return;
  }

  console.error('initializing new metrics');
  window.Rock1 = window.Rock1 || {};
  window.Rock1.Metrics = new Metrics();
  window.Rock1.Metrics.render();
  return window.Rock1.Metrics;
}
