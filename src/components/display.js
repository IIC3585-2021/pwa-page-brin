const template = document.createElement('template');
const style = `
<style>
  @import "../src/components/display.css";
</style>
`;

template.innerHTML = `
${style}
<div id="card-container">
  <div id="image-container">
    <img id="display-image" />
  </div>
  <div id="card-text">
    <h4 id="display-title">
    </h4>
    <h5 id="display-subtitle">
    </h5>
  </div>
</div>
`;

export default class Display extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'subtitle', 'imagelink'];
  }

  constructor() {
    super();

    // append shadow DOM to shadow root and then clone template
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.asd = shadowRoot;

    // fill the needed info
    const title = this.title;//.length; //> 18 ? `${this.title.slice(0, 17)}...` : this.title;
    const subtitle = this.subtitle;//.length; //> 39 ? `${this.subtitle.slice(0, 38)}...` : this.subtitle;
    shadowRoot.querySelector('#display-title').innerText = title;
    shadowRoot.querySelector('#display-subtitle').innerText = subtitle;
    shadowRoot.querySelector('#display-image').src = this.imagelink || '../../images/default_album_image.png';
  }

  get title() {
    return this.getAttribute('title');
  }

  get subtitle() {
    return this.getAttribute('subtitle');
  }

  get imagelink() {
    return this.getAttribute('imagelink');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'title') {
        const title = newValue.length > 18 ? `${newValue.slice(0, 17)}...` : newValue;
        this.asd.querySelector('#display-title').innerText = title;
      } else if (name === 'subtitle') {
        const subtitle = newValue > 39 ? `${newValue.slice(0, 38)}...` : newValue;
        this.asd.querySelector('#display-subtitle').innerText = subtitle;
      } else if (name === 'imagelink') {
        this.asd.querySelector('#display-image').src = newValue;
      }
    }
  }
}

window.customElements.define('content-display', Display);
