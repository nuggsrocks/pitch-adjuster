export const playSound = (audioCtx, audioBuffer, playbackRate) => {
  const bufferSource = audioCtx.createBufferSource()

  bufferSource.buffer = audioBuffer

  bufferSource.playbackRate.value = playbackRate

  bufferSource.connect(audioCtx.destination)

  bufferSource.start()
}
