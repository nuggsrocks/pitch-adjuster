export async function makeBuffers (audioCtx, grains) {
  try {
    const buffers = []

    for (const grain of grains) {
      const buffer = audioCtx.createBuffer(2, grain[0].length, audioCtx.sampleRate)

      for (let channel = 0; channel < 2; channel++) {
        const bufferData = buffer.getChannelData(channel)

        for (let dataIndex = 0; dataIndex < bufferData.length; dataIndex++) {
          bufferData[dataIndex] = grain[channel][dataIndex]
        }
      }

      buffers.push(buffer)
    }

    return buffers
  } catch (e) {
    console.error(e)
  }
}
