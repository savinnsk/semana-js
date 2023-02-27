import VideoController from "./video-controller.js";

const [rootPath] = window.location.href.split("/pages/");
const VideoFactory = {
  async initialize() {
    return VideoController.initialize({
      //   view: new CardsView(),
      //   service: new CardsService({
      //     dbUrl: `${rootPath}/assets/database.json`,
      //     cardListWorker,
      //   }),
    });
  },
};

export default VideoFactory;
