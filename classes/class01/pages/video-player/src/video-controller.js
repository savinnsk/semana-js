export default class VideoController {
  #videoView;
  #videoService;
  constructor({ view, service }) {
    this.#videoView = view;
    this.#videoService = service;

    //bind to referer a controller
    this.#videoView.configureOnBtnClick(this.onBtnStart.bind(this));
  }

  static async initialize(deps) {
    const controller = new VideoController(deps);
    controller.log("not yer detecting eye blink! click in button to start");
    return controller.init();
  }

  async init() {
    console.log("init");
  }

  log(text) {
    this.#videoView.log(`logger ${text}`);
  }

  onBtnStart() {
    this.log("initializing detection");
  }
}
