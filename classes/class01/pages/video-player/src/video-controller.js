export default class VideoController {
  #videoView;
  #camera;
  #videoWorker;
  #blinkCounter = 0;
  constructor({ view, worker, camera }) {
    this.#videoView = view;

    this.#videoWorker = this.#configureWorker(worker);
    this.#camera = camera;

    //bind to referer a controller
    this.#videoView.configureOnBtnClick(this.onBtnStart.bind(this));
  }

  static async initialize(deps) {
    const controller = new VideoController(deps);
    controller.log("not yer detecting eye blink! click in button to start");
    return controller.init();
  }

  #configureWorker(worker) {
    let ready = false;
    worker.onmessage = ({ data }) => {
      if ("READY" === data) {
        console.log("work is ready");
        this.#videoView.enableButton();
        ready = true;
        return;
      }

      const blinked = data.blinked;
      this.#blinkCounter += blinked;
      console.log("blinked", blinked);
    };

    return {
      send(msg) {
        if (!ready) return;
        worker.postMessage(msg);
      },
    };
  }

  async init() {
    console.log("init");
  }

  loop() {
    const video = this.#camera.video;
    const img = this.#videoView.getVideoFrame(video);
    this.#videoWorker.send(img);
    this.log("detecting eye blink...");

    setTimeout(() => this.loop, 100);
  }

  log(text) {
    this.#videoView.log(`logger ${text}`);
  }

  onBtnStart() {
    this.log("initializing detection");
    this.#blinkCounter = 0;
    this.log();
  }
}
