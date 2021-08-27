export const playSound = (audioCtx, audioBuffer) => {
  const bufferSource = audioCtx.createBufferSource()

  bufferSource.buffer = audioBuffer

  bufferSource.connect(audioCtx.destination)

  bufferSource.start()
}
