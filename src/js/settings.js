/* eslint-env browser */

const DisplayType = {
  Ticks: 1,
  Seconds: 2,
};

const LocalStorageKeys = {
  DisplayType: "rock1.displayType",
  SpecialTickMarkers: "rock1.specialTickMarkers"
}

class Settings {
  displayType = DisplayType.Ticks;
  specialTickMarkers = {
    jumps: false,
    lands: false,
    incendiaryShot: false,
  }

  constructor() {
    this._loadFromLocalStorage();
  }

  _saveToLocalStorage() {
    localStorage.setItem(LocalStorageKeys.DisplayType, this.displayType.toString());
    localStorage.setItem(LocalStorageKeys.SpecialTickMarkers, JSON.stringify(this.specialTickMarkers));
  }

  _loadFromLocalStorage() {
    this.displayType = Number.parseInt(localStorage.getItem(LocalStorageKeys.DisplayType)) ?? this.displayType;
    this.specialTickMarkers = (() => {
      const specialTickMarkers = localStorage.getItem(LocalStorageKeys.SpecialTickMarkers);
      return specialTickMarkers ? JSON.parse(specialTickMarkers) : this.specialTickMarkers
    })();
  }

  initializeForm() {
    document.settingsForm.timerDisplayType.value = this.displayType;
    document.settingsForm.incendTick.checked = this.specialTickMarkers.incendiaryShot;
  }

  initializeListeners() {
    // Timer display type
    document.getElementById("timerDisplayType").addEventListener('click', (event) => {
      if (event.target && event.target.matches("input[type='radio']")) {
        this.displayType = Number.parseInt(event.target.value);
      }
    });

    // Extra tick markers
    document.getElementById("incendTick").addEventListener('click', (event) => {
      if (event.target && event.target.matches("input[type='checkbox']")) {
        this.specialTickMarkers.incendiaryShot = event.target.checked;
      }
    });

    document.getElementById('saveButton').addEventListener('click', () => {
      this._saveToLocalStorage()
      window.close();
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initializeSettings() {
  if (window.Rock1 && window.Rock1.Settings) {
    return;
  }

  window.Rock1 = window.Rock1 || {};
  window.Rock1.Settings = new Settings();
  window.Rock1.Settings.DisplayType = DisplayType;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initializeSettingsForm() {
  initializeSettings();
  window.Rock1.Settings.initializeForm()
  window.Rock1.Settings.initializeListeners()
}
