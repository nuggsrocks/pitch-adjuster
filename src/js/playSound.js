export const playSound = (audioCtx, grains) => {
  for (let grainIndex = 0; grainIndex < grains.length; grainIndex++) {
    const grain = grains[grainIndex]

    const bufferSource = audioCtx.createBufferSource()

    bufferSource.buffer = grain

    bufferSource.connect(audioCtx.destination)

    bufferSource.start(grain.length * grainIndex / audioCtx.sampleRate)
  }
}
