export async function sliceBuffer (bufferData) {
  try {
    const grainSize = 512
    const grains = []

    for (let index = 0; index < bufferData[0].length / grainSize; index++) {
      grains.push([
        bufferData[0].slice(index * grainSize, (index + 1) * grainSize),
        bufferData[1].slice(index * grainSize, (index + 1) * grainSize),
      ])
    }

    return grains
  } catch (e) {
    console.error(e)
  }
}
