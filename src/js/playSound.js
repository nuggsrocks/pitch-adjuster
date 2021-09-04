export const playSound = async (audioCtx, grains) => {
  let grainIndex = 0

  while (grainIndex < grains.length) {
    const grain = grains[grainIndex]

    const bufferSource = audioCtx.createBufferSource()

    bufferSource.buffer = grain

    bufferSource.connect(audioCtx.destination)

    bufferSource.start(grain.length * grainIndex)

    grainIndex++
  }
}
