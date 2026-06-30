// Small async sleep helper used to simulate parsing work / timeouts.
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
