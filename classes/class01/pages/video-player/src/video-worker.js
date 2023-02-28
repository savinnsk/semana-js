// to deal with code C++ from tensor flow
import "https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js";
// utils from tfjs-core
import "https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js";
// lib of graphics
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js";
// face detection
import "https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js";

import VideoService from "./video-service.js";

//worker uses self to search what is injected in html instead use window
const { tf, faceLandmarksDetection } = self;

tf.setBackend("webgl");

const service = new VideoService({
  faceLandmarksDetection,
});

console.log("loading tf model");

await service.loadModel();

console.log("tf model loaded");

postMessage("READY");

onmessage = async ({ data: video }) => {
  const blinked = await service.handBlinked(video);

  if (!blinked) return;
  postMessage({ blinked });

  postMessage({
    ok: "ok",
  });
};
