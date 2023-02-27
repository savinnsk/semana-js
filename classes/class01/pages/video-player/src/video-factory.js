import Camera from "../../../lib/shared/camera.js";
import { supportWorkerType } from "../../../lib/shared/utils.js";

import VideoController from "./video-controller.js";
import VideoService from "./video-service.js";
import VideoView from "./video-view.js";

async function getWorker() {
  if (supportWorkerType()) {
    console.log("supports");
    //using src due to, it'll be injected in index reference
    const worker = new Worker("./src/video-worker.js");
    return;
  }

  const workerMock = {
    async postMessage() {},
    onmessage(msg) {},
  };

  console.log("not supports");
  return workerMock;
}

const worker = await getWorker();

const camera = await Camera.init();

const [rootPath] = window.location.href.split("/pages/");

const VideoFactory = {
  async initialize() {
    return VideoController.initialize({
      view: new VideoView({}),
      service: new VideoService({}),
    });
  },
};

export default VideoFactory;
