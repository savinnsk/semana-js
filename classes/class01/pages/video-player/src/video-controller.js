export default class VideoController {
  constructor({}) {}

  static async initialize(deps) {
    const controller = new VideoController(deps);
    return controller.init();
  }

  async init() {
    console.log("init");
  }
}
