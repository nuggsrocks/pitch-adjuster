export const loadSound = (audioCtx, arrayBuffer) => {
  return audioCtx.decodeAudioData(arrayBuffer)
    .catch(err => console.error(err))
}
