/* eslint-env browser */

const DisplayType = {
  Ticks: 1,
  Seconds: 2,
};

const LocalStorageKeys = {
  DisplayType: "rock1.displayType",
  OffsetByOne: "rock1.offsetByOne",
}

class Settings {
  displayType = DisplayType.Ticks;
  /**
   * If true, the timer will be offset by one such that -34 would become -33. This
   * makes it easier to do inputs based on guides that say -36, -33, -30, etc.
   */
  offsetByOne = false;

  constructor() {
    this._loadFromLocalStorage();
  }

  _saveToLocalStorage() {
    localStorage.setItem(LocalStorageKeys.DisplayType, this.displayType.toString());
    localStorage.setItem(LocalStorageKeys.OffsetByOne, this.offsetByOne.toString());
  }

  _loadFromLocalStorage() {
    this.displayType = Number.parseInt(localStorage.getItem(LocalStorageKeys.DisplayType)) ?? this.displayType;
    this.offsetByOne = localStorage.getItem(LocalStorageKeys.OffsetByOne) === "true" ?? false;
  }

  initializeForm() {
    document.settingsForm.timerDisplayType.value = this.displayType;
    document.settingsForm.addOne.checked = this.offsetByOne;
  }

  initializeListeners() {
    document.getElementById("timerDisplayType").addEventListener('click', (event) => {
      if (event.target && event.target.matches("input[type='radio']")) {
        this.displayType = Number.parseInt(event.target.value);
      }
    });
    document.getElementById("addOne").addEventListener('change', (event) => {
      this.offsetByOne = event.target.checked;
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
