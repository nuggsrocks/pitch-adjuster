export async function processFile (audioCtx, soundUrl) {
  try {
    const res = await fetch(soundUrl)

    const arrayBuffer = await res.arrayBuffer()

    return await audioCtx.decodeAudioData(arrayBuffer)
  } catch (e) {
    console.error(e)
    return null
  }
}
