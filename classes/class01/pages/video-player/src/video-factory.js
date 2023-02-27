import Camera from "../../../lib/shared/camera.js";

import VideoController from "./video-controller.js";
import VideoService from "./video-service.js";
import VideoView from "./video-view.js";

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
