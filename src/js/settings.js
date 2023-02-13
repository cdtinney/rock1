/* eslint-env browser */

const DisplayType = {
  Ticks: 1,
  Seconds: 2,
};

const LocalStorageKeys = {
  DisplayType: "rock1.displayType",
}

class Settings {
  displayType = DisplayType.Ticks;

  constructor() {
    this._loadFromLocalStorage();
  }

  _saveToLocalStorage() {
    localStorage.setItem(LocalStorageKeys.DisplayType, this.displayType.toString());
  }

  _loadFromLocalStorage() {
    this.displayType = Number.parseInt(localStorage.getItem(LocalStorageKeys.DisplayType)) ?? this.displayType;
  }

  initializeForm() {
    document.settingsForm.timerDisplayType.value = this.displayType;
  }

  initializeListeners() {
    document.getElementById("timerDisplayType").addEventListener('click', (event) => {
      if (event.target && event.target.matches("input[type='radio']")) {
        this.displayType = Number.parseInt(event.target.value);
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
