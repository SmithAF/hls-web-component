import Hls from 'hls.js';

export class HLSPlayer extends HTMLVideoElement {
  static get observedAttributes() {
    return ['src'];
  }
  constructor() {
    super();
    this.hls = new Hls();
    this.hls.attachMedia(this);
  }
  attributeChangedCallback(atb, current, newValue) {
    if (current === newValue) {
      return;
    }
    switch (atb) {
      case 'src':
        this.hls.loadSource(newValue);
        break;
    }
  }
}

window.customElements.define('hls-js', HLSPlayer, { extends: 'video' });
