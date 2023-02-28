export default class VideoController {
  #videoView;
  #videoWorker;
  #videoService;
  constructor({ view, service, worker }) {
    this.#videoView = view;
    this.#videoService = service;
    this.#videoWorker = this.#configureWorker(worker);

    //bind to referer a controller
    this.#videoView.configureOnBtnClick(this.onBtnStart.bind(this));
  }

  static async initialize(deps) {
    const controller = new VideoController(deps);
    controller.log("not yer detecting eye blink! click in button to start");
    return controller.init();
  }

  #configureWorker(worker) {
    worker.onmessage = (msg) => {
      if ("READY" === msg.data) {
        this.#videoView.enableButton();
        return;
      }
      console.log("receive", msg);
    };

    return worker;
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
