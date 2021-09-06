export const gatherBufferData = (audioBuffer) => {
  const numOfChannels = audioBuffer.numberOfChannels

  const data = {}

  for (let channel = 0; channel < numOfChannels; channel++) {
    data[channel] = audioBuffer.getChannelData(channel)
  }

  return data
}
