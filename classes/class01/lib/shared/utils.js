// to tester if navigator supports WebWorkers
export function supportWorkerType() {
  let supports = false;

  const tester = {
    get type() {
      supports = true;
    },
  };

  try {
    new Worker("blob://", tester).terminate();
  } finally {
    return supports;
  }
}
