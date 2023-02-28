export default class VideoView {
  #btnInit = document.querySelector("#init");
  #statusElement = document.querySelector("#status");

  constructor({}) {}

  enableButton() {
    this.#btnInit.disable = false;
  }

  configureOnBtnClick(fn) {
    this.#btnInit.addEventListener("click", fn);
  }

  log(text) {
    this.#statusElement.innerHTML = text;
  }
}
