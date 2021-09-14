export function getAudioData (buffer) {
  const bufferData = []

  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    bufferData.push(buffer.getChannelData(channel))
  }

  return bufferData
}
