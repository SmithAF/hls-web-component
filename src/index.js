import Hls from 'hls.js';

export class HLSPlayer extends HTMLVideoElement {
  static get observedAttributes() {
    return ['src'];
  }
  constructor() {
    super();
  }

  /**
   * Is called whenever a observed attribute changes
   *
   * @param {string} atb the attribute that changed
   * @param {string} current the current attribute value
   * @param {string} newValue the new attribute value
   * @memberof HLSPlayer
   */
  attributeChangedCallback(atb, current, newValue) {
    if (
      !newValue || //if value is not empty
      current === newValue || //ignore if the value is the same
      -1 < newValue.indexOf('blob:http') // ignore hls.js changing the src
    ) {
      return;
    }

    switch (atb) {
      case 'src':
        if (this.hls) {
          this.hls.destroy();
        }
        this.hls = new Hls();
        this.hls.attachMedia(this);
        this.hls.loadSource(newValue);
        break;
    }
  }
}

window.customElements.define('hls-js', HLSPlayer, { extends: 'video' });
