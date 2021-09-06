export const cutGrains = (audioCtx, audioBuffer) => {
  const grainSize = 512
  const sampleRate = audioCtx.sampleRate

  const numOfGrains = audioBuffer.length / grainSize

  const numOfChannels = audioBuffer.numberOfChannels

  const grains = []

  const data = {}

  for (let channel = 0; channel < numOfChannels; channel++) {
    data[channel] = audioBuffer.getChannelData(channel)
  }

  for (let grainIndex = 0; grainIndex < numOfGrains; grainIndex++) {
    const grainData = {}

    const buffer = audioCtx.createBuffer(numOfChannels, grainSize, sampleRate)

    for (let channel = 0; channel < numOfChannels; channel++) {
      grainData[channel] = data[channel].slice(grainSize * grainIndex, grainSize * (grainIndex + 1))

      const bufferData = buffer.getChannelData(channel)

      for (let dataIndex = 0; dataIndex < grainData[channel].length; dataIndex++) {
        bufferData[dataIndex] = grainData[channel][dataIndex]
      }
    }

    grains.push(buffer)
  }

  return grains
}
