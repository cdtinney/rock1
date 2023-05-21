/* eslint-env browser */

// References
const Alt1 = window.A1lib;

class VoragoImageDetect {
  // Map of image datas, keyed by transparency (0 = opaque, 100 = most transparent).
  zeroHpImageData = {
    0: null
  };
  zeroHpScopImageData = {
    0: null,
  }
  zeroHpVoragaImageData = {
    0: null,
  }
  interfaceTransparency = 0;

  findZeroHpImage() {
    const imgRefBind = Alt1.captureHoldFullRs();
    if (!imgRefBind) {
      return null;
    }

    const VoragoImg = imgRefBind.findSubimage(this._getZeroHpImage());
    if (VoragoImg.length != 0) {
      return true;
    }

    const VoragaImg = imgRefBind.findSubimage(this._getZeroHpVoragaImage());
    if (VoragaImg.length != 0) {
      return true;
    }


    const ScopImg = imgRefBind.findSubimage(this._getZeroHpScopImage());
    if (ScopImg.length != 0) {
      return true;
    }

    return false;
  }

  _getZeroHpImage() {
    return this.zeroHpImageData[this.interfaceTransparency];
  }

  _getZeroHpVoragaImage() {
    return this.zeroHpVoragaImageData[this.interfaceTransparency];
  }

  _getZeroHpScopImage() {
    return this.zeroHpScopImageData[this.interfaceTransparency];
  }

  async initialize() {
    this.zeroHpImageData[this.interfaceTransparency] = await Alt1.ImageDetect.imageDataFromBase64('iVBORw0KGgoAAAANSUhEUgAAABEAAAAcCAYAAACH81QkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJiSURBVEhLpVRNaxNRFH1NZpKZZnTyMcTWgImYgkXElaK4EyxCiVTaRQgiUkQ3gooiiP0F7nThRrpzo7XUiksVBV0ZRXFt1D+Q9h8c5zw88VkCmhq4uV/nnHfn5mXMRGMK5ck9uHFrCRubm+CH/ur1m7ZerNawM5lEUtuL2r5pm5NDzz7NeH4OcwttfPr8BUEUI5PJwBiDbreL1tw8onLVkijkikqIscl6Pt68fWcJjAWYb5/FysoTRMVkcDqnoWky1ulTEQ9r68/Q7nQQJxP2ZDbOLV7E6tpT+PnQknY1mrbuitHsJJmsh9aZBfR6PYQ7SoPmt+8/cDqt+/nA5hTXDjStsFaEjctXrqHf79vF8nP+wiWwl+z+TdRO9BiKrYiUudixX4ulFeLyHwSKMCbe9YbPzKZOUdMl02tXEtPBjA2XycAFuQIEs8/cFRGOZlxFEdhwSawr1mEStiL8cgv0FCVRohJxMa6wvfYMRGBM4xVXjWB61lwBmRFRYBmBmki5DmNOvPp2EhdI0x9N04jk5jRi6O1OhjXcuh7ZnVY9esNg67MSzF+BZHmKSJg5cTpwMImENLa8asQxF5GcgQgTTSCC7sKwnuqqMTaznUX8r5lMLsQoVqmEeHE/Z+3reg6HDwYw48dPoXBsBvKusba1v3y3jqXbU8jGFcyciPH4Tj4VqU9jFOs9H4cXFeGXqjbHe390EZLG0nex8lfL8fZE+MJSvi2RjdfpDhwRm7uAf7HVeyWcPOrZeLZVt/nIIgeONPHhYR4vH0T4+CjC/kPp+2QY8G8W1ppoNgJkg0J6dwL8BHjxrdibRBHwAAAAAElFTkSuQmCC');
    this.zeroHpScopImageData[this.interfaceTransparency] = await Alt1.ImageDetect.imageDataFromBase64('iVBORw0KGgoAAAANSUhEUgAAAAwAAAAdCAYAAACe/43ZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAImSURBVDhPlVNNaxNRFH3NJJOvMd9EY8DUONNaROLCiq24qGIrhEoVFWrrxo0bFy4DfuDHzp0u3Eh3bhRcCO6MUnEp+g/0JyQ/4TjnxTM8pS0YOLn33HfPuffNMKbRPoxKs40D0xFqrUMgJ0qNluWCuDkxv4CllT7c3+07dxMTRoloZKKZWWx/+Yr+pcswxlhUq1UUyzXrKlEyIYoirK5dxWg0woNHTzDbO2md6q2ObdLKWtOEsSCoNhFUGhgMBhiPx7hyfcM6s0lwJsxg7dp64ra+eRMfh0PsqzVtzRVykul2u3j4+Omf605+Z5fOI+1nk1UYCTsh5Xko1fcjH5SSSxOV5sFkqiJhXBfGIF5FnI5aizlryYvjAYvkroBRaB+ZmwhckXJNkolEhk1yl0ANjK4Jc8MxEvCAkTW3WbAC/vFSOmSUGzkNdM7cPiVNUYPLCXc9K9Ahnci1npoUeWb4NNioyKJMyNlMLpFxL8mch+Ruk3JG+x5YJJhLqLpqzDnR9G/cwv/ApPw8dkK9nsfwpW/x872P+eM5WzeFxRUUzlxEcWEZzBmJrecd3L8XwSvXsXyujLfPfOR6i7GgM4ed8OtDAemggkz8NZLjWwZeIf4E/m0U2DCVziT881Z58q24TS4oYIM4BV6uuLtgvJ39S0C+p+DdiyounE7bvL/asXwq5e0uOHYqxPfXWXx6FeDHmwBHe+29L03k2yHC6ZxdJeXnYh7iN9MM/p+Mvt0nAAAAAElFTkSuQmCC');
    this.zeroHpVoragaImageData[this.interfaceTransparency] = await Alt1.ImageDetect.imageDataFromBase64('iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAYAAAAo5+5WAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAFaElEQVRIS3VVS2xVVRQ9pX3vvk/7/ve9e9/v3tfSlsJAPm0NiFCjI0P4BlpqERMHDgkGBsYRA02IiYH4wd9AcYQmxKBxYkSNGvETExMHDhSURCaa6MARQZdrndvzqFpfsnI+d+911t777PNM0W+hHHRQa8YWhVrTYqQach1xDOzo5sJwpYFq2LXQWhz6fpsrginXWyjwY8lv9o2LtRD1ds8aNjpjds9vxdbJkWju1qV6+7Yv1xrNN99+B58GW7fP4dr1G/gTwM2/gKefOWcN5KQING/1Juw6iNb21a0k1Lc+8fdXr2MonUMjaOOOjdMYGPRgBtO48ctvCDqjNtR6e9Q6OYWCIllJ5FLhIjQ/kHhgTRo+U3H8+Elc/uATagZuEZ2xdf2cr0yJi8DlX4QatafDZGt+vP4zjBnEqVNP4O1L7+Ku7TuRygzj0y++tsQqlAhkLGd3gOaCDnGRaF9rkVPxT0ilMvjow4+xtHQUXiaPLbPbcJOK4/H1yJfr1lHkchREojxLvVMpG60114Hm6jXmeMjD3Ny9uKXK8XeNUfz6+x9oj07a/DoljtSFrnFlATWXnSW+8OZFmIEUWu0YxVLVzo0ZYgFZxKFsX6kjduQuDRrdIW4tG7Nrz34MeXnUQ97LWsOO1QYdOcpIKjS6phCBuw1Kx8o9d4hszRrmNF+usUnqaFB1yQ8tqiQu8QCpcOHKSSSai8hB99up1XfBZIsVhNEoKkGLYUsVlTdk1OUeyWm00klqXNEEfdO+vmvubo9RK1fqTfgkKrCVtRl2x2ybq7V9rkVeW6FYe0WSuDSIUPNmNI4yI1BdjLpLxMVaQIXJpj62Y4bHeS1gU4QxKo2kpa0yPVBBkk+lySnWYSOMSHOjsF3oOlWbClUH6FD7OAW8MX5CIHV+i2J4UNC9/Wb4LT1aSVHlbwLmt7hcrCJJRKj7W2q0l1ta6enxe4wwHrfFqoYRKoRs3N3VqL0qn17tGzkKTq3LV1JxPY1UxmulG6LDXWR6r6sKnyQiqnDPZ4TD3C/USKzHPWQ+pSLJVfLgy7HRWYt8hSmJxrjWm9GwB+itdvkVoWylts6iFxsdNHtT4D+ICtYk+SRzra6JLaEMm71Jq6JE1VLWZPH0x6AbosJqrhtSrncxXOYryLVsyywsU6GCtEgU26KIWAeJWGGNMO9lzmssjlTWW2yWegVBs4JGWGC3jiDs8F7rlqjoJJe92XNoCcK+ww9i3/yRf2D3wQfstwOLR+36wPwSDs7vx8LCHLGFr+FmHF7civnFvdh7aAH7FumzQJ/DR/jeZIpsvxLs6BWSsb8eSeZ2JNIplH0Pzz17DC8+/zAuvfUYNm1KYU3a0H4NkU3shNbsPRDC6Z0WTaI1M4fmDNezOxHM7kA4swOdmTsxOj2JJ8+cxIkT96NaNLjvnhJOnz6KtVN5TM2MI5qdRTB9N7GDj1C8AathQBhdRm8DUjHzF+fxxjtnUCBpvWLQbRtcufIaMnmDcicLrxfTb731N+loHf4PqT6mkItYtCiFz756HV7KoNclMfHSK4/zDTcsnEebrvXLdNfB5DgRvM5EH9nuJD8SMY2IHIlHum343UF8/uV5ZEg8Ghm0OwlxPmfY/hkUeLjXGUe2PcE8k2A1iNiLNOqgCRKz8zppvHf5BXhDJKbaDonfv3wOw0xFyG+lqG1ts102yGqkwn+J2cpRCU+dfRTbtw0jZn5372ri7NlHkPIMGt0CikxFnzhHgtXgyAXN83rJ6Lh+Zgznz5/Aqy8/hIsXjmHzxhTStnhtDLOlnR8VJ4r+DSmV4kR1UocsW32kU2ebs3A9gxwJU8xvseUj1x5DfrkmXjSJvwE7vq0KWpp1qQAAAABJRU5ErkJggg==');
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function initializeVoragoImageDetect() {
  if (window.Rock1 && window.Rock1.VoragoImageDetect) {
    return;
  }

  window.Rock1 = window.Rock1 || {};
  window.Rock1.VoragoImageDetect = new VoragoImageDetect();
  await  window.Rock1.VoragoImageDetect.initialize();
  return window.Rock1.VoragoImageDetect;
}
